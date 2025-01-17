import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '@/components/CustomButton';
import { API_URL } from '@/constants/api';
import axios from 'axios';
interface Material {
  title: string;
  duration: string;
  content: string;
  description: string;
  _id: string;
}

interface SubjectData {
  _id: string;
  name: string;
  totalModules: number;
  estimatedTime: string;
  description: string;
  duration: string;
  viewers: number;
  rating: number;
  totalQuestions: number;
  materials: Material[];
}

export default function MaterialPage() {
  const router = useRouter();
  const [materialData, setMaterialData] = useState<SubjectData | null>(null);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/subjects/6789dbb5b7f5f1e540e337be`);
        const data: SubjectData = await response.data
        setMaterialData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStartQuiz = () => {
    router.push('/question');
  };

  if (!materialData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const firstMaterial = materialData.materials[0];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.quizTitle}>{materialData.name}</Text>

      <View style={styles.quizContainer}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.infoValue}>{materialData.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.infoValue}>{materialData.estimatedTime}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.infoValue}>{materialData.description}</Text>
          </View>
          <View style={styles.separator} />
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Image
                source={require('../../../assets/images/Moduls.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Modules: {materialData.totalModules}</Text>
            </View>
            <View style={styles.stat}>
              <Image
                source={require('../../../assets/images/Rating.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Rating: {materialData.rating}</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Image
                source={require('../../../assets/images/Viewers.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>Viewers: {materialData.viewers}</Text>
            </View>
            <View style={styles.stat}>
              <Image
                source={require('../../../assets/images/TotalQuestions.png')}
                style={styles.statIcon}
              />
              <Text style={styles.statText}>
                Total Questions: {materialData.totalQuestions}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.pythonSection}>
        <Text style={styles.sectionTitle}>{firstMaterial.title}</Text>
        <Text style={styles.sectionText}>{firstMaterial.description}</Text>
        <Text style={styles.sectionText}>{firstMaterial.content}</Text>

        <CustomButton
          label="Start Quiz"
          variant="text"
          onPress={handleStartQuiz}
          style={styles.startQuizButton}
        />
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
    textAlign: 'left',
  },
  quizContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#563540',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#563540',
    flex: 2,
    textAlign: 'right',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#563540',
    marginVertical: 8,
  },
  statsGrid: {
    marginTop: 0,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
    width: '48%',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    color: '#563540',
    textAlign: 'center',
  },
  pythonSection: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#563540',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#563540',
    marginBottom: 12,
  },
  startQuizButton: {
    backgroundColor: '#5A2A3E',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
