import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialIcons } from '@expo/vector-icons';

export default function MaterialLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Reusable header with a back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate('/course')} style={styles.backButton}>
           <MaterialIcons name="chevron-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Quiz</Text>
      </View>

      {/* Content for the nested pages */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#563540',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#563540',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
