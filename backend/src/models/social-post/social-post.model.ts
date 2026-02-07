/**
 * Social Post Model
 * Represents a post to social media platforms
 */
export interface SocialPost {
  id: string;
  userId: string;
  socialAccountId: string;
  contentId: string;
  contentType: 'production' | 'short';
  platformPostId?: string;
  scheduledAt?: Date;
  publishedAt?: Date;
  status: 'scheduled' | 'published' | 'failed';
  caption?: string;
  createdAt: Date;
}

/**
 * Social post create input
 */
export interface CreateSocialPostInput {
  userId: string;
  socialAccountId: string;
  contentId: string;
  contentType: 'production' | 'short';
  caption?: string;
  scheduledAt?: Date;
}
