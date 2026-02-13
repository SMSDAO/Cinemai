/**
 * Dashboard Service
 * API calls for dashboard data and user stats
 */

import api from './api';

export interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    handle?: string;
    avatarUrl?: string;
    bio?: string;
    stats?: any;
  };
  recentProductions: Array<{
    id: string;
    title: string;
    status: string;
    outputUrl?: string;
    createdAt: string;
  }>;
  recentShorts: Array<{
    id: string;
    title: string;
    status: string;
    outputUrl?: string;
    createdAt: string;
  }>;
  timelineEvents: Array<{
    id: string;
    userId: string;
    eventType: string;
    contentId?: string;
    contentType?: string;
    metadata?: any;
    createdAt: string;
  }>;
  analytics: {
    totalProductions: number;
    totalShorts: number;
    totalPosts: number;
  };
}

export interface UserStats {
  followers: number;
  following: number;
  likes: number;
  productions: number;
  shorts: number;
}

/**
 * Fetch complete dashboard data for the authenticated user
 */
export const getDashboard = async (): Promise<DashboardData> => {
  try {
    const response = await api.get('/dashboard');
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('getDashboard error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
  }
};

/**
 * Fetch user stats (followers, following, likes, etc.)
 */
export const getUserStats = async (userId?: string): Promise<UserStats> => {
  try {
    const endpoint = userId ? `/users/${userId}/stats` : '/users/me/stats';
    const response = await api.get(endpoint);
    return response.data.data || response.data;
  } catch (error: any) {
    console.error('getUserStats error:', error.response?.data || error.message);
    // Return default stats if API fails
    return {
      followers: 0,
      following: 0,
      likes: 0,
      productions: 0,
      shorts: 0,
    };
  }
};
