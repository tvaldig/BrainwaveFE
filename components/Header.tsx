import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView } from 'react-native';

export default function Header() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/ProfileTest.png')} 
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.statusText}>Online</Text>
            <Text style={styles.nameText}>Timotius Vivaldi</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ..."
            placeholderTextColor="#B8A8B2"
          />
          <Image
            source={require('../assets/images/SearchBar.png')} 
            style={styles.searchIcon}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#563540', 
  },
  container: {
    backgroundColor: '#563540', 
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  textContainer: {
    marginLeft: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#00B386', 
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D7DEDC', 
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#6B4A5E', 
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#6B4A5E',
  },
});
