/**
 * Growth Service
 * Handles social media publishing and analytics
 */

import api from './api';

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'x';
  account_name: string;
  created_at: string;
}

export interface SocialPost {
  id: string;
  user_id: string;
  social_account_id: string;
  content_id: string;
  content_type: 'production' | 'short';
  platform_post_id?: string;
  scheduled_at?: string;
  published_at?: string;
  status: 'scheduled' | 'published' | 'failed';
}

export interface SocialMetrics {
  id: string;
  social_post_id: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement_rate: number;
  collected_at: string;
}

export interface CreatePostData {
  social_account_id: string;
  content_id: string;
  content_type: 'production' | 'short';
  scheduled_at?: string;
}

export const growthService = {
  /**
   * Get connected social accounts
   */
  async getSocialAccounts(): Promise<SocialAccount[]> {
    const response = await api.get<SocialAccount[]>('/social/accounts');
    return response.data;
  },

  /**
   * Create a social post
   */
  async createPost(data: CreatePostData): Promise<SocialPost> {
    const response = await api.post<SocialPost>('/social/posts', data);
    return response.data;
  },

  /**
   * Get all scheduled and published posts
   */
  async getPosts(): Promise<SocialPost[]> {
    const response = await api.get<SocialPost[]>('/social/posts');
    return response.data;
  },

  /**
   * Get analytics for shorts
   */
  async getShortsAnalytics(): Promise<any> {
    const response = await api.get('/analytics/shorts');
    return response.data;
  },

  /**
   * Get analytics for productions
   */
  async getProductionsAnalytics(): Promise<any> {
    const response = await api.get('/analytics/productions');
    return response.data;
  },

  /**
   * Get metrics for a specific post
   */
  async getPostMetrics(postId: string): Promise<SocialMetrics> {
    const response = await api.get<SocialMetrics>(`/social/posts/${postId}/metrics`);
    return response.data;
  },
};
