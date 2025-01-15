import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

import { VerticalCard } from '@/components/VerticalCard';

type LeaderboardItem = {
  id: number;
  name: string;
  score: number;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const leaderboardData: LeaderboardItem[] = [
  { id: 1, name: 'Alice', score: 1500 },
  { id: 2, name: 'Bob', score: 1400 },
  { id: 3, name: 'Charlie', score: 1300 },
];

const modulesData = [
  {
    id: 1,
    title: 'Computational',
    subtitle: '8 Modules',
    footer: 'Study Time: 05:02:00',
    image: require('../../assets/images/cardimg.png'),
  },
  {
    id: 2,
    title: 'Physics',
    subtitle: '10 Modules',
    footer: 'Study Time: 05:02:00',
    image: require('../../assets/images/cardimg.png'),
  },
  {
    id: 3,
    title: 'Mathematics',
    subtitle: '6 Modules',
    footer: 'Study Time: 03:45:00',
    image: require('../../assets/images/cardimg.png'),
  },
];

export default function HomeScreen() {
  const renderLeaderboardItem = ({ item }: { item: LeaderboardItem }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.leaderboardText}>
        {item.id}. {item.name} - {item.score} pts
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Main Layout */}
      {isWeb ? (
        <View style={styles.webMainContainer}>
          {/* Card Section */}
          <View style={styles.webCardContainer}>
            <Image
              source={require('../../assets/images/Berpikir.png')}
              style={styles.webCardImage}
            />
          </View>

          {/* Icons Section */}
          <View style={styles.webIconContainer}>
            <TouchableOpacity style={styles.webIconButton}>
              <Image source={require('../../assets/images/course.png')} style={styles.webIconImage} />
              <Text style={styles.webIconLabel}>Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.webIconButton}>
              <Image source={require('../../assets/images/tracker.png')} style={styles.webIconImage} />
              <Text style={styles.webIconLabel}>Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.webIconButton}>
              <Image source={require('../../assets/images/evaluation.png')} style={styles.webIconImage} />
              <Text style={styles.webIconLabel}>Evaluation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.webIconButton}>
              <Image source={require('../../assets/images/faq.png')} style={styles.webIconImage} />
              <Text style={styles.webIconLabel}>FAQ</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {/* Card Section */}
          <View style={styles.cardContainer}>
            <Image
              source={require('../../assets/images/Berpikir.png')}
              style={styles.cardImage}
            />
          </View>

          {/* Icons Section */}
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('../../assets/images/course.png')} style={styles.iconImage} />
              <Text style={styles.iconLabel}>Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('../../assets/images/tracker.png')} style={styles.iconImage} />
              <Text style={styles.iconLabel}>Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('../../assets/images/evaluation.png')} style={styles.iconImage} />
              <Text style={styles.iconLabel}>Evaluation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('../../assets/images/faq.png')} style={styles.iconImage} />
              <Text style={styles.iconLabel}>FAQ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Leaderboard Section */}
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Best Students</Text>
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
      <Text style={styles.HeadingTitle}>Available Courses</Text>
      <View style={styles.modulesContainer}>
        <FlatList
          data={modulesData}
          renderItem={({ item }) => (
            <VerticalCard
              title={item.title}
              subtitle={item.subtitle}
              footer={item.footer}
              image={item.image}
              style={styles.cardStyle}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={SCREEN_WIDTH > 600 ? (isWeb ? 3 : 2) : 1}
          columnWrapperStyle={SCREEN_WIDTH > 600 ? styles.row : null}
        />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webMainContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  webCardContainer: {
    marginBottom: 20, 
    padding: 0,   
    backgroundColor: 'transparent',
    flex: 2,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  webCardImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  webIconContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',   
    justifyContent: 'space-between', 
    marginBottom: 20,
  },
  webIconButton: {
    width: '45%',       
    aspectRatio: 1,    
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,   
    backgroundColor: 'transparent', 
    borderRadius: 10,    
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  webIconImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  webIconLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modulesContainer: {
    marginTop: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    ...Platform.select({
      ios:{
        flexDirection:'column',
      },
      android:{
        flexDirection:'column',
      },
      default:{
        flexDirection:'row',
      }
    }),
  },
  row: {
    justifyContent: 'space-between',
  },
  cardStyle: {
    margin: 8,
    flex: 1,
  },
  cardContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  cardImage: {
    width: SCREEN_WIDTH * 0.9,
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconImage: {
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  leaderboardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4B244A',
  },
  HeadingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:8,
    marginBottom: 8,
    color: '#4B244A',
  },
  leaderboardItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leaderboardText: {
    fontSize: 14,
    color: '#333',
  },
});
