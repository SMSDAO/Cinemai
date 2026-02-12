export interface User {
  id: string;
  email: string;
  name: string;
  handle?: string;
  avatarUrl?: string;
  role: 'USER' | 'ADMIN';
  onboarded: boolean;
  createdAt: string;
}

export interface Stats {
  productions: number;
  shorts: number;
  followers: number;
  following: number;
  likes: number;
}

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
  metadata?: Record<string, any>;
  createdAt: string;
  user?: {
    handle?: string;
    name: string;
  };
}

export interface Production {
  id: string;
  userId: string;
  title: string;
  script?: string;
  status: string;
  outputUrl?: string;
  createdAt: string;
}

export interface Short {
  id: string;
  userId: string;
  title: string;
  idea?: string;
  status: string;
  outputUrl?: string;
  createdAt: string;
}
