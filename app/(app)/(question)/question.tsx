import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { API_URL } from '@/constants/api';
import axios from 'axios';
import { useSession } from '@/context/authContext';

// Define interfaces for the expected data
interface Quiz {
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function QuestionScreen() {
  const { session } = useSession();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreMessage, setScoreMessage] = useState('');

  useEffect(() => {
    // Fetch quiz data from the API
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${API_URL}/subjects/6789dbb5b7f5f1e540e337be`);
        const data = await response.data;
        const firstQuiz: Quiz = data.materials[0].quiz;
        setQuizData(firstQuiz);
      } catch (err) {
        setError('Failed to load quiz data.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const handleQuestionClick = (questionIndex: number) => {
    setActiveQuestion(questionIndex);
    setAnswer('');
  };

  const handleRetry = () => {
    setAnswer('');
  };

  const handleCheck = async () => {
    console.log('Answer submitted:', answer);
    console.log('Correct answer:', quizData?.questions[activeQuestion].answer);

    try {
      const question = quizData?.questions[activeQuestion];
      const userId = session?.userId;
      const subjectId = '6789dbb5b7f5f1e540e337be';
      const materialIndex = 0;
      const questionIndex = activeQuestion;

      const data = {
        userAnswer: answer,
        userId: userId,
      };

      const response = await axios.post(
        `${API_URL}/subjects/${subjectId}/materials/${materialIndex}/quiz/questions/${questionIndex}/check`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );

      if (response.data.status === 'success') {
        const message = response.data.message;
        const isAnswerCorrect = message.includes('Correct answer');
        setIsCorrect(isAnswerCorrect);

        // Extract score from message if it's a correct answer
        if (isAnswerCorrect) {
          const scoreMatch = message.match(/Score: (\d+)/);
          if (scoreMatch) {
            setScoreMessage(`Your score: ${scoreMatch[1]}`);
          }
        }

        setIsModalVisible(true);
      } else {
        console.error('Failed to check the answer:', response.data.message);
      }
    } catch (error) {
      console.error('Error while checking answer:');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setAnswer(''); // Clear answer after closing modal
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#563540" />
        <Text>Loading Quiz...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.quizTitle}>{quizData?.title}</Text>
      <Text style={styles.quizDescription}>{quizData?.description}</Text>

      <View style={styles.questionNumbersRow}>
        {quizData?.questions.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.questionNumber, activeQuestion === index && styles.activeQuestionNumber]}
            onPress={() => handleQuestionClick(index)}
          >
            <Text style={[styles.questionNumberText, activeQuestion === index && styles.activeQuestionNumberText]}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Question {activeQuestion + 1}</Text>
        <Text style={styles.text}>{quizData?.questions[activeQuestion].question}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options</Text>
        {quizData?.questions[activeQuestion].options.map((option, idx) => (
          <Text key={idx} style={styles.text}>
            {idx + 1}. {option}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Answer</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your answer here..."
          placeholderTextColor="#A3A3A3"
          value={answer}
          onChangeText={setAnswer}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkButton} onPress={handleCheck}>
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Answer Result */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {isCorrect ? 'Correct Answer!' : 'Incorrect Answer!'}
            </Text>
            {isCorrect && scoreMessage && <Text style={styles.modalText}>{scoreMessage}</Text>}
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 8,
  },
  quizDescription: {
    fontSize: 16,
    color: '#6D6A6A',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  questionNumbersRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  questionNumber: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5EFEF',
    borderRadius: 5,
  },
  activeQuestionNumber: {
    backgroundColor: '#563540',
  },
  questionNumberText: {
    color: '#563540',
    fontWeight: 'bold',
  },
  activeQuestionNumberText: {
    color: '#fff',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#563540',
    lineHeight: 20,
  },
  textInput: {
    backgroundColor: '#F5EFEF',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#563540',
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#563540',
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#563540',
  },
  checkButton: {
    backgroundColor: '#563540',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#563540',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
