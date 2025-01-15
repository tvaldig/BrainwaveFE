
import React, { useEffect, useState } from 'react';import { 
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
import  authStyles  from './authStyles'
import { router } from 'expo-router';
interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }
const AnimatedView = Animated.createAnimatedComponent(View);

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
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

  const handleRegister = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!acceptedTerms) newErrors.terms = 'You must accept the terms';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle successful registration
      alert('Registration successful!');
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
            style={authStyles.titleContainer}
          >
            <Text style={authStyles.registerTitle}>Create Account</Text>
          </Animated.View>
          
          <AnimatedView style={[
            authStyles.illustrationContainer,
            illustrationAnimatedStyle,
          ]}>
            <Image
              source={require('../../assets/images/login-illustration.png')} 
              style={authStyles.illustration}
            />
          </AnimatedView>

          <AnimatedView style={[
            authStyles.rectangle,
            rectangleAnimatedStyle,
          ]}>
            <ScrollView 
              style={authStyles.scrollView}
              contentContainerStyle={authStyles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={authStyles.formContainer}>
                <TextInput 
                  style={[authStyles.input, errors.fullName && { borderColor: '#ff6b6b' }]}
                  placeholder="Full Name" 
                  placeholderTextColor="#aaa"
                  value={formData.fullName}
                  onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                />
                {errors.fullName && <Text style={authStyles.errorText}>{errors.fullName}</Text>}

                <TextInput 
                  style={[authStyles.input, errors.email && { borderColor: '#ff6b6b' }]}
                  placeholder="Email" 
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                {errors.email && <Text style={authStyles.errorText}>{errors.email}</Text>}

                <TextInput
                  style={[authStyles.input, errors.password && { borderColor: '#ff6b6b' }]}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                />
                {errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}

                <TextInput
                  style={[authStyles.input, errors.confirmPassword && { borderColor: '#ff6b6b' }]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#aaa"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                />
                {errors.confirmPassword && <Text style={authStyles.errorText}>{errors.confirmPassword}</Text>}

                <TouchableOpacity 
                  style={authStyles.termsContainer}
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                >
                  <View style={[
                    authStyles.checkbox,
                    acceptedTerms && authStyles.checkboxSelected
                  ]}>
                    {acceptedTerms && <Text style={{ color: '#fff' }}>✓</Text>}
                  </View>
                  <Text style={authStyles.termsText}>
                    I agree to the <Text style={authStyles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={authStyles.termsLink}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>
                {errors.terms && <Text style={authStyles.errorText}>{errors.terms}</Text>}

                <TouchableOpacity 
                  style={authStyles.button} 
                  onPress={handleRegister}
                >
                  <Text style={authStyles.buttonText}>Register</Text>
                </TouchableOpacity>
                
                <View style={authStyles.switchAuthContainer}>
                  <Text style={authStyles.switchAuthText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity 
                    style={authStyles.switchAuthButton}
                    onPress={() => router.push("/(auth)/login")}
                  >
                    <Text style={authStyles.switchAuthButtonText}>Login</Text>
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