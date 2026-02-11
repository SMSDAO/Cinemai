/**
 * API Client Configuration
 * Axios instance with interceptors for auth and error handling
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      config => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired - trigger logout
          this.clearToken();
        }
        return Promise.reject(error);
      },
    );
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  clearToken() {
    this.accessToken = null;
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export const api = apiClient.getClient();
export default api;
