/**
 * Base agent class with common functionality
 */

import { AgentInput, AgentOutput } from './types';
import { Validator } from './validation';

export abstract class BaseAgent {
  protected agentName: string;
  protected systemPrompt: string;

  constructor(agentName: string, systemPrompt: string) {
    this.agentName = agentName;
    this.systemPrompt = systemPrompt;
  }

  /**
   * Main processing method - must be implemented by subclasses
   */
  abstract process(input: AgentInput): Promise<AgentOutput>;

  /**
   * Validate agent input
   */
  protected abstract validateInput(input: AgentInput): void;

  /**
   * Call AI model (placeholder for actual implementation)
   */
  protected async callAIModel(
    prompt: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<any> {
    // Placeholder for actual AI model integration
    // This would call OpenAI, Anthropic, or other AI services
    console.log(`[${this.agentName}] AI Model Call:`, {
      prompt: prompt.substring(0, 100) + '...',
      model: options?.model || 'default',
      maxTokens: options?.maxTokens || 2000,
      temperature: options?.temperature || 0.7,
    });

    // Return mock response for now
    return {
      content: 'AI response placeholder',
      usage: {
        promptTokens: 100,
        completionTokens: 50,
        totalTokens: 150,
      },
    };
  }

  /**
   * Log agent activity
   */
  protected log(message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${this.agentName}] ${message}`, data || '');
  }

  /**
   * Handle agent errors
   */
  protected handleError(error: Error): AgentOutput {
    this.log('Error occurred', error.message);
    return {
      success: false,
      error: error.message,
    };
  }

  /**
   * Create success response
   */
  protected createSuccessResponse(
    data: any,
    metadata?: any
  ): AgentOutput {
    return {
      success: true,
      data,
      metadata,
    };
  }

  /**
   * Create error response
   */
  protected createErrorResponse(error: string): AgentOutput {
    return {
      success: false,
      error,
    };
  }

  /**
   * Measure execution time
   */
  protected async measureTime<T>(
    operation: () => Promise<T>
  ): Promise<{ result: T; duration: number }> {
    const startTime = Date.now();
    const result = await operation();
    const duration = Date.now() - startTime;
    return { result, duration };
  }
}
