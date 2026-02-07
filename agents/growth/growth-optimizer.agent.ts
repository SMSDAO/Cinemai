/**
 * Growth Optimizer Agent
 * Determines optimal posting times and strategies for social media
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput, PublishingStrategy } from '../shared/types';
import { Validator } from '../shared/validation';
import { PromptTemplates } from '../shared/prompt-templates';

interface GrowthOptimizerInput extends AgentInput {
  contentType: 'production' | 'short';
  contentId: string;
  platforms: ('tiktok' | 'instagram' | 'youtube' | 'x')[];
  targetAudience?: string;
  contentMetadata?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}

interface GrowthOptimizerOutput {
  strategies: PublishingStrategy[];
  overallRecommendation: string;
  bestPlatform: string;
  estimatedReach: {
    platform: string;
    estimatedViews: number;
    confidence: number;
  }[];
}

export class GrowthOptimizerAgent extends BaseAgent {
  constructor() {
    super(
      'GrowthOptimizerAgent',
      `You are a social media growth expert. You understand platform algorithms, optimal posting times, hashtag strategies, and audience behavior patterns. You provide data-driven recommendations for maximizing content reach and engagement.`
    );
  }

  /**
   * Process growth optimization
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const optimizerInput = input as GrowthOptimizerInput;

      this.log('Starting growth optimization', {
        contentType: optimizerInput.contentType,
        platforms: optimizerInput.platforms,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Generate publishing strategy for each platform
        const strategies: PublishingStrategy[] = [];
        
        for (const platform of optimizerInput.platforms) {
          const strategy = await this.createPublishingStrategy(
            optimizerInput.contentType,
            platform,
            optimizerInput.targetAudience,
            optimizerInput.contentMetadata
          );
          strategies.push(strategy);
        }

        // Rank platforms by potential
        const rankedStrategies = this.rankStrategies(strategies);

        // Estimate reach for each platform
        const estimatedReach = await this.estimateReach(
          rankedStrategies,
          optimizerInput.contentType
        );

        // Generate overall recommendation
        const overallRecommendation = this.generateOverallRecommendation(
          rankedStrategies,
          estimatedReach
        );

        return {
          strategies: rankedStrategies,
          overallRecommendation,
          bestPlatform: rankedStrategies[0].platform,
          estimatedReach,
        };
      });

      this.log('Growth optimization completed', {
        bestPlatform: result.bestPlatform,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'gpt-4 + analytics-model',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['contentType', 'contentId', 'platforms'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const optimizerInput = input as GrowthOptimizerInput;
    
    if (!Array.isArray(optimizerInput.platforms) || optimizerInput.platforms.length === 0) {
      throw new Error('Platforms must be a non-empty array');
    }

    for (const platform of optimizerInput.platforms) {
      const platformValidation = Validator.validatePlatform(platform);
      if (!platformValidation.isValid) {
        throw new Error(platformValidation.errors.join(', '));
      }
    }
  }

  /**
   * Create publishing strategy for a platform
   */
  private async createPublishingStrategy(
    contentType: string,
    platform: string,
    targetAudience?: string,
    contentMetadata?: any
  ): Promise<PublishingStrategy> {
    this.log('Creating publishing strategy', { platform });

    const prompt = PromptTemplates.publishingStrategy(
      contentType,
      platform,
      targetAudience || 'general audience'
    );

    const response = await this.callAIModel(prompt, {
      model: 'gpt-4',
      maxTokens: 1000,
      temperature: 0.6,
    });

    // Determine optimal posting time based on platform and audience
    const optimalTime = this.getOptimalPostingTime(platform, targetAudience);

    // Generate hashtags
    const hashtags = await this.generateHashtags(
      platform,
      contentType,
      contentMetadata
    );

    // Generate caption
    const caption = await this.generateCaption(
      platform,
      contentType,
      contentMetadata
    );

    // Calculate confidence score
    const confidence = this.calculateConfidence(platform, contentType);

    return {
      platform,
      optimalTime,
      hashtags,
      caption,
      confidence,
    };
  }

  /**
   * Get optimal posting time for platform
   */
  private getOptimalPostingTime(
    platform: string,
    targetAudience?: string
  ): Date {
    // Platform-specific optimal times (based on engagement data)
    const optimalHours: { [key: string]: number[] } = {
      tiktok: [18, 19, 20], // 6-8 PM
      instagram: [11, 13, 19], // 11 AM, 1 PM, 7 PM
      youtube: [14, 15, 16], // 2-4 PM
      x: [12, 17, 18], // 12 PM, 5-6 PM
    };

    const hours = optimalHours[platform] || [12];
    const randomHour = hours[Math.floor(Math.random() * hours.length)];

    const optimalDate = new Date();
    optimalDate.setHours(randomHour, 0, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (optimalDate < new Date()) {
      optimalDate.setDate(optimalDate.getDate() + 1);
    }

    return optimalDate;
  }

  /**
   * Generate platform-specific hashtags
   */
  private async generateHashtags(
    platform: string,
    contentType: string,
    contentMetadata?: any
  ): Promise<string[]> {
    this.log('Generating hashtags', { platform });

    // Platform-specific hashtag strategies
    const hashtagCounts: { [key: string]: number } = {
      tiktok: 5,
      instagram: 15,
      youtube: 10,
      x: 3,
    };

    const count = hashtagCounts[platform] || 5;

    // Mock hashtag generation
    const baseHashtags = [
      'viral',
      'fyp',
      'trending',
      'explore',
      contentType === 'short' ? 'shorts' : 'cinema',
      'ai',
      'content',
      'creative',
    ];

    return baseHashtags.slice(0, count);
  }

  /**
   * Generate platform-specific caption
   */
  private async generateCaption(
    platform: string,
    contentType: string,
    contentMetadata?: any
  ): Promise<string> {
    this.log('Generating caption', { platform });

    const title = contentMetadata?.title || 'Check this out!';
    const description = contentMetadata?.description || '';

    // Platform-specific caption styles
    const captions: { [key: string]: string } = {
      tiktok: `${title} 🎬✨ ${description}`,
      instagram: `${title}\n\n${description}\n\n📱 Created with CinemAi`,
      youtube: `${title} | ${description}`,
      x: `${title} 🎥 ${description}`,
    };

    return captions[platform] || title;
  }

  /**
   * Calculate confidence score for strategy
   */
  private calculateConfidence(platform: string, contentType: string): number {
    // Mock confidence calculation based on platform-content fit
    const confidenceMap: { [key: string]: { [key: string]: number } } = {
      tiktok: { short: 0.95, production: 0.75 },
      instagram: { short: 0.90, production: 0.80 },
      youtube: { short: 0.85, production: 0.90 },
      x: { short: 0.70, production: 0.65 },
    };

    return confidenceMap[platform]?.[contentType] || 0.75;
  }

  /**
   * Rank strategies by confidence
   */
  private rankStrategies(strategies: PublishingStrategy[]): PublishingStrategy[] {
    return strategies.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Estimate reach for each platform
   */
  private async estimateReach(
    strategies: PublishingStrategy[],
    contentType: string
  ): Promise<any[]> {
    this.log('Estimating reach');

    return strategies.map((strategy) => {
      // Mock reach estimation
      const baseReach = contentType === 'short' ? 10000 : 5000;
      const platformMultiplier: { [key: string]: number } = {
        tiktok: 2.0,
        instagram: 1.5,
        youtube: 1.8,
        x: 1.2,
      };

      const multiplier = platformMultiplier[strategy.platform] || 1.0;
      const estimatedViews = Math.floor(baseReach * multiplier * strategy.confidence);

      return {
        platform: strategy.platform,
        estimatedViews,
        confidence: strategy.confidence,
      };
    });
  }

  /**
   * Generate overall recommendation
   */
  private generateOverallRecommendation(
    strategies: PublishingStrategy[],
    estimatedReach: any[]
  ): string {
    const bestStrategy = strategies[0];
    const bestReach = estimatedReach[0];

    return `Best platform: ${bestStrategy.platform} with estimated ${bestReach.estimatedViews.toLocaleString()} views. Post at ${bestStrategy.optimalTime.toLocaleString()} with ${bestStrategy.hashtags.length} hashtags. Cross-post to ${strategies.length - 1} additional platform(s) for maximum reach.`;
  }
}
