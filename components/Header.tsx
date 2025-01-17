import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, SafeAreaView, Platform } from 'react-native';
import axios from 'axios'; 
import { API_URL } from '@/constants/api';
import { useSession } from '@/context/authContext';

export default function Header() {
  const {session} = useSession();
  const [name, setName] = useState<string>(''); 
  const isWeb = Platform.OS === 'web';


  useEffect(() => {
    const fetchUserData = async () => {
      try {
 
        const response = await axios.get(`${API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${session?.token}`, 
          },
        });

        if (response.data.status === 'success') {
          setName(response.data.data.name); 
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isWeb ? (
          // Layout for Web
          <View style={styles.webContainer}>
            <View style={styles.profileWebContainer}>
              <Image
                source={require('../assets/images/ProfileTest.png')}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.statusText}>Online</Text>
                <Text style={styles.nameText}>{name || 'Loading...'}</Text>
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
        ) : (
          // Layout for Mobile
          <>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/images/ProfileTest.png')}
                style={styles.profileImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.statusText}>Online</Text>
                <Text style={styles.nameText}>{name || 'Loading...'}</Text>
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
          </>
        )}
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
  webContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileWebContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: Platform.OS === 'web' ? '40%' : 'auto', // Adjust width for web
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
