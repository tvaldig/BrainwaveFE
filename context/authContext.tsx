import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import axios from 'axios';

const API_URL = "http://localhost:8080";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Set Axios default Authorization header
const setAxiosAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  // Sign In function
  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const token = response.data.data.token;

      setAxiosAuthHeader(token); 
      setSession(token);
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

      setAxiosAuthHeader(token);
      setSession(token); 
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
