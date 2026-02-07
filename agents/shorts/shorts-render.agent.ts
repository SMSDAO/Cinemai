/**
 * Shorts Render Agent
 * Renders final short videos with captions in multiple formats
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput } from '../shared/types';
import { Validator } from '../shared/validation';

interface ShortsRenderInput extends AgentInput {
  videoUrl: string;
  captionFileUrl: string;
  format: '9:16' | '1:1' | '16:9';
  effects?: string[];
  brandKit?: {
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  shortId: string;
}

interface ShortsRenderOutput {
  outputUrl: string;
  format: string;
  resolution: { width: number; height: number };
  fileSize: number;
  duration: number;
  thumbnailUrl: string;
  variants?: {
    format: string;
    url: string;
  }[];
}

export class ShortsRenderAgent extends BaseAgent {
  constructor() {
    super(
      'ShortsRenderAgent',
      `You are a short-form video rendering specialist. You understand platform-specific requirements, optimal encoding settings, and how to create engaging short videos that perform well on social media.`
    );
  }

  /**
   * Process shorts rendering
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const renderInput = input as ShortsRenderInput;

      this.log('Starting shorts render', {
        format: renderInput.format,
        hasEffects: !!renderInput.effects,
        hasBrandKit: !!renderInput.brandKit,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Get resolution for format
        const resolution = this.getResolutionForFormat(renderInput.format);

        // Prepare rendering configuration
        const renderConfig = await this.prepareRenderConfig(
          renderInput,
          resolution
        );

        // Render video with captions
        const outputUrl = await this.renderVideo(
          renderInput.videoUrl,
          renderInput.captionFileUrl,
          renderConfig,
          renderInput.shortId
        );

        // Generate thumbnail
        const thumbnailUrl = await this.generateThumbnail(
          outputUrl,
          renderInput.shortId
        );

        // Get file metadata
        const metadata = await this.getVideoMetadata(outputUrl);

        // Optionally render additional format variants
        const variants = await this.renderAdditionalFormats(
          renderInput,
          renderConfig
        );

        return {
          outputUrl,
          format: renderInput.format,
          resolution,
          fileSize: metadata.fileSize,
          duration: metadata.duration,
          thumbnailUrl,
          variants,
        };
      });

      this.log('Shorts render completed', {
        format: result.format,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'ffmpeg + caption-overlay',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['videoUrl', 'captionFileUrl', 'format', 'shortId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const renderInput = input as ShortsRenderInput;
    
    const formatValidation = Validator.validateVideoFormat(renderInput.format);
    if (!formatValidation.isValid) {
      throw new Error(formatValidation.errors.join(', '));
    }

    if (!Validator.validateUrl(renderInput.videoUrl)) {
      throw new Error('Invalid video URL');
    }

    if (!Validator.validateUrl(renderInput.captionFileUrl)) {
      throw new Error('Invalid caption file URL');
    }
  }

  /**
   * Get resolution for format
   */
  private getResolutionForFormat(format: string): { width: number; height: number } {
    const resolutions: { [key: string]: { width: number; height: number } } = {
      '9:16': { width: 1080, height: 1920 }, // TikTok, Instagram Reels
      '1:1': { width: 1080, height: 1080 },   // Instagram Feed
      '16:9': { width: 1920, height: 1080 },  // YouTube Shorts
    };

    return resolutions[format] || resolutions['9:16'];
  }

  /**
   * Prepare rendering configuration
   */
  private async prepareRenderConfig(
    input: ShortsRenderInput,
    resolution: { width: number; height: number }
  ): Promise<any> {
    this.log('Preparing render config');

    return {
      resolution,
      format: 'mp4',
      codec: 'h264',
      bitrate: 8000000, // 8 Mbps
      framerate: 30,
      audioCodec: 'aac',
      audioBitrate: 192000,
      effects: input.effects || [],
      brandKit: input.brandKit || {},
    };
  }

  /**
   * Render video with captions and effects
   */
  private async renderVideo(
    videoUrl: string,
    captionFileUrl: string,
    config: any,
    shortId: string
  ): Promise<string> {
    this.log('Rendering video', { resolution: config.resolution });

    // Placeholder: Use FFmpeg to:
    // 1. Crop/resize video to target format
    // 2. Overlay captions with animations
    // 3. Apply effects (zoom, glitch, etc.)
    // 4. Add brand kit elements (logo, colors)
    // 5. Encode with optimal settings

    // Simulate render time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const outputUrl = `s3://shorts/${shortId}/output_${config.resolution.width}x${config.resolution.height}.mp4`;
    return outputUrl;
  }

  /**
   * Generate thumbnail
   */
  private async generateThumbnail(
    videoUrl: string,
    shortId: string
  ): Promise<string> {
    this.log('Generating thumbnail');

    // Placeholder: Extract first frame
    const thumbnailUrl = `s3://shorts/${shortId}/thumbnail.jpg`;
    return thumbnailUrl;
  }

  /**
   * Get video metadata
   */
  private async getVideoMetadata(videoUrl: string): Promise<any> {
    this.log('Getting video metadata');

    // Placeholder: Use FFprobe
    return {
      duration: 30,
      fileSize: 8000000, // 8MB
    };
  }

  /**
   * Render additional format variants
   */
  private async renderAdditionalFormats(
    input: ShortsRenderInput,
    baseConfig: any
  ): Promise<any[]> {
    // For now, just return the primary format
    // In production, might render all three formats
    return [];
  }
}
