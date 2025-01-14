import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

interface Question {
  question: string;
  input: string[];
  output: string;
}

interface QuizProps {
  questions: Question[];
  onSubmit: () => void; // Callback for when the quiz is submitted
}

export function QuizCard({ questions, onSubmit }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer(''); // Reset the answer field
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswer(''); // Reset the answer field
    }
  };

  const handleRetry = () => {
    setAnswer(''); // Clear the answer input
  };

  const question = questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Calculator</Text>
      <Text style={styles.subTitle}>
        time limit per test: 1 second{'\n'}memory limit per test: 64 megabytes
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Question</Text>
        <Text style={styles.text}>{question.question}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input</Text>
        {question.input.map((input, index) => (
          <Text key={index} style={styles.text}>
            {input}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Output</Text>
        <Text style={styles.text}>{question.output}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Answer</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste your code here..."
          value={answer}
          onChangeText={setAnswer}
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Check pressed')}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
        {currentQuestionIndex > 0 && (
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleNext}>
          <Text style={styles.buttonText}>{isLastQuestion ? 'Submit' : 'Next Question'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A2A3E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A2A3E',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    height: 100,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#5A2A3E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#8A3B58',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
