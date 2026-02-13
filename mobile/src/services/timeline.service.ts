/**
 * Timeline Service
 * API calls for timeline events
 */

import api from './api';

export type EventType =
  | 'PRODUCTION_CREATED'
  | 'PRODUCTION_COMPLETED'
  | 'SHORT_CREATED'
  | 'SHORT_COMPLETED'
  | 'POST_PUBLISHED'
  | 'USER_FOLLOWED'
  | 'CONTENT_LIKED';

export interface TimelineEvent {
  id: string;
  userId: string;
  eventType: EventType;
  contentId?: string;
  contentType?: string;
  metadata?: {
    title?: string;
    userName?: string;
    userAvatar?: string;
    [key: string]: any;
  };
  createdAt: string;
  // Virtual fields populated from relations
  user?: {
    id: string;
    name: string;
    handle?: string;
    avatarUrl?: string;
  };
}

/**
 * Fetch user's timeline events
 */
export const getUserTimeline = async (
  limit: number = 20,
  offset: number = 0,
): Promise<TimelineEvent[]> => {
  try {
    const response = await api.get('/timeline/me', {
      params: { limit, offset },
    });
    return response.data.data || response.data || [];
  } catch (error: any) {
    console.error('getUserTimeline error:', error.response?.data || error.message);
    return [];
  }
};

/**
 * Fetch timeline from users the current user follows
 */
export const getFollowingTimeline = async (
  limit: number = 20,
  offset: number = 0,
): Promise<TimelineEvent[]> => {
  try {
    const response = await api.get('/timeline/following', {
      params: { limit, offset },
    });
    return response.data.data || response.data || [];
  } catch (error: any) {
    console.error('getFollowingTimeline error:', error.response?.data || error.message);
    return [];
  }
};

/**
 * Fetch global timeline (all users)
 */
export const getGlobalTimeline = async (
  limit: number = 20,
  offset: number = 0,
): Promise<TimelineEvent[]> => {
  try {
    const response = await api.get('/timeline/global', {
      params: { limit, offset },
    });
    return response.data.data || response.data || [];
  } catch (error: any) {
    console.error('getGlobalTimeline error:', error.response?.data || error.message);
    return [];
  }
};
