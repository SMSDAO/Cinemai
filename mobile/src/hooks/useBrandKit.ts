/**
 * useBrandKit Hook
 * Manages brand kits state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import { brandKitService, BrandKit, CreateBrandKitData } from '../services/brandkit.service';

export const useBrandKit = () => {
  const [brandKits, setBrandKits] = useState<BrandKit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBrandKits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await brandKitService.getBrandKits();
      setBrandKits(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBrandKit = useCallback(async (data: CreateBrandKitData) => {
    try {
      setLoading(true);
      setError(null);
      const brandKit = await brandKitService.createBrandKit(data);
      setBrandKits(prev => [brandKit, ...prev]);
      return brandKit;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBrandKit = useCallback(async (id: string, data: Partial<CreateBrandKitData>) => {
    try {
      setLoading(true);
      setError(null);
      const brandKit = await brandKitService.updateBrandKit(id, data);
      setBrandKits(prev => prev.map(bk => (bk.id === id ? brandKit : bk)));
      return brandKit;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBrandKit = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await brandKitService.deleteBrandKit(id);
      setBrandKits(prev => prev.filter(bk => bk.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrandKits();
  }, [fetchBrandKits]);

  return {
    brandKits,
    loading,
    error,
    fetchBrandKits,
    createBrandKit,
    updateBrandKit,
    deleteBrandKit,
  };
};
