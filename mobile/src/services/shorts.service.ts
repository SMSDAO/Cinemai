/**
 * Shorts Service
 * Handles short-form content creation and variants
 */

import api from './api';

export interface Short {
  id: string;
  user_id: string;
  title: string;
  idea: string;
  selected_hook?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  output_url?: string;
  format: '9:16' | '1:1' | '16:9';
  created_at: string;
  updated_at: string;
}

export interface ShortVariant {
  id: string;
  short_id: string;
  variant_number: number;
  caption_style: string;
  output_url?: string;
  created_at: string;
}

export interface CreateShortData {
  title: string;
  idea: string;
  format: '9:16' | '1:1' | '16:9';
}

export interface GenerateHooksData {
  idea: string;
}

export const shortsService = {
  /**
   * Create a new short
   */
  async createShort(data: CreateShortData): Promise<Short> {
    const response = await api.post<Short>('/shorts', data);
    return response.data;
  },

  /**
   * Generate hook variants for a short
   */
  async generateHooks(shortId: string, data: GenerateHooksData): Promise<{ hooks: string[] }> {
    const response = await api.post<{ hooks: string[] }>(`/shorts/${shortId}/hooks`, data);
    return response.data;
  },

  /**
   * Generate variants for a short
   */
  async generateVariants(shortId: string, hookIndex: number): Promise<ShortVariant[]> {
    const response = await api.post<ShortVariant[]>(`/shorts/${shortId}/variants`, {
      selected_hook_index: hookIndex,
    });
    return response.data;
  },

  /**
   * Get all shorts for the current user
   */
  async getShorts(): Promise<Short[]> {
    const response = await api.get<Short[]>('/shorts');
    return response.data;
  },

  /**
   * Get a specific short by ID
   */
  async getShort(shortId: string): Promise<Short> {
    const response = await api.get<Short>(`/shorts/${shortId}`);
    return response.data;
  },

  /**
   * Get variants for a short
   */
  async getVariants(shortId: string): Promise<ShortVariant[]> {
    const response = await api.get<ShortVariant[]>(`/shorts/${shortId}/variants`);
    return response.data;
  },

  /**
   * Delete a short
   */
  async deleteShort(shortId: string): Promise<void> {
    await api.delete(`/shorts/${shortId}`);
  },
};
