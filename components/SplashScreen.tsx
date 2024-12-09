import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, Dimensions } from 'react-native';

export default function SplashScreen() {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Ensure animation plays when component mounts
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        autoPlay
        loop={false}
        speed={0.5} 
        source={require('../assets/animations/SplashScreen.json')}
        style={styles.animation}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  animation: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
