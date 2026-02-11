/**
 * Admin Panel Screen
 * Accessible only to admin users
 * Shows system statistics and management options
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { colors, spacing, typography } from '../../theme/tokens';

interface AdminScreenProps {
  navigation: any;
}

interface DashboardData {
  totalUsers: number;
  totalProductions: number;
  totalShorts: number;
  activeSubscriptions: number;
  systemHealth: string;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ navigation }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      // TODO: Call admin API
      // const response = await api.get('/admin');
      
      // Mock data for now
      setDashboardData({
        totalUsers: 0,
        totalProductions: 0,
        totalShorts: 0,
        activeSubscriptions: 0,
        systemHealth: 'healthy',
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadDashboardData();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.glow.primary} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>System Overview & Management</Text>
      </View>

      {/* System Health */}
      <NeoGlowCard style={styles.healthCard}>
        <View style={styles.healthIndicator}>
          <View style={[styles.healthDot, { backgroundColor: colors.semantic.success }]} />
          <Text style={styles.healthText}>
            System Status: {dashboardData?.systemHealth?.toUpperCase()}
          </Text>
        </View>
      </NeoGlowCard>

      {/* Statistics Grid */}
      <View style={styles.statsGrid}>
        <NeoGlowCard style={styles.statCard}>
          <Text style={styles.statValue}>{dashboardData?.totalUsers || 0}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </NeoGlowCard>

        <NeoGlowCard style={styles.statCard}>
          <Text style={styles.statValue}>{dashboardData?.totalProductions || 0}</Text>
          <Text style={styles.statLabel}>Productions</Text>
        </NeoGlowCard>

        <NeoGlowCard style={styles.statCard}>
          <Text style={styles.statValue}>{dashboardData?.totalShorts || 0}</Text>
          <Text style={styles.statLabel}>Shorts</Text>
        </NeoGlowCard>

        <NeoGlowCard style={styles.statCard}>
          <Text style={styles.statValue}>{dashboardData?.activeSubscriptions || 0}</Text>
          <Text style={styles.statLabel}>Active Subs</Text>
        </NeoGlowCard>
      </View>

      {/* Management Actions */}
      <View style={styles.actions}>
        <Text style={styles.actionsTitle}>Management</Text>

        <NeoGlowButton
          title="Manage Users"
          onPress={() => navigation.navigate('AdminUsers')}
          variant="primary"
          style={styles.actionButton}
        />

        <NeoGlowButton
          title="System Settings"
          onPress={() => navigation.navigate('AdminSettings')}
          variant="secondary"
          style={styles.actionButton}
        />

        <NeoGlowButton
          title="Analytics"
          onPress={() => navigation.navigate('AdminAnalytics')}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  content: {
    padding: spacing[4],
  },
  loadingText: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    textAlign: 'center',
    marginTop: spacing[6],
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    fontSize: typography.size['3xl'],
    fontFamily: typography.family.display,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: typography.size.md,
    fontFamily: typography.family.primary,
    color: colors.text.secondary,
  },
  healthCard: {
    marginBottom: spacing[4],
    padding: spacing[3],
  },
  healthIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing[2],
  },
  healthText: {
    fontSize: typography.size.md,
    fontFamily: typography.family.primary,
    fontWeight: '600',
    color: colors.text.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  statCard: {
    width: '48%',
    padding: spacing[3],
    marginBottom: spacing[3],
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.size['3xl'],
    fontFamily: typography.family.display,
    fontWeight: '700',
    color: colors.glow.primary,
    marginBottom: spacing[1],
  },
  statLabel: {
    fontSize: typography.size.sm,
    fontFamily: typography.family.primary,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actions: {
    marginBottom: spacing[6],
  },
  actionsTitle: {
    fontSize: typography.size.xl,
    fontFamily: typography.family.display,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing[3],
  },
  actionButton: {
    marginBottom: spacing[3],
  },
});
