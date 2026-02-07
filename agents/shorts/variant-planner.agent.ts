/**
 * Variant Planner Agent
 * Plans A/B test variants for short-form content
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput } from '../shared/types';
import { Validator } from '../shared/validation';

interface VariantPlannerInput extends AgentInput {
  selectedHook: string;
  baseVideo: string;
  targetPlatforms: string[];
  variantCount?: number;
  shortId: string;
}

interface VariantSpec {
  variantId: string;
  variantNumber: number;
  hook: string;
  captionStyle: {
    font: string;
    color: string;
    position: 'top' | 'center' | 'bottom';
    animation: string;
  };
  musicTrack?: string;
  effects?: string[];
  targetPlatform?: string;
  hypothesis: string;
}

interface VariantPlannerOutput {
  variants: VariantSpec[];
  totalVariants: number;
  testStrategy: string;
  successMetrics: string[];
}

export class VariantPlannerAgent extends BaseAgent {
  constructor() {
    super(
      'VariantPlannerAgent',
      `You are an A/B testing strategist for short-form video content. You understand how to create meaningful variants that test specific hypotheses about audience engagement.`
    );
  }

  /**
   * Process variant planning
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const plannerInput = input as VariantPlannerInput;

      this.log('Starting variant planning', {
        variantCount: plannerInput.variantCount || 3,
        platforms: plannerInput.targetPlatforms,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Generate variant specifications
        const variants = await this.generateVariantSpecs(
          plannerInput.selectedHook,
          plannerInput.baseVideo,
          plannerInput.targetPlatforms,
          plannerInput.variantCount || 3,
          plannerInput.shortId
        );

        // Define test strategy
        const testStrategy = await this.defineTestStrategy(
          variants,
          plannerInput.targetPlatforms
        );

        // Define success metrics
        const successMetrics = await this.defineSuccessMetrics(
          plannerInput.targetPlatforms
        );

        return {
          variants,
          totalVariants: variants.length,
          testStrategy,
          successMetrics,
        };
      });

      this.log('Variant planning completed', {
        totalVariants: result.totalVariants,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'variant-planner',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['selectedHook', 'baseVideo', 'targetPlatforms', 'shortId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const plannerInput = input as VariantPlannerInput;
    if (!Array.isArray(plannerInput.targetPlatforms) || plannerInput.targetPlatforms.length === 0) {
      throw new Error('Target platforms must be a non-empty array');
    }
  }

  /**
   * Generate variant specifications
   */
  private async generateVariantSpecs(
    selectedHook: string,
    baseVideo: string,
    targetPlatforms: string[],
    variantCount: number,
    shortId: string
  ): Promise<VariantSpec[]> {
    this.log('Generating variant specs', { variantCount });

    const variants: VariantSpec[] = [];

    // Create variants with different caption styles
    const captionStyles = [
      {
        font: 'Inter Bold',
        color: '#FFFFFF',
        position: 'bottom' as const,
        animation: 'word-pop',
      },
      {
        font: 'Montserrat Heavy',
        color: '#00F0FF',
        position: 'center' as const,
        animation: 'slide-up',
      },
      {
        font: 'Bebas Neue',
        color: '#FF2EF5',
        position: 'top' as const,
        animation: 'fade-in',
      },
    ];

    for (let i = 0; i < variantCount; i++) {
      const captionStyle = captionStyles[i % captionStyles.length];
      const platform = targetPlatforms[i % targetPlatforms.length];

      variants.push({
        variantId: `variant_${shortId}_${i + 1}`,
        variantNumber: i + 1,
        hook: selectedHook,
        captionStyle,
        musicTrack: this.selectMusicForVariant(i),
        effects: this.selectEffectsForVariant(i),
        targetPlatform: platform,
        hypothesis: this.generateHypothesis(captionStyle, platform),
      });
    }

    return variants;
  }

  /**
   * Select music track for variant
   */
  private selectMusicForVariant(variantIndex: number): string {
    const musicTracks = [
      'trending-upbeat-1',
      'trending-dramatic-1',
      'trending-chill-1',
    ];
    return musicTracks[variantIndex % musicTracks.length];
  }

  /**
   * Select effects for variant
   */
  private selectEffectsForVariant(variantIndex: number): string[] {
    const effectSets = [
      ['zoom-in', 'flash'],
      ['glitch', 'color-grade'],
      ['slow-mo', 'particles'],
    ];
    return effectSets[variantIndex % effectSets.length];
  }

  /**
   * Generate hypothesis for variant
   */
  private generateHypothesis(
    captionStyle: any,
    platform: string
  ): string {
    return `Testing ${captionStyle.animation} animation with ${captionStyle.color} captions in ${captionStyle.position} position on ${platform}. Hypothesis: ${captionStyle.animation} will increase watch time by emphasizing key words.`;
  }

  /**
   * Define test strategy
   */
  private async defineTestStrategy(
    variants: VariantSpec[],
    targetPlatforms: string[]
  ): Promise<string> {
    this.log('Defining test strategy');

    return `A/B test ${variants.length} variants across ${targetPlatforms.length} platform(s). Each variant tests a specific hypothesis about caption styling, music, and effects. Monitor performance for 48 hours, then identify winning variant based on engagement metrics.`;
  }

  /**
   * Define success metrics
   */
  private async defineSuccessMetrics(platforms: string[]): Promise<string[]> {
    this.log('Defining success metrics');

    const baseMetrics = [
      'view_count',
      'watch_time_percentage',
      'engagement_rate',
      'share_count',
    ];

    // Add platform-specific metrics
    const platformMetrics: { [key: string]: string[] } = {
      tiktok: ['for_you_page_views', 'sound_usage'],
      instagram: ['reel_plays', 'profile_visits'],
      youtube: ['click_through_rate', 'subscriber_growth'],
      x: ['retweet_count', 'quote_tweet_count'],
    };

    const allMetrics = new Set(baseMetrics);
    platforms.forEach((platform) => {
      if (platformMetrics[platform]) {
        platformMetrics[platform].forEach((metric) => allMetrics.add(metric));
      }
    });

    return Array.from(allMetrics);
  }
}
