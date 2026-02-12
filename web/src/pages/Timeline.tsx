import React, { useState, useEffect } from 'react';
import { getUserTimeline, getFollowingTimeline, getGlobalTimeline } from '../services/api';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import type { TimelineEvent } from '../types';

type TabType = 'user' | 'following' | 'global';

const EVENT_ICONS: Record<string, string> = {
  PRODUCTION_CREATED: '🎬',
  PRODUCTION_COMPLETED: '✅',
  SHORT_CREATED: '🎞',
  SHORT_COMPLETED: '✅',
  POST_PUBLISHED: '📱',
  USER_FOLLOWED: '👤',
  CONTENT_LIKED: '❤️',
};

export const Timeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('user');
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchTimeline = async (tab: TabType, currentOffset: number = 0) => {
    setLoading(true);
    try {
      let data: TimelineEvent[];
      const params = { limit: 20, offset: currentOffset };
      
      switch (tab) {
        case 'user':
          data = await getUserTimeline(params);
          break;
        case 'following':
          data = await getFollowingTimeline(params);
          break;
        case 'global':
          data = await getGlobalTimeline(params);
          break;
      }

      if (currentOffset === 0) {
        setEvents(data);
      } else {
        setEvents((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === 20);
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchTimeline(activeTab, 0);
  }, [activeTab]);

  const handleLoadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    fetchTimeline(activeTab, newOffset);
  };

  const formatEventDescription = (event: TimelineEvent): string => {
    const type = event.eventType.replace(/_/g, ' ').toLowerCase();
    return type;
  };

  return (
    <div className="page">
      <h1 className="page-title">Timeline</h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          You
        </button>
        <button
          className={`tab ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
        <button
          className={`tab ${activeTab === 'global' ? 'active' : ''}`}
          onClick={() => setActiveTab('global')}
        >
          Global
        </button>
      </div>

      <div className="list">
        {events.length > 0 ? (
          events.map((event) => (
            <Card key={event.id}>
              <div className="timeline-event">
                <div className="event-icon">
                  {EVENT_ICONS[event.eventType] || '📝'}
                </div>
                <div className="event-content">
                  <div>
                    <span className="event-handle">
                      @{event.user?.handle || event.user?.name || 'user'}
                    </span>
                  </div>
                  <div className="event-description">
                    {formatEventDescription(event)}
                  </div>
                  <div className="event-time">
                    {new Date(event.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>
              {loading ? 'Loading...' : 'No events yet'}
            </p>
          </Card>
        )}
      </div>

      {hasMore && events.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Button variant="secondary" onClick={handleLoadMore} loading={loading}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
