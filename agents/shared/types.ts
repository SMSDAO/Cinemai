/**
 * Shared type definitions for AI agents
 */

export interface AgentInput {
  [key: string]: any;
}

export interface AgentOutput {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    processingTime?: number;
    modelUsed?: string;
    tokensUsed?: number;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SceneBreakdown {
  sceneNumber: number;
  description: string;
  characters: string[];
  duration: number;
  dialogue: string;
  actionNotes: string;
}

export interface ShotPlan {
  sceneNumber: number;
  shotNumber: number;
  type: 'wide' | 'medium' | 'closeup' | 'extreme-closeup' | 'over-shoulder' | 'pov';
  duration: number;
  description: string;
  cameraMovement: string;
  lighting: string;
}

export interface VideoAsset {
  url: string;
  duration: number;
  resolution: { width: number; height: number };
  format: string;
}

export interface AudioAsset {
  url: string;
  duration: number;
  type: 'voiceover' | 'music' | 'sfx';
}

export interface CaptionSegment {
  text: string;
  startTime: number;
  endTime: number;
  style: {
    fontSize: number;
    color: string;
    fontWeight: string;
    position: 'top' | 'center' | 'bottom';
  };
}

export interface HookVariant {
  id: string;
  text: string;
  style: string;
  confidence: number;
}

export interface AnalyticsInsight {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  recommendation: string;
}

export interface PublishingStrategy {
  platform: 'tiktok' | 'instagram' | 'youtube' | 'x';
  optimalTime: Date;
  hashtags: string[];
  caption: string;
  confidence: number;
}
