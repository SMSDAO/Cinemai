/**
 * Brand Kit Service
 * Handles brand kit management
 */

import api from './api';

export interface BrandKit {
  id: string;
  user_id: string;
  name: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  created_at: string;
}

export interface CreateBrandKitData {
  name: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
}

export const brandKitService = {
  /**
   * Create a new brand kit
   */
  async createBrandKit(data: CreateBrandKitData): Promise<BrandKit> {
    const response = await api.post<BrandKit>('/brandkit', data);
    return response.data;
  },

  /**
   * Get all brand kits
   */
  async getBrandKits(): Promise<BrandKit[]> {
    const response = await api.get<BrandKit[]>('/brandkit');
    return response.data;
  },

  /**
   * Get a specific brand kit by ID
   */
  async getBrandKit(id: string): Promise<BrandKit> {
    const response = await api.get<BrandKit>(`/brandkit/${id}`);
    return response.data;
  },

  /**
   * Update a brand kit
   */
  async updateBrandKit(id: string, data: Partial<CreateBrandKitData>): Promise<BrandKit> {
    const response = await api.put<BrandKit>(`/brandkit/${id}`, data);
    return response.data;
  },

  /**
   * Delete a brand kit
   */
  async deleteBrandKit(id: string): Promise<void> {
    await api.delete(`/brandkit/${id}`);
  },
};
