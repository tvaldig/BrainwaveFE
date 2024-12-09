import React from 'react';
import LottieView from 'lottie-react-native';

export default function SplashScreen() {
  return (
    <LottieView
      source={require('../assets/animations/SplashScreen.json')}
      style={{ width: '100%', height: '100%' }}
      autoPlay
      loop
    />
  );
}