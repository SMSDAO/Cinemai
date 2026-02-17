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
   * Call AI model with OpenAI API
   */
  protected async callAIModel(
    prompt: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
      responseFormat?: 'text' | 'json';
    }
  ): Promise<any> {
    const model = options?.model || process.env.DEFAULT_AI_MODEL || 'gpt-4-turbo-preview';
    const maxTokens = options?.maxTokens || 2000;
    const temperature = options?.temperature || 0.7;

    this.log('AI Model Call', {
      model,
      promptLength: prompt.length,
      maxTokens,
      temperature,
    });

    try {
      // Check if OpenAI API key is configured
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        this.log('Warning: OPENAI_API_KEY not configured, using mock response');
        return this.getMockAIResponse(prompt, options);
      }

      // Make real API call to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: this.systemPrompt },
            { role: 'user', content: prompt },
          ],
          max_tokens: maxTokens,
          temperature,
          response_format: options?.responseFormat === 'json' 
            ? { type: 'json_object' } 
            : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';

      return {
        content,
        usage: {
          promptTokens: data.usage?.prompt_tokens || 0,
          completionTokens: data.usage?.completion_tokens || 0,
          totalTokens: data.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      this.log('AI model call failed, falling back to mock', error);
      return this.getMockAIResponse(prompt, options);
    }
  }

  /**
   * Get mock AI response for development/fallback
   */
  private getMockAIResponse(prompt: string, options?: any): any {
    this.log('Using mock AI response');
    return {
      content: 'Mock AI response - Please configure OPENAI_API_KEY for production use',
      usage: {
        promptTokens: 100,
        completionTokens: 50,
        totalTokens: 150,
      },
      isMock: true,
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
