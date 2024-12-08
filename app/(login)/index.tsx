import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LoginScreen() {
  const screenHeight = Dimensions.get('window').height;
  
  const rectangleTranslateY = useSharedValue(screenHeight);
  const illustrationTranslateY = useSharedValue(screenHeight);

  useEffect(() => {
    rectangleTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 80,
    });
    illustrationTranslateY.value = withSpring(0, {
        damping: 15,
        stiffness: 80,
      });
  }, []);

  const rectangleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rectangleTranslateY.value }],
  }));

  const illustrationAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: illustrationTranslateY.value }],
  }));

  return (
    <LinearGradient
      colors={['#EEDFF0', '#89818A']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View 
            entering={FadeIn.delay(400)}
            style={[styles.titleContainer, {backgroundColor: 'transparent'}]}
          >
            <ThemedText type="title">Welcome back</ThemedText>
            <HelloWave />
          </Animated.View>
          
          <AnimatedView style={[
            styles.illustrationContainer,
            illustrationAnimatedStyle,
          ]}>
            <Image
              source={require('../../assets/images/login-illustration.png')} 
              style={styles.illustration}
            />
          </AnimatedView>

          <AnimatedView style={[
            styles.rectangle,
            rectangleAnimatedStyle,
          ]}>
            <View style={styles.formContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Username" 
                placeholderTextColor="#aaa" 
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
              />
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => alert('Login pressed')}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              
              <Text style={styles.orText}>Or</Text>
              
              <TouchableOpacity 
                style={styles.googleButton} 
                onPress={() => alert('Google Login pressed')}
              >
                <Image
                  source={require('../../assets/images/google.png')}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Login with Google</Text>
              </TouchableOpacity>
              
              <Text style={styles.RegText}>Don't have an account? Register</Text>
            </View>
          </AnimatedView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    paddingTop: 20,
  },
  illustrationContainer: {
    position: 'absolute',
    width: '100%',
    height: '35%',
    top: '8%',
    zIndex: 2,
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  rectangle: {
    backgroundColor: '#665D68',
    borderTopLeftRadius: 50,
    paddingTop: '5%',
    borderTopRightRadius: 50,
    width: '100%',
    height: '65%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: '10%',
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '80%',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#6c3b88',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 16,
  },
  RegText: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});