/**
 * Cinema Service
 * Handles production creation and management
 */

import api from './api';

export interface Production {
  id: string;
  user_id: string;
  title: string;
  script: string;
  photo_url: string;
  style?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  output_url?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductionData {
  title: string;
  script: string;
  photo_url: string;
  style?: string;
}

export const cinemaService = {
  /**
   * Create a new production
   */
  async createProduction(data: CreateProductionData): Promise<Production> {
    const response = await api.post<Production>('/productions', data);
    return response.data;
  },

  /**
   * Start processing a production
   */
  async runProduction(productionId: string): Promise<Production> {
    const response = await api.post<Production>(`/productions/${productionId}/run`);
    return response.data;
  },

  /**
   * Get all productions for the current user
   */
  async getProductions(): Promise<Production[]> {
    const response = await api.get<Production[]>('/productions');
    return response.data;
  },

  /**
   * Get a specific production by ID
   */
  async getProduction(productionId: string): Promise<Production> {
    const response = await api.get<Production>(`/productions/${productionId}`);
    return response.data;
  },

  /**
   * Delete a production
   */
  async deleteProduction(productionId: string): Promise<void> {
    await api.delete(`/productions/${productionId}`);
  },

  /**
   * Upload a photo for production
   */
  async uploadPhoto(file: FormData): Promise<{ url: string }> {
    const response = await api.post<{ url: string }>('/uploads/photo', file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
