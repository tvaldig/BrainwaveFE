import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function QuestionScreen() {
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [answer, setAnswer] = useState('');

  const questions = [...Array(10).keys()].map((i) => i + 1);

  const handleQuestionClick = (questionNumber: number) => {
    setActiveQuestion(questionNumber);
  };

  const handleRetry = () => {
    setAnswer('');
  };

  const handleCheck = () => {
    console.log('Answer submitted:', answer);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <Text style={styles.quizTitle}>Quiz 1 : Python Introduction</Text>

      <View style={styles.combinedSection}>
        <Text style={styles.sectionTitle}>Question Numbers</Text>
        <View style={styles.combinedContainer}>
          <View style={styles.questionNumbersRow}>
            {questions.slice(0, 5).map((number) => (
              <TouchableOpacity
                key={number}
                style={[
                  styles.questionNumber,
                  activeQuestion === number && styles.activeQuestionNumber,
                ]}
                onPress={() => handleQuestionClick(number)}
              >
                <Text
                  style={[
                    styles.questionNumberText,
                    activeQuestion === number && styles.activeQuestionNumberText,
                  ]}
                >
                  {number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.questionNumbersRow}>
            {questions.slice(5, 10).map((number) => (
              <TouchableOpacity
                key={number}
                style={[
                  styles.questionNumber,
                  activeQuestion === number && styles.activeQuestionNumber,
                ]}
                onPress={() => handleQuestionClick(number)}
              >
                <Text
                  style={[
                    styles.questionNumberText,
                    activeQuestion === number && styles.activeQuestionNumberText,
                  ]}
                >
                  {number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Exam Info</Text>
          <View style={styles.examInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Server Time    :</Text>
              <Text style={styles.value}>12:32:00</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Course             :</Text>
              <Text style={styles.value}>Python Introduction</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Exam Type      :</Text>
              <Text style={styles.value}>Quiz</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.calculatorContainer}>
        <Text style={styles.calculatorTitle}>My Calculator</Text>
        <Text style={styles.calculatorInfo}>
          Time limit per test: <Text style={styles.bold}>1 second</Text>
        </Text>
        <Text style={styles.calculatorInfo}>
          Memory limit per test: <Text style={styles.bold}>64 megabytes</Text>
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Question</Text>
          <Text style={styles.text}>Buatlah sebuah program yang menerima tiga masukan: angka pertama, operator aritmatika, dan angka kedua. Program tersebut harus menghitung dan menampilkan hasil operasi berdasarkan masukan yang diberikan.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input</Text>
          <Text style={styles.text}>1{'\n'}+{'\n'}2</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Output</Text>
          <Text style={styles.text}>3</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Answer</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Paste your code here..."
            placeholderTextColor="#A3A3A3"
            multiline
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 12,
  },
  combinedSection: {
    backgroundColor: '#CFCFCD',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  combinedContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  questionNumbersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  examInfoContainer: {
    backgroundColor: '#B8A8AC',
    padding: 12,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#563540',
    fontSize: 14,
  },
  value: {
    color: '#563540',
    fontSize: 14,
    fontWeight: '600',
  },
  calculatorContainer: {
    backgroundColor: '#CFCFCD',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 8,
    textAlign: 'center',
  },
  calculatorInfo: {
    fontSize: 14,
    color: '#563540',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
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
});
