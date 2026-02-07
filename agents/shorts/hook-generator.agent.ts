/**
 * Hook Generator Agent
 * Generates viral hook variants for short-form content
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput, HookVariant } from '../shared/types';
import { Validator } from '../shared/validation';
import { PromptTemplates } from '../shared/prompt-templates';

interface HookGeneratorInput extends AgentInput {
  topic: string;
  targetAudience?: string;
  platform?: 'tiktok' | 'instagram' | 'youtube' | 'x';
  count?: number;
  shortId: string;
}

interface HookGeneratorOutput {
  hooks: HookVariant[];
  topPick: HookVariant;
  analysisNotes: string;
}

export class HookGeneratorAgent extends BaseAgent {
  constructor() {
    super(
      'HookGeneratorAgent',
      `You are a viral content strategist. You understand what makes hooks attention-grabbing, scroll-stopping, and shareable. You create hooks that leverage curiosity gaps, pattern interrupts, and emotional triggers.`
    );
  }

  /**
   * Process hook generation
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const hookInput = input as HookGeneratorInput;

      this.log('Starting hook generation', {
        topic: hookInput.topic,
        count: hookInput.count || 5,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Generate hook variants
        const hooks = await this.generateHooks(
          hookInput.topic,
          hookInput.targetAudience,
          hookInput.platform,
          hookInput.count || 5
        );

        // Analyze and rank hooks
        const rankedHooks = await this.rankHooks(hooks);

        // Select top pick
        const topPick = rankedHooks[0];

        // Generate analysis notes
        const analysisNotes = await this.analyzeHooks(rankedHooks);

        return {
          hooks: rankedHooks,
          topPick,
          analysisNotes,
        };
      });

      this.log('Hook generation completed', {
        hookCount: result.hooks.length,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'gpt-4',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['topic', 'shortId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const hookInput = input as HookGeneratorInput;
    if (!hookInput.topic || hookInput.topic.trim().length === 0) {
      throw new Error('Topic cannot be empty');
    }

    if (hookInput.platform) {
      const platformValidation = Validator.validatePlatform(hookInput.platform);
      if (!platformValidation.isValid) {
        throw new Error(platformValidation.errors.join(', '));
      }
    }
  }

  /**
   * Generate hook variants
   */
  private async generateHooks(
    topic: string,
    targetAudience?: string,
    platform?: string,
    count: number = 5
  ): Promise<HookVariant[]> {
    this.log('Generating hooks', { topic, count });

    const prompt = PromptTemplates.hookGeneration(topic, count);
    const enhancedPrompt = `${prompt}

${targetAudience ? `Target Audience: ${targetAudience}` : ''}
${platform ? `Platform: ${platform}` : ''}

Focus on:
- Curiosity gaps
- Pattern interrupts
- Emotional triggers
- Urgency
- Controversy (when appropriate)
- Relatability`;

    const response = await this.callAIModel(enhancedPrompt, {
      model: 'gpt-4',
      maxTokens: 1000,
      temperature: 0.8, // Higher temperature for creativity
    });

    // Mock hook generation
    const hooks: HookVariant[] = [
      {
        id: `hook_1_${Date.now()}`,
        text: 'Nobody tells you this about...',
        style: 'curiosity-gap',
        confidence: 0.92,
      },
      {
        id: `hook_2_${Date.now()}`,
        text: "I wasted $10K before learning this",
        style: 'pain-point',
        confidence: 0.89,
      },
      {
        id: `hook_3_${Date.now()}`,
        text: 'This is going to blow your mind',
        style: 'excitement',
        confidence: 0.85,
      },
      {
        id: `hook_4_${Date.now()}`,
        text: 'Stop doing this immediately',
        style: 'urgency',
        confidence: 0.87,
      },
      {
        id: `hook_5_${Date.now()}`,
        text: 'The truth about [topic] is shocking',
        style: 'controversy',
        confidence: 0.83,
      },
    ];

    return hooks;
  }

  /**
   * Rank hooks by predicted performance
   */
  private async rankHooks(hooks: HookVariant[]): Promise<HookVariant[]> {
    this.log('Ranking hooks');

    // Sort by confidence score
    return hooks.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Analyze hooks and provide insights
   */
  private async analyzeHooks(hooks: HookVariant[]): Promise<string> {
    this.log('Analyzing hooks');

    const styleDistribution = hooks.reduce((acc, hook) => {
      acc[hook.style] = (acc[hook.style] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const avgConfidence =
      hooks.reduce((sum, hook) => sum + hook.confidence, 0) / hooks.length;

    return `Generated ${hooks.length} hook variants with an average confidence of ${(avgConfidence * 100).toFixed(1)}%. Style distribution: ${JSON.stringify(styleDistribution)}. Top performing style: ${hooks[0].style}.`;
  }
}
