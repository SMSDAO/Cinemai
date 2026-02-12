import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { getMyStats, getRecentProductions, getRecentShorts, getUserTimeline } from '../services/api';
import { Card } from '../components/Card';
import type { Stats, Production, Short, TimelineEvent } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [productions, setProductions] = useState<Production[]>([]);
  const [shorts, setShorts] = useState<Short[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, productionsData, shortsData, timelineData] = await Promise.all([
          getMyStats(),
          getRecentProductions(),
          getRecentShorts(),
          getUserTimeline({ limit: 5 }),
        ]);
        setStats(statsData);
        setProductions(productionsData);
        setShorts(shortsData);
        setTimeline(timelineData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Welcome back, {user?.name || 'Creator'}!
        </h2>
        {user?.handle && (
          <p style={{ color: '#00F0FF' }}>@{user.handle}</p>
        )}
      </div>

      {stats && (
        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-value">{stats.productions}</div>
            <div className="stat-label">Productions</div>
          </Card>
          <Card className="stat-card">
            <div className="stat-value">{stats.shorts}</div>
            <div className="stat-label">Shorts</div>
          </Card>
          <Card className="stat-card">
            <div className="stat-value">{stats.followers}</div>
            <div className="stat-label">Followers</div>
          </Card>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">Recent Productions</h2>
        <div className="list">
          {productions.length > 0 ? (
            productions.map((prod) => (
              <Card key={prod.id} className="list-item">
                <div>
                  <div className="list-item-title">{prod.title}</div>
                  <div className="list-item-meta">Status: {prod.status}</div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p style={{ color: '#999', textAlign: 'center' }}>No productions yet</p>
            </Card>
          )}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Recent Shorts</h2>
        <div className="list">
          {shorts.length > 0 ? (
            shorts.map((short) => (
              <Card key={short.id} className="list-item">
                <div>
                  <div className="list-item-title">{short.title}</div>
                  <div className="list-item-meta">Status: {short.status}</div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p style={{ color: '#999', textAlign: 'center' }}>No shorts yet</p>
            </Card>
          )}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="list">
          {timeline.length > 0 ? (
            timeline.map((event) => (
              <Card key={event.id}>
                <div className="timeline-event">
                  <div className="event-icon">🎬</div>
                  <div className="event-content">
                    <div>
                      <span className="event-handle">@{event.user?.handle || 'user'}</span>
                      <span> {event.eventType.replace(/_/g, ' ').toLowerCase()}</span>
                    </div>
                    <div className="event-time">{new Date(event.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p style={{ color: '#999', textAlign: 'center' }}>No recent activity</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
