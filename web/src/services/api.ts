import axios from 'axios';
import type { User, Stats, TimelineEvent, Production, Short, AdminUser, AdminContentItem, SystemStats } from '../types';

// Validate API URL is configured
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error('VITE_API_URL environment variable is not set. Please configure it in your .env file.');
  throw new Error('API URL is not configured. Please set VITE_API_URL environment variable.');
}

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const getMyStats = async (): Promise<Stats> => {
  const { data } = await api.get('/users/me/stats');
  return data;
};

interface TimelineParams {
  limit?: number;
  offset?: number;
}

export const getUserTimeline = async (params: TimelineParams = {}): Promise<TimelineEvent[]> => {
  const { data } = await api.get('/timeline/me', { params });
  return data;
};

export const getFollowingTimeline = async (params: TimelineParams = {}): Promise<TimelineEvent[]> => {
  const { data } = await api.get('/timeline/following', { params });
  return data;
};

export const getGlobalTimeline = async (params: TimelineParams = {}): Promise<TimelineEvent[]> => {
  const { data } = await api.get('/timeline/global', { params });
  return data;
};

export const getRecentProductions = async (): Promise<Production[]> => {
  const { data } = await api.get('/cinema/productions', { params: { limit: 5 } });
  return data;
};

export const getRecentShorts = async (): Promise<Short[]> => {
  const { data } = await api.get('/shorts', { params: { limit: 5 } });
  return data;
};

export const createProduction = async (payload: { title: string; script: string }): Promise<Production> => {
  const { data } = await api.post('/cinema/productions', payload);
  return data;
};

export const createShort = async (payload: { title: string; idea: string }): Promise<Short> => {
  const { data } = await api.post('/shorts', payload);
  return data;
};

export const login = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const signup = async (email: string, password: string): Promise<{ message: string }> => {
  const { data } = await api.post('/auth/signup', { email, password });
  return data;
};

// Admin endpoints
interface AdminUsersParams {
  page?: number;
  limit?: number;
}

export const getAdminUsers = async (params: AdminUsersParams = {}): Promise<AdminUser[]> => {
  const { data } = await api.get('/admin/users', { params });
  return data;
};

export const getAdminContent = async (params: { limit?: number } = {}): Promise<AdminContentItem[]> => {
  const productions = await api.get('/cinema/productions', { params: { limit: params.limit || 20 } });
  const shorts = await api.get('/shorts', { params: { limit: params.limit || 20 } });
  
  const content: AdminContentItem[] = [
    ...productions.data.map((p: Production) => ({
      ...p,
      type: 'PRODUCTION' as const,
    })),
    ...shorts.data.map((s: Short) => ({
      ...s,
      type: 'SHORT' as const,
    })),
  ];
  
  return content.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getAdminSystemStats = async (): Promise<SystemStats> => {
  const { data } = await api.get('/admin/dashboard');
  return data;
};
