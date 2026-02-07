/**
 * Social Account Model
 * Represents a connected social media account
 */
export interface SocialAccount {
  id: string;
  userId: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'x';
  accountName: string;
  accessToken: string; // Encrypted in DB
  refreshToken?: string; // Encrypted in DB
  createdAt: Date;
}

/**
 * Social account create input
 */
export interface CreateSocialAccountInput {
  userId: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'x';
  accountName: string;
  accessToken: string;
  refreshToken?: string;
}
