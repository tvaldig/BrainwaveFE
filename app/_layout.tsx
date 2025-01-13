import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreenComponent from '../components/SplashScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [showLottie, setShowLottie] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
    }
  }, [error]);

  useEffect(() => {
    const prepare = async () => {
      try {
        if (loaded) {
          await SplashScreen.hideAsync();
          await new Promise(resolve => setTimeout(resolve, 7500));
          setShowLottie(false);
          setIsAppReady(true);
        }
      } catch (e) {
        console.warn('Error preparing app:', e);
      }
    };

    prepare();
  }, [loaded]);

  useEffect(() => {
    if (isAppReady) {
      router.replace('/(auth)/login'); // Updated path
    }
  }, [isAppReady]);

  if (!loaded || showLottie) {
    return <SplashScreenComponent />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
