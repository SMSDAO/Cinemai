/**
 * Production Model
 * Represents a cinema production
 */
export interface Production {
  id: string;
  userId: string;
  title: string;
  script: string;
  photoUrl: string;
  style: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  outputUrl?: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Production create input
 */
export interface CreateProductionInput {
  userId: string;
  title: string;
  script: string;
  photoUrl: string;
  style?: string;
}

/**
 * Production update input
 */
export interface UpdateProductionInput {
  title?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  outputUrl?: string;
  duration?: number;
}
