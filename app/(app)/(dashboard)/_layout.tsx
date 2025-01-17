import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Footer from '../../../components/Footer';
import Header from '@/components/Header';
import HomeScreen from '.';
//import QuestionScreen from './question'; 
import ProfileScreen from './profile';

type TabLayoutProps = {
  children: React.ReactNode;
};

export default function TabLayout({ children }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Profile':
        return <ProfileScreen/>;
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
