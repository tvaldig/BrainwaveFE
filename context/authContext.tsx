import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';

const API_URL = "https://brainwavebe-production.up.railway.app"; 

// AuthContext to manage authentication
const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
  session?: { token: string; userId: string } | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Utility to set Axios Authorization header
const setAxiosAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    console.log('Authorization header set:', axios.defaults.headers['Authorization']); // Log to confirm
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

// Hook to access session context
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

// SessionProvider Component
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<{
    token: string;
    userId: string;
  } | null>('session');

  // Sign In function
  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const token = response.data.data.token;
      const userId = response.data.data.idUser._id; 
      const sessionData = { token, userId };

      setAxiosAuthHeader(token);
      setSession(sessionData);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Sign Up function
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      const token = response.data.data.token;
      const userId = response.data.data.idUser._id; 

      const sessionData = { token, userId };
      
      setAxiosAuthHeader(token);
      setSession(sessionData);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Sign Out function
  const signOut = () => {
    setSession(null);
    setAxiosAuthHeader(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
