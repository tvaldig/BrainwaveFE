import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Footer from '../../components/Footer';
import Header from '@/components/Header';
import HomeScreen from '.';
import FAQScreen from './faq'; 
import QuestionScreen from './question'; 
import MaterialScreen from './material'; 
import TrackerPage from './tracker'; 

type TabLayoutProps = {
  children: React.ReactNode;
};

export default function TabLayout({ children }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Tracker':
        return <Text style={styles.placeholderText}>Welcome to Tracker!</Text>;
      case 'Evaluation':
        return <TrackerPage />;
      case 'Profile':
        return <Text style={styles.placeholderText}>Your Profile here!</Text>;
      case 'FAQ': 
        return <FAQScreen />;
      default:
        return <Text style={styles.placeholderText}>Invalid Tab</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{renderContent()}</View>
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#333',
  },
});
