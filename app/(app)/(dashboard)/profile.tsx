import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomButton } from '@/components/CustomButton';
import { useSession } from '@/context/authContext';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '@/constants/api';

export default function ProfileScreen() {
  const { session, signOut } = useSession();
  const router = useRouter();

  // State variables to hold user data
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        if (response.data.status === 'success') {
          const { name, email } = response.data.data;
          setName(name);
          setEmail(email);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (session?.token) {
      fetchUserData();
    }
  }, [session?.token]);

  const handleLogout = () => {
    signOut();
    router.replace("/(app)/(auth)/login");
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../../assets/images/ProfileTest.png')}
          style={styles.profileImage}
        />
      </View>

      {/* User Info */}
      <Text style={styles.username}>{name || 'Loading...'}</Text>
      <Text style={styles.email}>{email || 'Loading...'}</Text>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <CustomButton
          label="Logout"
          variant="text"
          onPress={handleLogout}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileImageContainer: {
    marginBottom: 16,
    borderRadius: 75, 
    overflow: 'hidden',
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
