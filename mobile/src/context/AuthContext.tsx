/**
 * Auth Context
 * Manages authentication state across the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '../services/auth.service';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  subscription_type: 'free' | 'pro';
  trips_remaining: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Load stored token and validate on mount
    setIsLoading(false);
  }, []);

  const handleAuthResponse = (response: AuthResponse) => {
    setUser(response.user);
    // TODO: Store tokens securely (AsyncStorage or SecureStore)
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      handleAuthResponse(response);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await authService.signup({ email, password, name });
      handleAuthResponse(response);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      // TODO: Clear stored tokens
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = () => {
    // TODO: Fetch updated user data
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
