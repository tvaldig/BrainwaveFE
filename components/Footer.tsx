import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Footer() {
  const [activeTab, setActiveTab] = useState('Home'); 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Home')}>
        <Image
          source={
            activeTab === 'Home'
              ? require('../assets/images/HomeClick.png')
              : require('../assets/images/Home.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Shop')}>
        <Image
          source={
            activeTab === 'Shop'
              ? require('../assets/images/ShopClick.png')
              : require('../assets/images/Shop.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Shop' && styles.activeTabText]}>
          Shop
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('Search')}>
        <Image
          source={
            activeTab === 'Search'
              ? require('../assets/images/SearchClick.png')
              : require('../assets/images/Search.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.tabText, activeTab === 'Search' && styles.activeTabText]}>
          Search
        </Text>
      </TouchableOpacity>

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
