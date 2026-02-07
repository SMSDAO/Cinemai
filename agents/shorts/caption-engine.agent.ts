/**
 * Caption Engine Agent
 * Generates word-level timed captions with styling
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput, CaptionSegment } from '../shared/types';
import { Validator } from '../shared/validation';
import { PromptTemplates } from '../shared/prompt-templates';

interface CaptionEngineInput extends AgentInput {
  audioUrl: string;
  transcript?: string;
  style?: {
    font?: string;
    color?: string;
    position?: 'top' | 'center' | 'bottom';
    animation?: string;
  };
  shortId: string;
}

interface CaptionEngineOutput {
  captions: CaptionSegment[];
  totalWords: number;
  duration: number;
  captionFileUrl: string;
  previewUrl?: string;
}

export class CaptionEngineAgent extends BaseAgent {
  constructor() {
    super(
      'CaptionEngineAgent',
      `You are a caption timing specialist. You understand speech rhythm, word emphasis, and how to create engaging captions that sync perfectly with audio and enhance viewer retention.`
    );
  }

  /**
   * Process caption generation
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const captionInput = input as CaptionEngineInput;

      this.log('Starting caption generation', {
        hasTranscript: !!captionInput.transcript,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Get or generate transcript
        const transcript = captionInput.transcript || 
          await this.transcribeAudio(captionInput.audioUrl);

        // Generate word-level timing
        const captions = await this.generateWordLevelCaptions(
          captionInput.audioUrl,
          transcript,
          captionInput.style || {}
        );

        // Calculate metrics
        const totalWords = captions.length;
        const captionDuration = captions.length > 0 
          ? captions[captions.length - 1].endTime 
          : 0;

        // Save caption file
        const captionFileUrl = await this.saveCaptionFile(
          captions,
          captionInput.shortId
        );

        return {
          captions,
          totalWords,
          duration: captionDuration,
          captionFileUrl,
        };
      });

      this.log('Caption generation completed', {
        totalWords: result.totalWords,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'whisper + caption-engine',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['audioUrl', 'shortId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const captionInput = input as CaptionEngineInput;
    if (!Validator.validateUrl(captionInput.audioUrl)) {
      throw new Error('Invalid audio URL');
    }
  }

  /**
   * Transcribe audio to text
   */
  private async transcribeAudio(audioUrl: string): Promise<string> {
    this.log('Transcribing audio', { audioUrl });

    // Placeholder: Use Whisper API or similar
    const response = await this.callAIModel(
      'Transcribe this audio file',
      { model: 'whisper-large-v3' }
    );

    // Mock transcript
    return 'This is a sample transcript of the audio content';
  }

  /**
   * Generate word-level captions with timing
   */
  private async generateWordLevelCaptions(
    audioUrl: string,
    transcript: string,
    style: any
  ): Promise<CaptionSegment[]> {
    this.log('Generating word-level captions');

    const prompt = PromptTemplates.captionStyling(transcript);

    const response = await this.callAIModel(prompt, {
      model: 'whisper-align',
      maxTokens: 2000,
    });

    // Mock word-level captions
    const words = transcript.split(' ');
    const captions: CaptionSegment[] = [];
    
    const avgWordDuration = 0.4; // 400ms per word average
    let currentTime = 0;

    words.forEach((word, index) => {
      const startTime = currentTime;
      const endTime = currentTime + avgWordDuration;
      
      captions.push({
        text: word,
        startTime,
        endTime,
        style: {
          fontSize: style.fontSize || 48,
          color: style.color || '#FFFFFF',
          fontWeight: style.fontWeight || 'bold',
          position: style.position || 'bottom',
        },
      });

      currentTime = endTime;
    });

    return captions;
  }

  /**
   * Save caption file (SRT, VTT, or custom format)
   */
  private async saveCaptionFile(
    captions: CaptionSegment[],
    shortId: string
  ): Promise<string> {
    this.log('Saving caption file', { captionCount: captions.length });

    // Generate SRT format
    const srtContent = this.generateSRT(captions);

    // Placeholder: Save to storage
    const captionFileUrl = `s3://shorts/${shortId}/captions.srt`;

    return captionFileUrl;
  }

  /**
   * Generate SRT format captions
   */
  private generateSRT(captions: CaptionSegment[]): string {
    let srt = '';

    captions.forEach((caption, index) => {
      const startTime = this.formatSRTTime(caption.startTime);
      const endTime = this.formatSRTTime(caption.endTime);

      srt += `${index + 1}\n`;
      srt += `${startTime} --> ${endTime}\n`;
      srt += `${caption.text}\n\n`;
    });

    return srt;
  }

  /**
   * Format time for SRT (HH:MM:SS,mmm)
   */
  private formatSRTTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  }
}
