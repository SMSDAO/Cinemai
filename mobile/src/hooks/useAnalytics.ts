/**
 * useAnalytics Hook
 * Manages analytics and metrics
 */

import { useState, useEffect, useCallback } from 'react';
import { growthService } from '../services/growth.service';

interface AnalyticsData {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  avgEngagementRate: number;
  topPerformingContent: any[];
}

export const useAnalytics = () => {
  const [shortsAnalytics, setShortsAnalytics] = useState<AnalyticsData | null>(null);
  const [productionsAnalytics, setProductionsAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchShortsAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await growthService.getShortsAnalytics();
      setShortsAnalytics(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductionsAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await growthService.getProductionsAnalytics();
      setProductionsAnalytics(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllAnalytics = useCallback(async () => {
    await Promise.all([fetchShortsAnalytics(), fetchProductionsAnalytics()]);
  }, [fetchShortsAnalytics, fetchProductionsAnalytics]);

  useEffect(() => {
    fetchAllAnalytics();
  }, [fetchAllAnalytics]);

  return {
    shortsAnalytics,
    productionsAnalytics,
    loading,
    error,
    fetchShortsAnalytics,
    fetchProductionsAnalytics,
    fetchAllAnalytics,
  };
};
