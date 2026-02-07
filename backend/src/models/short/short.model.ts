/**
 * Short Model
 * Represents a short-form video
 */
export interface Short {
  id: string;
  userId: string;
  title: string;
  idea: string;
  selectedHook?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  outputUrl?: string;
  format: '9:16' | '1:1' | '16:9';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Short create input
 */
export interface CreateShortInput {
  userId: string;
  title: string;
  idea: string;
  format?: '9:16' | '1:1' | '16:9';
}

/**
 * Short update input
 */
export interface UpdateShortInput {
  title?: string;
  selectedHook?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  outputUrl?: string;
}
