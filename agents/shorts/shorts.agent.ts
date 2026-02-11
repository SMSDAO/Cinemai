/**
 * Shorts Agent - Main orchestrator
 * Coordinates the shorts generation pipeline
 */

import { HookGeneratorAgent } from './hook-generator.agent';
import { VariantPlannerAgent } from './variant-planner.agent';
import { CaptionEngineAgent } from './caption-engine.agent';
import { ShortsRenderAgent } from './shorts-render.agent';

export class ShortsAgent {
  private hookGeneratorAgent: HookGeneratorAgent;
  private variantPlannerAgent: VariantPlannerAgent;
  private captionEngineAgent: CaptionEngineAgent;
  private shortsRenderAgent: ShortsRenderAgent;

  constructor() {
    this.hookGeneratorAgent = new HookGeneratorAgent();
    this.variantPlannerAgent = new VariantPlannerAgent();
    this.captionEngineAgent = new CaptionEngineAgent();
    this.shortsRenderAgent = new ShortsRenderAgent();
  }

  /**
   * Execute the full shorts generation pipeline
   */
  async executeFullPipeline(input: {
    topic: string;
    videoUrl: string;
    audioUrl: string;
    format: '9:16' | '1:1' | '16:9';
    targetPlatforms: string[];
    shortId: string;
  }) {
    console.log('[ShortsAgent] Starting full pipeline execution');

    // 1. Hook Generation
    const hookResult = await this.hookGeneratorAgent.process({
      topic: input.topic,
      platform: input.targetPlatforms[0],
      shortId: input.shortId,
    });

    if (!hookResult.success) {
      throw new Error(`Hook generation failed: ${hookResult.error}`);
    }

    // 2. Variant Planning
    const variantResult = await this.variantPlannerAgent.process({
      selectedHook: hookResult.data.topPick.text,
      baseVideo: input.videoUrl,
      targetPlatforms: input.targetPlatforms,
      shortId: input.shortId,
    });

    if (!variantResult.success) {
      throw new Error(`Variant planning failed: ${variantResult.error}`);
    }

    // 3. Caption Generation
    const captionResult = await this.captionEngineAgent.process({
      audioUrl: input.audioUrl,
      shortId: input.shortId,
    });

    if (!captionResult.success) {
      throw new Error(`Caption generation failed: ${captionResult.error}`);
    }

    // 4. Render
    const renderResult = await this.shortsRenderAgent.process({
      videoUrl: input.videoUrl,
      captionFileUrl: captionResult.data.captionFileUrl,
      format: input.format,
      shortId: input.shortId,
    });

    if (!renderResult.success) {
      throw new Error(`Shorts render failed: ${renderResult.error}`);
    }

    console.log('[ShortsAgent] Pipeline execution completed');

    return {
      success: true,
      hooks: hookResult.data.hooks,
      selectedHook: hookResult.data.topPick,
      variants: variantResult.data.variants,
      outputUrl: renderResult.data.outputUrl,
      thumbnailUrl: renderResult.data.thumbnailUrl,
    };
  }

  /**
   * Generate hooks only
   */
  async generateHooks(input: {
    topic: string;
    platform?: string;
    count?: number;
    shortId: string;
  }) {
    return await this.hookGeneratorAgent.process(input);
  }

  /**
   * Generate captions only
   */
  async generateCaptions(input: {
    audioUrl: string;
    transcript?: string;
    shortId: string;
  }) {
    return await this.captionEngineAgent.process(input);
  }
}
