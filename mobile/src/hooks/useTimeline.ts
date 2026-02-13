/**
 * useTimeline Hook
 * Hook for fetching timeline events with infinite scroll
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getUserTimeline,
  getFollowingTimeline,
  getGlobalTimeline,
  TimelineEvent,
} from '../services/timeline.service';

type TimelineType = 'user' | 'following' | 'global';

const PAGE_SIZE = 20;

interface UseTimelineReturn {
  events: TimelineEvent[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useTimeline = (type: TimelineType): UseTimelineReturn => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimeline = useCallback(
    async (type: TimelineType, offset: number): Promise<TimelineEvent[]> => {
      switch (type) {
        case 'user':
          return getUserTimeline(PAGE_SIZE, offset);
        case 'following':
          return getFollowingTimeline(PAGE_SIZE, offset);
        case 'global':
          return getGlobalTimeline(PAGE_SIZE, offset);
        default:
          return [];
      }
    },
    [],
  );

  const loadInitial = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const newEvents = await fetchTimeline(type, 0);
      setEvents(newEvents);
      setHasMore(newEvents.length === PAGE_SIZE);
    } catch (err: any) {
      console.error('loadInitial error:', err);
      setError(err.message || 'Failed to load timeline');
    } finally {
      setLoading(false);
    }
  }, [type, fetchTimeline]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const newEvents = await fetchTimeline(type, events.length);
      setEvents(prev => [...prev, ...newEvents]);
      setHasMore(newEvents.length === PAGE_SIZE);
    } catch (err: any) {
      console.error('loadMore error:', err);
      setError(err.message || 'Failed to load more events');
    } finally {
      setLoading(false);
    }
  }, [type, events.length, loading, hasMore, fetchTimeline]);

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const newEvents = await fetchTimeline(type, 0);
      setEvents(newEvents);
      setHasMore(newEvents.length === PAGE_SIZE);
    } catch (err: any) {
      console.error('refresh error:', err);
      setError(err.message || 'Failed to refresh timeline');
    } finally {
      setRefreshing(false);
    }
  }, [type, fetchTimeline]);

  useEffect(() => {
    loadInitial();
  }, [type]);

  return {
    events,
    loading,
    refreshing,
    hasMore,
    error,
    loadMore,
    refresh,
  };
};
