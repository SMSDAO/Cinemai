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

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
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
  token: string;
}

export const authService = {
  /**
   * Sign up a new user
   */
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    if (response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response.data;
  },

  /**
   * Log in an existing user
   */
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data.token) {
      apiClient.setToken(response.data.token);
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
  async refreshToken(token: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh', {
      token,
    });
    if (response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getMe(): Promise<any> {
    const response = await api.get('/users/me');
    return response.data;
  },

  /**
   * Change password
   */
  async changePassword(data: ChangePasswordData): Promise<void> {
    await api.post('/auth/change-password', data);
  },
};
