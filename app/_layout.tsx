import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreenComponent from '../components/SplashScreen';

// Keep the native splash screen visible while we fetch resources
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
          // Hide the native splash screen
          await SplashScreen.hideAsync();
          
          // Show Lottie animation for 7.5 seconds
          await new Promise(resolve => setTimeout(resolve, 7500));
          
          // Hide Lottie and proceed to app
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
      console.log('App ready, navigating to login');
      router.replace('/(login)');
    }
  }, [isAppReady]);

  if (!loaded || showLottie) {
    return <SplashScreenComponent />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(login)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}