/**
 * Asset Model
 * Represents a production asset (image, video, audio)
 */
export interface Asset {
  id: string;
  productionId: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

/**
 * Asset create input
 */
export interface CreateAssetInput {
  productionId: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  metadata?: Record<string, any>;
}
