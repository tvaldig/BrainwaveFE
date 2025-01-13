import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.placeholderText}>Main Content Area</Text>
      </View>
      <Footer />
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
    color: '#000',
  },
});
