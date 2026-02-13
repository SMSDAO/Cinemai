import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { getAdminUsers, getAdminContent, getAdminSystemStats } from '../services/api';
import { Tabs } from '../components/Tabs';
import { Card } from '../components/Card';
import type { AdminUser, AdminContentItem, SystemStats } from '../types';

export const Admin: React.FC = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [content, setContent] = useState<AdminContentItem[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAdmin) return;
      
      try {
        setLoading(true);
        setError(null);
        
        if (activeTab === 'users') {
          const usersData = await getAdminUsers({ limit: 50 });
          setUsers(usersData);
        } else if (activeTab === 'content') {
          const contentData = await getAdminContent({ limit: 50 });
          setContent(contentData);
        } else if (activeTab === 'system') {
          const statsData = await getAdminSystemStats();
          setStats(statsData);
        }
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, isAdmin]);

  if (authLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const tabs = [
    { id: 'users', label: 'Users' },
    { id: 'content', label: 'Content' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {error && (
        <div style={{ color: '#FF4444', marginBottom: '1rem', padding: '1rem', background: 'rgba(255, 68, 68, 0.1)', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {activeTab === 'users' && (
            <Card>
              <h2 style={{ marginBottom: '1rem' }}>Users ({users.length})</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Email</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Handle</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Role</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '0.75rem' }}>{user.name}</td>
                        <td style={{ padding: '0.75rem' }}>{user.email}</td>
                        <td style={{ padding: '0.75rem' }}>{user.handle || '—'}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span
                            style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              background: user.role === 'ADMIN' ? 'rgba(255, 46, 245, 0.2)' : 'rgba(107, 76, 255, 0.2)',
                              color: user.role === 'ADMIN' ? '#FF2EF5' : '#6B4CFF',
                            }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#A0A0A0' }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'content' && (
            <Card>
              <h2 style={{ marginBottom: '1rem' }}>Content ({content.length})</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Title</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Creator</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem', color: '#00F0FF' }}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>
                            {item.type === 'PRODUCTION' ? '🎬' : '🎞'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>{item.title}</td>
                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#A0A0A0' }}>
                          {item.user?.handle || item.user?.name || 'Unknown'}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <span
                            style={{
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              background: item.status === 'COMPLETED' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 165, 0, 0.2)',
                              color: item.status === 'COMPLETED' ? '#00FF88' : '#FFA500',
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#A0A0A0' }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'system' && stats && (
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', color: '#00F0FF', marginBottom: '0.5rem' }}>
                    {stats.users}
                  </div>
                  <div style={{ color: '#A0A0A0' }}>Total Users</div>
                </div>
              </Card>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', color: '#FF2EF5', marginBottom: '0.5rem' }}>
                    {stats.productions}
                  </div>
                  <div style={{ color: '#A0A0A0' }}>Productions</div>
                </div>
              </Card>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', color: '#6B4CFF', marginBottom: '0.5rem' }}>
                    {stats.shorts}
                  </div>
                  <div style={{ color: '#A0A0A0' }}>Shorts</div>
                </div>
              </Card>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', color: '#00FF88', marginBottom: '0.5rem' }}>
                    {stats.timelineEvents}
                  </div>
                  <div style={{ color: '#A0A0A0' }}>Timeline Events</div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};
