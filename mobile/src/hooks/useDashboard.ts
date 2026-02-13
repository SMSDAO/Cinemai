/**
 * useDashboard Hook
 * Unified hook for fetching dashboard data
 */

import { useState, useEffect } from 'react';
import { getDashboard, getUserStats, DashboardData, UserStats } from '../services/dashboard.service';
import { useAuth } from './useAuth';

interface UseDashboardReturn {
  user: DashboardData['user'] | null;
  stats: UserStats | null;
  recentProductions: DashboardData['recentProductions'];
  recentShorts: DashboardData['recentShorts'];
  timelinePreview: DashboardData['timelineEvents'];
  analytics: DashboardData['analytics'] | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const { user: authUser } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard data and stats in parallel
      const [dashboardData, statsData] = await Promise.all([
        getDashboard(),
        getUserStats(authUser.id),
      ]);

      setData(dashboardData);
      setStats(statsData);
    } catch (err: any) {
      console.error('useDashboard error:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authUser?.id]);

  return {
    user: data?.user || null,
    stats,
    recentProductions: data?.recentProductions || [],
    recentShorts: data?.recentShorts || [],
    timelinePreview: data?.timelineEvents || [],
    analytics: data?.analytics || null,
    loading,
    error,
    refresh: fetchData,
  };
};
