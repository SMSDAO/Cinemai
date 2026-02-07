/**
 * Scene Planner Agent
 * Creates detailed shot plans with cinematography rules
 */

import { BaseAgent } from '../shared/base-agent';
import { AgentInput, AgentOutput, SceneBreakdown, ShotPlan } from '../shared/types';
import { Validator } from '../shared/validation';
import { PromptTemplates } from '../shared/prompt-templates';

interface ScenePlannerInput extends AgentInput {
  scenes: SceneBreakdown[];
  style: string;
  productionId: string;
}

interface ScenePlannerOutput {
  shotList: ShotPlan[];
  totalShots: number;
  totalDuration: number;
  pacingNotes: string;
  cinematographyStyle: string;
}

export class ScenePlannerAgent extends BaseAgent {
  constructor() {
    super(
      'ScenePlannerAgent',
      `You are a master cinematographer and director. You understand shot composition, camera movement, lighting, and pacing. Create detailed shot lists that tell compelling visual stories.`
    );
  }

  /**
   * Process scene planning
   */
  async process(input: AgentInput): Promise<AgentOutput> {
    try {
      this.validateInput(input);
      const plannerInput = input as ScenePlannerInput;

      this.log('Starting scene planning', {
        totalScenes: plannerInput.scenes.length,
        style: plannerInput.style,
      });

      const { result, duration } = await this.measureTime(async () => {
        // Create shot list
        const shotList = await this.createShotList(
          plannerInput.scenes,
          plannerInput.style
        );

        // Calculate pacing
        const pacingNotes = await this.calculatePacing(shotList);

        // Determine cinematography approach
        const cinematographyStyle = await this.determineCinematography(
          plannerInput.style
        );

        return {
          shotList,
          totalShots: shotList.length,
          totalDuration: shotList.reduce((sum, shot) => sum + shot.duration, 0),
          pacingNotes,
          cinematographyStyle,
        };
      });

      this.log('Scene planning completed', {
        totalShots: result.totalShots,
        duration,
      });

      return this.createSuccessResponse(result, {
        processingTime: duration,
        modelUsed: 'cinematography-model',
      });
    } catch (error) {
      return this.handleError(error as Error);
    }
  }

  protected validateInput(input: AgentInput): void {
    const required = ['scenes', 'style', 'productionId'];
    const validation = Validator.validateRequiredFields(input, required);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const plannerInput = input as ScenePlannerInput;
    if (!Array.isArray(plannerInput.scenes) || plannerInput.scenes.length === 0) {
      throw new Error('Scenes must be a non-empty array');
    }
  }

  /**
   * Create detailed shot list from scenes
   */
  private async createShotList(
    scenes: SceneBreakdown[],
    style: string
  ): Promise<ShotPlan[]> {
    this.log('Creating shot list', { style });

    const shotList: ShotPlan[] = [];

    for (const scene of scenes) {
      const prompt = PromptTemplates.scenePlanning({
        scene,
        style,
      });

      const response = await this.callAIModel(prompt, {
        model: 'gpt-4',
        maxTokens: 1500,
        temperature: 0.6,
      });

      // Mock shot plans for this scene
      const sceneShots: ShotPlan[] = [
        {
          sceneNumber: scene.sceneNumber,
          shotNumber: 1,
          type: 'wide',
          duration: 5,
          description: `Establishing shot for scene ${scene.sceneNumber}`,
          cameraMovement: 'Slow push-in',
          lighting: 'Natural, soft key light',
        },
        {
          sceneNumber: scene.sceneNumber,
          shotNumber: 2,
          type: 'medium',
          duration: scene.duration - 5,
          description: scene.description,
          cameraMovement: 'Steady, slight handheld feel',
          lighting: 'Dramatic side lighting',
        },
      ];

      shotList.push(...sceneShots);
    }

    return shotList;
  }

  /**
   * Calculate pacing and rhythm
   */
  private async calculatePacing(shotList: ShotPlan[]): Promise<string> {
    this.log('Calculating pacing');

    const avgShotDuration =
      shotList.reduce((sum, shot) => sum + shot.duration, 0) / shotList.length;

    if (avgShotDuration < 3) {
      return 'Fast-paced, dynamic editing';
    } else if (avgShotDuration < 7) {
      return 'Moderate pacing, balanced rhythm';
    } else {
      return 'Slow, contemplative pacing';
    }
  }

  /**
   * Determine cinematography style
   */
  private async determineCinematography(style: string): Promise<string> {
    this.log('Determining cinematography style', { style });

    const styleMap: { [key: string]: string } = {
      cinematic: 'Wide-angle, dramatic lighting, shallow depth of field',
      documentary: 'Natural lighting, handheld, realistic',
      commercial: 'Bright, polished, product-focused',
      artistic: 'Experimental angles, bold colors, creative composition',
    };

    return styleMap[style] || styleMap.cinematic;
  }
}
