/**
 * Analytics Agent
 * Analyzes performance metrics and provides actionable insights
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput, AnalyticsInsight } from '../shared/types';
import { Validator } from '../shared/validation';
import { PromptTemplates } from '../shared/prompt-templates';

interface AnalyticsInput extends AgentInput {
  userId: string;
  timeRange?: {
    start: Date;
    end: Date;
  };
  platforms?: string[];
  contentType?: 'production' | 'short' | 'all';
}

interface PerformanceMetrics {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  engagementRate: number;
  averageWatchTime: number;
  followerGrowth: number;
}

interface PlatformPerformance {
  platform: string;
  metrics: PerformanceMetrics;
  topContent: {
    contentId: string;
    title: string;
    views: number;
    engagementRate: number;
  }[];
}

interface AnalyticsOutput {
  summary: PerformanceMetrics;
  platformBreakdown: PlatformPerformance[];
  insights: AnalyticsInsight[];
  recommendations: string[];
  trends: {
    metric: string;
    change: number;
    direction: 'up' | 'down' | 'stable';
  }[];
  benchmarks: {
    metric: string;
    yourValue: number;
    industryAverage: number;
    percentile: number;
  }[];
}

export class AnalyticsAgent extends BaseAgent {
  constructor() {
    super(
      'AnalyticsAgent',
      `You are a data analyst specializing in social media analytics. You identify patterns, trends, and actionable insights from performance data. You provide clear, data-driven recommendations for content improvement and audience growth.`
    );
  }

  /**
   * Process analytics
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const analyticsInput = input as AnalyticsInput;

      this.log('Starting analytics analysis', {
        userId: analyticsInput.userId,
        platforms: analyticsInput.platforms,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Fetch performance data
        const performanceData = await this.fetchPerformanceData(
          analyticsInput.userId,
          analyticsInput.timeRange,
          analyticsInput.platforms,
          analyticsInput.contentType
        );

        // Calculate summary metrics
        const summary = this.calculateSummaryMetrics(performanceData);

        // Analyze platform performance
        const platformBreakdown = await this.analyzePlatformPerformance(
          performanceData
        );

        // Generate insights
        const insights = await this.generateInsights(
          summary,
          platformBreakdown
        );

        // Generate recommendations
        const recommendations = await this.generateRecommendations(
          insights,
          platformBreakdown
        );

        // Calculate trends
        const trends = this.calculateTrends(performanceData);

        // Compare to benchmarks
        const benchmarks = this.compareToBenchmarks(summary);

        return {
          summary,
          platformBreakdown,
          insights,
          recommendations,
          trends,
          benchmarks,
        };
      });

      this.log('Analytics analysis completed', {
        insightCount: result.insights.length,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'gpt-4 + analytics-engine',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['userId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
  }

  /**
   * Fetch performance data from database
   */
  private async fetchPerformanceData(
    userId: string,
    timeRange?: any,
    platforms?: string[],
    contentType?: string
  ): Promise<any> {
    this.log('Fetching performance data', { userId });

    // Placeholder: Query database for metrics
    // Real implementation would query social_posts and social_metrics tables

    return {
      posts: [
        {
          id: '1',
          platform: 'tiktok',
          contentType: 'short',
          views: 50000,
          likes: 5000,
          shares: 500,
          comments: 200,
          engagementRate: 11.4,
        },
        {
          id: '2',
          platform: 'instagram',
          contentType: 'short',
          views: 30000,
          likes: 3000,
          shares: 300,
          comments: 150,
          engagementRate: 11.5,
        },
      ],
    };
  }

  /**
   * Calculate summary metrics
   */
  private calculateSummaryMetrics(data: any): PerformanceMetrics {
    this.log('Calculating summary metrics');

    const posts = data.posts || [];

    const totalViews = posts.reduce((sum: number, p: any) => sum + p.views, 0);
    const totalLikes = posts.reduce((sum: number, p: any) => sum + p.likes, 0);
    const totalShares = posts.reduce((sum: number, p: any) => sum + p.shares, 0);
    const totalComments = posts.reduce((sum: number, p: any) => sum + p.comments, 0);

    const totalEngagement = totalLikes + totalShares + totalComments;
    const engagementRate = totalViews > 0 ? (totalEngagement / totalViews) * 100 : 0;

    return {
      totalViews,
      totalLikes,
      totalShares,
      totalComments,
      engagementRate,
      averageWatchTime: 45, // seconds
      followerGrowth: 150, // new followers
    };
  }

  /**
   * Analyze platform-specific performance
   */
  private async analyzePlatformPerformance(data: any): Promise<PlatformPerformance[]> {
    this.log('Analyzing platform performance');

    const posts = data.posts || [];
    const platformMap = new Map<string, any[]>();

    // Group posts by platform
    posts.forEach((post: any) => {
      if (!platformMap.has(post.platform)) {
        platformMap.set(post.platform, []);
      }
      platformMap.get(post.platform)?.push(post);
    });

    // Calculate metrics for each platform
    const platformPerformance: PlatformPerformance[] = [];

    platformMap.forEach((platformPosts, platform) => {
      const metrics = this.calculateSummaryMetrics({ posts: platformPosts });
      const topContent = platformPosts
        .sort((a, b) => b.views - a.views)
        .slice(0, 3)
        .map((post) => ({
          contentId: post.id,
          title: post.title || 'Untitled',
          views: post.views,
          engagementRate: post.engagementRate,
        }));

      platformPerformance.push({
        platform,
        metrics,
        topContent,
      });
    });

    return platformPerformance;
  }

  /**
   * Generate insights from data
   */
  private async generateInsights(
    summary: PerformanceMetrics,
    platformBreakdown: PlatformPerformance[]
  ): Promise<AnalyticsInsight[]> {
    this.log('Generating insights');

    const prompt = PromptTemplates.analyticsInsights({
      summary,
      platformBreakdown,
    });

    const response = await this.callAIModel(prompt, {
      model: 'gpt-4',
      maxTokens: 1500,
      temperature: 0.5,
    });

    // Mock insights
    const insights: AnalyticsInsight[] = [
      {
        metric: 'engagement_rate',
        value: summary.engagementRate,
        trend: summary.engagementRate > 10 ? 'up' : 'down',
        recommendation: 'Your engagement rate is above industry average. Continue posting similar content.',
      },
      {
        metric: 'watch_time',
        value: summary.averageWatchTime,
        trend: 'stable',
        recommendation: 'Average watch time is good. Consider adding hooks in the first 3 seconds to increase retention.',
      },
      {
        metric: 'follower_growth',
        value: summary.followerGrowth,
        trend: 'up',
        recommendation: 'Strong follower growth. Maintain posting consistency and engage with your audience.',
      },
    ];

    return insights;
  }

  /**
   * Generate actionable recommendations
   */
  private async generateRecommendations(
    insights: AnalyticsInsight[],
    platformBreakdown: PlatformPerformance[]
  ): Promise<string[]> {
    this.log('Generating recommendations');

    const recommendations: string[] = [];

    // Best performing platform
    const bestPlatform = platformBreakdown.sort(
      (a, b) => b.metrics.engagementRate - a.metrics.engagementRate
    )[0];

    recommendations.push(
      `Focus more content on ${bestPlatform.platform} where you have ${bestPlatform.metrics.engagementRate.toFixed(1)}% engagement rate`
    );

    // Posting frequency
    recommendations.push(
      'Increase posting frequency to 3-5 times per week for optimal growth'
    );

    // Content optimization
    recommendations.push(
      'Add stronger hooks in the first 3 seconds to improve watch time'
    );

    // Cross-promotion
    recommendations.push(
      'Cross-promote your best-performing content across all platforms'
    );

    return recommendations;
  }

  /**
   * Calculate metric trends
   */
  private calculateTrends(data: any): any[] {
    this.log('Calculating trends');

    // Mock trend calculation
    return [
      { metric: 'views', change: 25.5, direction: 'up' as const },
      { metric: 'engagement', change: 15.2, direction: 'up' as const },
      { metric: 'followers', change: 8.3, direction: 'up' as const },
    ];
  }

  /**
   * Compare metrics to industry benchmarks
   */
  private compareToBenchmarks(summary: PerformanceMetrics): any[] {
    this.log('Comparing to benchmarks');

    // Mock benchmark comparison
    return [
      {
        metric: 'Engagement Rate',
        yourValue: summary.engagementRate,
        industryAverage: 8.5,
        percentile: 75,
      },
      {
        metric: 'Average Watch Time',
        yourValue: summary.averageWatchTime,
        industryAverage: 40,
        percentile: 60,
      },
    ];
  }
}
