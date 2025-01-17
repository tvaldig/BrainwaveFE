import React from 'react';
import { View, ScrollView, StyleSheet, Platform, Text } from 'react-native';
import { VerticalCard } from '@/components/VerticalCard';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const courses = [
  {
    id: 1,
    title: 'Computational',
    subtitle: '8 Modules',
    footer: 'Study Time: 05:02:00',
    image: require('../../../assets/images/cardimg.png'),
    isBookmarked: true,
  },
  {
    id: 2,
    title: 'Physics',
    subtitle: '10 Modules',
    footer: 'Study Time: 06:15:00',
    image: require('../../../assets/images/cardimg.png'),
    isBookmarked: false,
  },
  {
    id: 3,
    title: 'Mathematics',
    subtitle: '6 Modules',
    footer: 'Study Time: 03:45:00',
    image: require('../../../assets/images/cardimg.png'),
    isBookmarked: true,
  },
  {
    id: 4,
    title: 'Chemistry',
    subtitle: '7 Modules',
    footer: 'Study Time: 04:30:00',
    image: require('../../../assets/images/cardimg.png'),
    isBookmarked: false,
  },
];

export default function CourseScreen() {
  const router = useRouter(); // Initialize the router

  const handleCoursePress = (id: number, title: string) => {
    if (title === 'Computational') {
      router.push('/material'); 
    }

  };

  const renderItem = (item: typeof courses[0]) => (
    <VerticalCard
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      footer={item.footer}
      image={item.image}
      isBookmarked={item.isBookmarked}
      onBookmarkPress={() => handleBookmarkPress(item.id)}
      onPress={() => handleCoursePress(item.id, item.title)} 
      style={styles.cardStyle}
    />
  );

  const handleBookmarkPress = (id: number) => {
    console.log(`Bookmark toggled for course ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.HeadingTitle}>Subject Study Modules</Text>
      <ScrollView
        contentContainerStyle={[
          styles.listContent,
          Platform.OS === 'web' ? styles.horizontalList : styles.verticalList,
        ]}
        showsVerticalScrollIndicator={false}
        horizontal={Platform.OS === 'web'}
        style={styles.scrollView}
      >
        {courses.map((course) => renderItem(course))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 16,
    color: '#4B244A',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
    alignItems:'center',
  },
  scrollView: {
    flexDirection: 'column',
  },
  listContent: {
    paddingBottom: 16,
  },
  verticalList: {
    flexDirection: 'column', // Stack vertically for mobile
  },
  horizontalList: {
    flexDirection: 'row', // Display horizontally for web
  },
  cardStyle: {
    marginBottom: 16,
    marginRight: Platform.OS === 'web' ? 16 : 0, // Adjust margin for web
  },
});
