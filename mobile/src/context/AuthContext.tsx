/**
 * Auth Context
 * Manages authentication state across the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, AuthResponse } from '../services/auth.service';
import { api } from '../services/api';

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
  refreshUser: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = '@cinemai_token';
const USER_KEY = '@cinemai_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const storedUser = await AsyncStorage.getItem(USER_KEY);

      if (token && storedUser) {
        // Set token in API client
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load stored auth', error);
    } finally {
      setIsLoading(false);
    }
  };

  const storeAuth = async (token: string, userData: User) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Failed to store auth', error);
    }
  };

  const clearAuth = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Failed to clear auth', error);
    }
  };

  const handleAuthResponse = async (response: AuthResponse) => {
    const userData: User = {
      id: response.user.id,
      email: response.user.email,
      name: response.user.name || '',
      avatar_url: response.user.avatar_url,
      subscription_type: response.user.subscription_type || 'free',
      trips_remaining: response.user.trips_remaining || 0,
    };

    setUser(userData);
    await storeAuth(response.token, userData);
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    await handleAuthResponse(response);
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await authService.signup({ email, password, name });
    await handleAuthResponse(response);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await clearAuth();
  };

  const refreshUser = async () => {
    try {
      const response = await authService.getMe();
      const userData: User = {
        id: response.id,
        email: response.email,
        name: response.name || '',
        avatar_url: response.avatar_url,
        subscription_type: response.subscription_type || 'free',
        trips_remaining: response.trips_remaining || 0,
      };
      setUser(userData);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user', error);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) {
      throw new Error('No user logged in');
    }
    await authService.changePassword({ currentPassword, newPassword });
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
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
