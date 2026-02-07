/**
 * Social Metrics Model
 * Represents performance metrics for a social post
 */
export interface SocialMetrics {
  id: string;
  socialPostId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
  collectedAt: Date;
}

/**
 * Social metrics create input
 */
export interface CreateSocialMetricsInput {
  socialPostId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
}
