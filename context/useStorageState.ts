import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Type for the state and hook
type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

// Helper function to handle storage set
export async function setStorageItemAsync<T>(key: string, value: T | null) {
  const stringValue = value === null ? null : JSON.stringify(value);

  if (Platform.OS === 'web') {
    try {
      if (stringValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, stringValue);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (stringValue === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, stringValue);
    }
  }
}

// Main hook: Supports objects by serializing and deserializing values
export function useStorageState<T>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  // Retrieve value from storage
  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          const storedValue = localStorage.getItem(key);
          setState(storedValue ? JSON.parse(storedValue) : null);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value ? JSON.parse(value) : null);
      });
    }
  }, [key]);

  // Store value in storage
  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
