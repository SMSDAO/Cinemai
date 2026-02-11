/**
 * Growth Agent - Main orchestrator
 * Coordinates growth and analytics workflows
 */

import { GrowthOptimizerAgent } from './growth-optimizer.agent';
import { AnalyticsAgent } from './analytics.agent';

export class GrowthAgent {
  private growthOptimizerAgent: GrowthOptimizerAgent;
  private analyticsAgent: AnalyticsAgent;

  constructor() {
    this.growthOptimizerAgent = new GrowthOptimizerAgent();
    this.analyticsAgent = new AnalyticsAgent();
  }

  /**
   * Optimize content publishing strategy
   */
  async optimizePublishing(input: {
    contentType: 'production' | 'short';
    contentId: string;
    platforms: ('tiktok' | 'instagram' | 'youtube' | 'x')[];
    targetAudience?: string;
    contentMetadata?: any;
  }) {
    console.log('[GrowthAgent] Optimizing publishing strategy');

    const result = await this.growthOptimizerAgent.process(input);

    if (!result.success) {
      throw new Error(`Growth optimization failed: ${result.error}`);
    }

    return result;
  }

  /**
   * Analyze performance and generate insights
   */
  async analyzePerformance(input: {
    userId: string;
    timeRange?: {
      start: Date;
      end: Date;
    };
    platforms?: string[];
    contentType?: 'production' | 'short' | 'all';
  }) {
    console.log('[GrowthAgent] Analyzing performance');

    const result = await this.analyticsAgent.process(input);

    if (!result.success) {
      throw new Error(`Analytics failed: ${result.error}`);
    }

    return result;
  }

  /**
   * Get publishing recommendations for content
   */
  async getPublishingRecommendations(contentId: string, platforms: string[]) {
    const result = await this.growthOptimizerAgent.process({
      contentType: 'short',
      contentId,
      platforms: platforms as any[],
    });

    if (!result.success) {
      return null;
    }

    return {
      bestPlatform: result.data.bestPlatform,
      strategies: result.data.strategies,
      recommendation: result.data.overallRecommendation,
    };
  }

  /**
   * Get quick insights for user
   */
  async getQuickInsights(userId: string) {
    const result = await this.analyticsAgent.process({
      userId,
    });

    if (!result.success) {
      return null;
    }

    return {
      summary: result.data.summary,
      topInsights: result.data.insights.slice(0, 3),
      topRecommendations: result.data.recommendations.slice(0, 3),
    };
  }
}
