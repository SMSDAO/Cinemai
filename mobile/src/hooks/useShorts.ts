/**
 * useShorts Hook
 * Manages shorts state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import { shortsService, Short, CreateShortData } from '../services/shorts.service';

export const useShorts = () => {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchShorts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shortsService.getShorts();
      setShorts(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createShort = useCallback(async (data: CreateShortData) => {
    try {
      setLoading(true);
      setError(null);
      const short = await shortsService.createShort(data);
      setShorts(prev => [short, ...prev]);
      return short;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateHooks = useCallback(async (shortId: string, idea: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await shortsService.generateHooks(shortId, { idea });
      return response.hooks;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateVariants = useCallback(async (shortId: string, hookIndex: number) => {
    try {
      setLoading(true);
      setError(null);
      const variants = await shortsService.generateVariants(shortId, hookIndex);
      return variants;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteShort = useCallback(async (shortId: string) => {
    try {
      setLoading(true);
      setError(null);
      await shortsService.deleteShort(shortId);
      setShorts(prev => prev.filter(s => s.id !== shortId));
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShorts();
  }, [fetchShorts]);

  return {
    shorts,
    loading,
    error,
    fetchShorts,
    createShort,
    generateHooks,
    generateVariants,
    deleteShort,
  };
};
