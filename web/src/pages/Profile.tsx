import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { getMyStats, getUserTimeline } from '../services/api';
import { Card } from '../components/Card';
import type { Stats, TimelineEvent } from '../types';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, timelineData] = await Promise.all([
          getMyStats(),
          getUserTimeline({ limit: 10 }),
        ]);
        setStats(statsData);
        setTimeline(timelineData);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="page">
      <Card className="profile-header">
        <div className="avatar">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <span>{getInitials(user?.name || 'U')}</span>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-name">{user?.name}</div>
          {user?.handle && <div className="profile-handle">@{user.handle}</div>}
          {stats && (
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-value">{stats.followers}</div>
                <div className="profile-stat-label">Followers</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{stats.following}</div>
                <div className="profile-stat-label">Following</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">{stats.likes}</div>
                <div className="profile-stat-label">Likes</div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="section">
        <h2 className="section-title">Your Timeline</h2>
        <div className="list">
          {timeline.length > 0 ? (
            timeline.map((event) => (
              <Card key={event.id}>
                <div className="timeline-event">
                  <div className="event-icon">🎬</div>
                  <div className="event-content">
                    <div className="event-description">
                      {event.eventType.replace(/_/g, ' ').toLowerCase()}
                    </div>
                    <div className="event-time">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p style={{ color: '#999', textAlign: 'center' }}>No activity yet</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
