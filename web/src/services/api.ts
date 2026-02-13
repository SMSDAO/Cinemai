import axios from 'axios';
import type { User, Stats, TimelineEvent, Production, Short } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
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
