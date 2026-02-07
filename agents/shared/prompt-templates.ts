/**
 * Reusable prompt templates for AI agents
 */

export class PromptTemplates {
  /**
   * Cinema: Script Understanding
   */
  static scriptUnderstanding(script: string): string {
    return `You are a professional screenplay analyst. Analyze the following script and break it down into scenes.

For each scene, identify:
- Scene number
- Scene description
- Characters involved
- Estimated duration (in seconds)
- Dialogue
- Action notes

Script:
${script}

Provide a detailed breakdown in JSON format.`;
  }

  /**
   * Cinema: Scene Planning
   */
  static scenePlanning(sceneBreakdown: any): string {
    return `You are a cinematographer and shot planner. Given the scene breakdown below, create a detailed shot list.

For each shot, specify:
- Scene number
- Shot number
- Shot type (wide, medium, closeup, etc.)
- Duration (in seconds)
- Description
- Camera movement
- Lighting setup

Scene Breakdown:
${JSON.stringify(sceneBreakdown, null, 2)}

Provide a detailed shot list in JSON format.`;
  }

  /**
   * Cinema: Visual Generation Prompt
   */
  static visualGeneration(shotDescription: string, style: string): string {
    return `Create a cinematic video shot with the following specifications:

Description: ${shotDescription}
Style: ${style}
Quality: Cinematic, professional-grade
Lighting: Dramatic and appropriate for the scene
Camera Work: Smooth and intentional

Generate a video that captures this vision with high production value.`;
  }

  /**
   * Shorts: Hook Generation
   */
  static hookGeneration(topic: string, count: number = 5): string {
    return `You are a viral content expert specializing in short-form video hooks.

Generate ${count} different attention-grabbing hooks for the following topic:
${topic}

Each hook should:
- Be 5-10 words maximum
- Create curiosity or urgency
- Be scroll-stopping
- Have viral potential
- Be unique and creative

Provide the hooks in JSON format with confidence scores (0-1).`;
  }

  /**
   * Shorts: Caption Styling
   */
  static captionStyling(transcript: string): string {
    return `You are a caption timing expert. Given the audio transcript below, create word-level captions with precise timing.

Transcript:
${transcript}

For each word, provide:
- Text
- Start time (seconds)
- End time (seconds)
- Styling (fontSize, color, fontWeight, position)

Make the captions engaging and synchronized with natural speech rhythm.
Output in JSON format.`;
  }

  /**
   * Growth: Publishing Strategy
   */
  static publishingStrategy(
    contentType: string,
    platform: string,
    targetAudience: string
  ): string {
    return `You are a social media optimization expert.

Analyze the following content and create an optimal publishing strategy for ${platform}:

Content Type: ${contentType}
Target Audience: ${targetAudience}

Provide:
- Best time to post (with timezone)
- Recommended hashtags (10-15)
- Caption text
- Expected engagement level

Output in JSON format.`;
  }

  /**
   * Growth: Analytics Insights
   */
  static analyticsInsights(metrics: any): string {
    return `You are a data analyst specializing in social media performance.

Analyze the following performance metrics and provide actionable insights:

Metrics:
${JSON.stringify(metrics, null, 2)}

For each key metric, provide:
- Current value
- Trend (up, down, stable)
- Detailed recommendation for improvement

Focus on:
- Engagement rate optimization
- Best posting times
- Content type performance
- Audience growth strategies

Output in JSON format.`;
  }

  /**
   * Cinema: Audio Generation
   */
  static audioGeneration(script: string, tone: string): string {
    return `Generate professional voiceover audio for the following script.

Script:
${script}

Tone: ${tone}
Voice: Clear, professional, appropriate emotion
Pacing: Natural speech rhythm
Quality: Studio-grade

Generate high-quality voiceover audio that brings this script to life.`;
  }

  /**
   * Music Selection
   */
  static musicSelection(mood: string, duration: number): string {
    return `Select background music that fits the following criteria:

Mood: ${mood}
Duration: ${duration} seconds
Style: Cinematic and professional
Energy: Appropriate for the mood
Licensing: Royalty-free

Recommend a music track that enhances the production without overwhelming the voiceover.`;
  }
}
