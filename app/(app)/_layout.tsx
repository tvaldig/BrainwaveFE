import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/context/authContext';
import SplashScreenComponent from '../../components/SplashScreen';
import { Platform, Text } from 'react-native';
import React from 'react';

if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded, fontError] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { session, isLoading } = useSession();
  const [showLottie, setShowLottie] = useState(true);
  const [appReady, setIsAppReady] = useState(false);

  const [splashDone, setSplashDone] = useState(false); 

  // Check font loading errors
  useEffect(() => {
    if (fontError) {
      console.error('Font loading error:', fontError);
    }
  }, [fontError]);

  useEffect(() => {
    const prepare = async () => {
      try {
        if (loaded) {
          if (Platform.OS !== 'web') {
            await SplashScreen.hideAsync(); // Hide the splash screen on mobile
          }
          await new Promise(resolve => setTimeout(resolve, 7500)); // Simulate splash duration
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
    if (splashDone && !session) {
      router.replace('/login');
    }
  }, [splashDone, session]);


  // Skip splash screen on web
  if (!loaded || (showLottie && Platform.OS !== 'web')) {
    return <SplashScreenComponent />; // Show splash screen on mobile
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session && splashDone) {
    router.replace('/login');
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        {/* Private screens */}
        {session && (
          <>
            <Stack.Screen name="(dashboard)" />
            <Stack.Screen name="(course)" />
            <Stack.Screen name="(material)" />
            <Stack.Screen name="(question)" />
            <Stack.Screen name="(faq)" />
            <Stack.Screen name="(evaluation)" />
            <Stack.Screen name="(tracker)" />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
