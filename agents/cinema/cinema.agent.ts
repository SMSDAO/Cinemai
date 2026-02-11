/**
 * Cinema Agent - Main orchestrator
 * Coordinates the cinema production pipeline
 */

import { IngestAgent } from './ingest.agent';
import { ScriptUnderstandingAgent } from './script-understanding.agent';
import { ScenePlannerAgent } from './scene-planner.agent';
import { VisualGeneratorAgent } from './visual-generator.agent';
import { AudioAgent } from './audio.agent';
import { AssemblyAgent } from './assembly.agent';
import { RenderAgent } from './render.agent';

export class CinemaAgent {
  private ingestAgent: IngestAgent;
  private scriptUnderstandingAgent: ScriptUnderstandingAgent;
  private scenePlannerAgent: ScenePlannerAgent;
  private visualGeneratorAgent: VisualGeneratorAgent;
  private audioAgent: AudioAgent;
  private assemblyAgent: AssemblyAgent;
  private renderAgent: RenderAgent;

  constructor() {
    this.ingestAgent = new IngestAgent();
    this.scriptUnderstandingAgent = new ScriptUnderstandingAgent();
    this.scenePlannerAgent = new ScenePlannerAgent();
    this.visualGeneratorAgent = new VisualGeneratorAgent();
    this.audioAgent = new AudioAgent();
    this.assemblyAgent = new AssemblyAgent();
    this.renderAgent = new RenderAgent();
  }

  /**
   * Execute the full cinema production pipeline
   */
  async executeFullPipeline(input: {
    photoUrl: string;
    script: string;
    style: string;
    productionId: string;
  }) {
    console.log('[CinemaAgent] Starting full pipeline execution');

    // 1. Ingest
    const ingestResult = await this.ingestAgent.process({
      photoUrl: input.photoUrl,
      script: input.script,
      productionId: input.productionId,
    });

    if (!ingestResult.success) {
      throw new Error(`Ingest failed: ${ingestResult.error}`);
    }

    // 2. Script Understanding
    const scriptResult = await this.scriptUnderstandingAgent.process({
      script: input.script,
      productionId: input.productionId,
    });

    if (!scriptResult.success) {
      throw new Error(`Script understanding failed: ${scriptResult.error}`);
    }

    // 3. Scene Planning
    const planningResult = await this.scenePlannerAgent.process({
      scenes: scriptResult.data.scenes,
      style: input.style,
      productionId: input.productionId,
    });

    if (!planningResult.success) {
      throw new Error(`Scene planning failed: ${planningResult.error}`);
    }

    // 4. Visual Generation
    const visualResult = await this.visualGeneratorAgent.process({
      shotList: planningResult.data.shotList,
      photoUrl: input.photoUrl,
      style: input.style,
      productionId: input.productionId,
    });

    if (!visualResult.success) {
      throw new Error(`Visual generation failed: ${visualResult.error}`);
    }

    // 5. Audio Generation
    const audioResult = await this.audioAgent.process({
      script: input.script,
      scenes: scriptResult.data.scenes,
      mood: scriptResult.data.mood,
      productionId: input.productionId,
    });

    if (!audioResult.success) {
      throw new Error(`Audio generation failed: ${audioResult.error}`);
    }

    // 6. Assembly
    const assemblyResult = await this.assemblyAgent.process({
      videoClips: visualResult.data.videoClips,
      voiceover: audioResult.data.voiceover,
      backgroundMusic: audioResult.data.backgroundMusic,
      productionId: input.productionId,
    });

    if (!assemblyResult.success) {
      throw new Error(`Assembly failed: ${assemblyResult.error}`);
    }

    // 7. Render
    const renderResult = await this.renderAgent.process({
      timelineUrl: assemblyResult.data.timelineUrl,
      productionId: input.productionId,
    });

    if (!renderResult.success) {
      throw new Error(`Render failed: ${renderResult.error}`);
    }

    console.log('[CinemaAgent] Pipeline execution completed');

    return {
      success: true,
      videoUrl: renderResult.data.videoUrl,
      duration: renderResult.data.duration,
      thumbnailUrl: renderResult.data.thumbnailUrl,
    };
  }
}
