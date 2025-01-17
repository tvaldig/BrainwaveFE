import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import authStyles from './authStyles';
import { useSession } from '@/context/authContext';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LoginScreen() {
  const { signIn } = useSession();
  const screenHeight = Dimensions.get('window').height;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = () => {
    if (email && password) {
      signIn(email, password);
      router.replace('/');
    }
  };

  return (
    <LinearGradient
      colors={['#EEDFF0', '#89818A']}
      style={authStyles.container}
    >
      <SafeAreaView style={authStyles.safeArea}>
        <View style={authStyles.content}>
          <Animated.View 
            entering={FadeIn.delay(400)}
            style={[authStyles.titleContainer, { backgroundColor: 'transparent' }]}
          >
            <ThemedText type="title" style={authStyles.registerTitle}>Welcome back</ThemedText>
            <HelloWave />
          </Animated.View>
          
          <AnimatedView style={[authStyles.illustrationContainer, illustrationAnimatedStyle]}>
            <Image
              source={require('../../../assets/images/login-illustration.png')} 
              style={authStyles.illustration}
            />
          </AnimatedView>

          <AnimatedView style={[authStyles.rectangle, rectangleAnimatedStyle]}>
            <ScrollView 
              style={authStyles.scrollView}
              contentContainerStyle={authStyles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={authStyles.formContainer}>
                <TextInput 
                  style={authStyles.input} 
                  placeholder="Email" 
                  placeholderTextColor="#aaa" 
                  value={email} 
                  onChangeText={setEmail} 
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity 
                  style={authStyles.button} 
                  onPress={handleLogin}
                >
                  <Text style={authStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                
                <Text style={authStyles.orText}>Or</Text>
                
                <TouchableOpacity 
                  style={authStyles.googleButton} 
                  onPress={() => alert('Google Login pressed')}
                >
                  <Image
                    source={require('../../../assets/images/google.png')}
                    style={authStyles.googleIcon}
                  />
                  <Text style={authStyles.googleButtonText}>Login with Google</Text>
                </TouchableOpacity>
                
                <View style={authStyles.switchAuthContainer}>
                  <Text style={authStyles.switchAuthText}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity 
                    style={authStyles.switchAuthButton}
                    onPress={() => router.push("/(app)/(auth)/register")}
                  >
                    <Text style={authStyles.switchAuthButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </AnimatedView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
