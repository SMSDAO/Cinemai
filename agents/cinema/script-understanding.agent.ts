/**
 * Script Understanding Agent
 * Performs NLP analysis, scene detection, and character identification
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput, SceneBreakdown } from '../shared/types';
import { Validator } from '../shared/validation';
import { PromptTemplates } from '../shared/prompt-templates';

interface ScriptUnderstandingInput extends AgentInput {
  script: string;
  productionId: string;
}

interface ScriptUnderstandingOutput {
  scenes: SceneBreakdown[];
  totalScenes: number;
  totalDuration: number;
  characters: string[];
  themes: string[];
  mood: string;
}

export class ScriptUnderstandingAgent extends BaseAgent {
  constructor() {
    super(
      'ScriptUnderstandingAgent',
      `You are an expert screenplay analyst with deep knowledge of story structure, character development, and scene construction. Analyze scripts to identify scenes, characters, themes, and dramatic beats.`
    );
  }

  /**
   * Process script understanding
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const scriptInput = input as ScriptUnderstandingInput;

      this.log('Starting script analysis', {
        productionId: scriptInput.productionId,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Perform NLP analysis
        const nlpAnalysis = await this.performNLPAnalysis(scriptInput.script);

        // Detect scenes
        const scenes = await this.detectScenes(scriptInput.script);

        // Identify characters
        const characters = await this.identifyCharacters(scriptInput.script, scenes);

        // Extract themes and mood
        const thematic = await this.extractThemes(scriptInput.script);

        return {
          scenes,
          totalScenes: scenes.length,
          totalDuration: scenes.reduce((sum, scene) => sum + scene.duration, 0),
          characters,
          themes: thematic.themes,
          mood: thematic.mood,
        };
      });

      this.log('Script understanding completed', {
        totalScenes: result.totalScenes,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'nlp-model',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['script', 'productionId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const scriptInput = input as ScriptUnderstandingInput;
    const scriptValidation = Validator.validateScript(scriptInput.script);
    if (!scriptValidation.isValid) {
      throw new Error(`Script validation failed: ${scriptValidation.errors.join(', ')}`);
    }
  }

  /**
   * Perform NLP analysis on script
   */
  private async performNLPAnalysis(script: string): Promise<any> {
    this.log('Performing NLP analysis');

    // Placeholder: Use NLP models for sentiment, entities, etc.
    const response = await this.callAIModel(
      `Perform NLP analysis on this script: ${script.substring(0, 500)}...`,
      { model: 'nlp-model' }
    );

    return response;
  }

  /**
   * Detect and break down scenes
   */
  private async detectScenes(script: string): Promise<SceneBreakdown[]> {
    this.log('Detecting scenes');

    const prompt = `Analyze this script and break it down into distinct scenes. For each scene provide:
- Scene number
- Description (2-3 sentences)
- Characters involved
- Estimated duration in seconds
- Key dialogue
- Action notes

Script:
${script}

Provide response as JSON array of scenes with structure:
{
  "scenes": [
    {
      "sceneNumber": 1,
      "description": "...",
      "characters": ["..."],
      "duration": 15,
      "dialogue": "...",
      "actionNotes": "..."
    }
  ]
}`;

    const response = await this.callAIModel(prompt, {
      model: 'gpt-4-turbo-preview',
      maxTokens: 2000,
      temperature: 0.3,
      responseFormat: 'json',
    });

    try {
      // Parse AI response
      const parsed = JSON.parse(response.content);
      if (parsed.scenes && Array.isArray(parsed.scenes)) {
        return parsed.scenes;
      }
    } catch (error) {
      this.log('Failed to parse AI response, using fallback', error);
    }

    // Fallback: Create simple single scene
    return [{
      sceneNumber: 1,
      description: 'Single scene production',
      characters: ['Main'],
      duration: 30,
      dialogue: script.substring(0, 200),
      actionNotes: 'Production based on provided script',
    }];
  }

  /**
   * Identify characters in script
   */
  private async identifyCharacters(
    script: string,
    scenes: SceneBreakdown[]
  ): Promise<string[]> {
    this.log('Identifying characters');

    // Extract unique characters from scenes
    const characters = new Set<string>();
    scenes.forEach((scene) => {
      scene.characters.forEach((char) => characters.add(char));
    });

    return Array.from(characters);
  }

  /**
   * Extract themes and mood
   */
  private async extractThemes(script: string): Promise<{
    themes: string[];
    mood: string;
  }> {
    this.log('Extracting themes and mood');

    const prompt = `Analyze this script and identify:
1. Main themes (3-5 themes)
2. Overall mood/tone

Script: ${script}

Respond in JSON format:
{
  "themes": ["theme1", "theme2", "theme3"],
  "mood": "overall mood description"
}`;

    const response = await this.callAIModel(prompt, {
      model: 'gpt-4-turbo-preview',
      temperature: 0.5,
      responseFormat: 'json',
    });

    try {
      const parsed = JSON.parse(response.content);
      if (parsed.themes && parsed.mood) {
        return parsed;
      }
    } catch (error) {
      this.log('Failed to parse themes, using defaults', error);
    }

    // Fallback
    return {
      themes: ['cinematic', 'storytelling', 'creative'],
      mood: 'engaging and visual',
    };
  }
}
