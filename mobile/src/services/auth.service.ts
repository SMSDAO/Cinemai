/**
 * Authentication Service
 * Handles signup, login, and token management
 */

import api, { apiClient } from './api';

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
    subscription_type: 'free' | 'pro';
    trips_remaining: number;
  };
  access_token: string;
  refresh_token: string;
}

export const authService = {
  /**
   * Sign up a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    if (response.data.access_token) {
      apiClient.setToken(response.data.access_token);
    }
    return response.data;
  },

  /**
   * Log in an existing user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.access_token) {
      apiClient.setToken(response.data.access_token);
    }
    return response.data;
  },

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    apiClient.clearToken();
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    if (response.data.access_token) {
      apiClient.setToken(response.data.access_token);
    }
    return response.data;
  },
};
