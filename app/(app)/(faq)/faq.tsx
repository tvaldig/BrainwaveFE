import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function FAQScreen() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: 'What is Brainwave?',
      answer: 'Brainwave is an online learning platform designed to help students enhance their skills and knowledge through various educational modules.',
    },
    { id: 2, question: 'How do I sign up?', answer: 'You can sign up by visiting our registration page and following the instructions.' },
    { id: 3, question: 'What courses are available?', answer: 'We offer a variety of courses ranging from programming to design, business, and more.' },
    { id: 4, question: 'How do I track my learning progress?', answer: 'Your progress can be tracked through your personal dashboard in the app.' },
  ];

  const tutorialData = [
    { id: 1, title: 'Getting Started with Brainwave', description: 'Learn how to navigate through Brainwave and maximize its features.' },
    { id: 2, title: 'Understanding the Course Tracker', description: 'Track your progress effectively and stay on top of your learning.' },
    { id: 3, title: 'Joining Live Classes', description: 'Step-by-step guide to joining live classes and interacting with instructors.' },
    { id: 4, title: 'Submitting Assignments', description: 'How to upload assignments and receive feedback from instructors.' },
    { id: 5, title: 'Exploring Advanced Features', description: 'Discover advanced features to enhance your learning experience.' },
    { id: 6, title: 'Setting Up Notifications', description: 'Stay updated with important notifications and updates.' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.heading}>Frequently Asked Questions</Text>
      {faqData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.faqItem, expandedQuestion === item.id && styles.expandedItem]}
          onPress={() => setExpandedQuestion(expandedQuestion === item.id ? null : item.id)}
        >
          <View style={styles.faqHeader}>
            <Image
              source={require('../../../assets/images/FaqQuestion.png')} 
              style={styles.icon}
            />
            <Text style={styles.question}>{item.question}</Text>
          </View>
          {expandedQuestion === item.id && <Text style={styles.answer}>{item.answer}</Text>}
        </TouchableOpacity>
      ))}

      <Text style={styles.heading}>Tutorial</Text>
      <View style={styles.tutorialContainer}>
        {tutorialData.map((item) => (
          <View key={item.id} style={styles.tutorialCard}>
            <View style={styles.tutorialBadge}>
              <Text style={styles.tutorialBadgeText}>Tutorial {item.id}</Text>
            </View>
            <Text style={styles.tutorialHeading}>{item.title}</Text>
            <Text style={styles.tutorialDescription}>{item.description}</Text>
          </View>
        ))}
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
    paddingBottom: 80, 
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#563540',
    marginVertical: 16,
  },
  faqItem: {
    backgroundColor: '#CFCFCD',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  expandedItem: {
    backgroundColor: '#D7DEDC',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#563540',
    flex: 1,
  },
  answer: {
    fontSize: 14,
    color: '#563540',
    marginTop: 8,
  },
  tutorialContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tutorialCard: {
    width: '48%',
    backgroundColor: '#CFCFCD',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center', 
  },
  tutorialBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#563540',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
  },
  tutorialBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tutorialHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#563540',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center', 
  },
  tutorialDescription: {
    fontSize: 14,
    color: '#563540',
    textAlign: 'center',
  },
});
