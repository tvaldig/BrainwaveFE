import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type FooterProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function Footer({ activeTab, setActiveTab }: FooterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Home')}>
        <Image
          source={
            activeTab === 'Home'
              ? require('../assets/images/HomeFooterClick.png')
              : require('../assets/images/HomeFooter.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Tracker')}>
        <Image
          source={
            activeTab === 'Tracker'
              ? require('../assets/images/TrackerFooterClick.png')
              : require('../assets/images/TrackerFooter.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Tracker' && styles.activeTabText]}>
          Tracker
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Evaluation')}>
        <Image
          source={
            activeTab === 'Evaluation'
              ? require('../assets/images/EvaluationFooterClick.png')
              : require('../assets/images/EvaluationFooter.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Evaluation' && styles.activeTabText]}>
          Evaluation
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Profile')}>
        <Image
          source={
            activeTab === 'Profile'
              ? require('../assets/images/ProfileClick.png')
              : require('../assets/images/Profile.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Profile' && styles.activeTabText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#D7DEDC',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B4A5E',
  },
  activeTabText: {
    color: '#4B244A',
    fontWeight: 'bold',
  },
});
