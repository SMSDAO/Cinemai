/**
 * useProductions Hook
 * Manages cinema productions state and operations
 */

import { useState, useEffect, useCallback } from 'react';
import { cinemaService, Production, CreateProductionData } from '../services/cinema.service';

export const useProductions = () => {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProductions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cinemaService.getProductions();
      setProductions(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduction = useCallback(async (data: CreateProductionData) => {
    try {
      setLoading(true);
      setError(null);
      const production = await cinemaService.createProduction(data);
      setProductions((prev) => [production, ...prev]);
      return production;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const runProduction = useCallback(async (productionId: string) => {
    try {
      setLoading(true);
      setError(null);
      const production = await cinemaService.runProduction(productionId);
      setProductions((prev) => prev.map((p) => (p.id === productionId ? production : p)));
      return production;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduction = useCallback(async (productionId: string) => {
    try {
      setLoading(true);
      setError(null);
      await cinemaService.deleteProduction(productionId);
      setProductions((prev) => prev.filter((p) => p.id !== productionId));
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductions();
  }, [fetchProductions]);

  return {
    productions,
    loading,
    error,
    fetchProductions,
    createProduction,
    runProduction,
    deleteProduction,
  };
};
