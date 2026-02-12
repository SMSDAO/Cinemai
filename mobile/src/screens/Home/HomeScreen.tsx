/**
 * Home Screen
 * Dashboard with recent productions, shorts, stats, and timeline preview
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useDashboard } from '../../hooks/useDashboard';
import { useAuth } from '../../hooks/useAuth';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { Avatar, Skeleton, TimelineEvent } from '../../components';
import { colors, spacing, typography } from '../../theme/tokens';

export const HomeScreen = () => {
  const { user } = useAuth();
  const {
    stats,
    recentProductions,
    recentShorts,
    timelinePreview,
    loading,
    error,
    refresh,
  } = useDashboard();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.glow.primary} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Avatar name={user?.name || 'User'} source={user?.avatar_url ? { uri: user.avatar_url } : undefined} size="lg" />
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Creator'}</Text>
            <Text style={styles.tagline}>Create with Neo</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      {loading ? (
        <View style={styles.statsRow}>
          <Skeleton width="30%" height={80} style={styles.statCard} />
          <Skeleton width="30%" height={80} style={styles.statCard} />
          <Skeleton width="30%" height={80} style={styles.statCard} />
        </View>
      ) : (
        <View style={styles.statsRow}>
          <NeoGlowCard style={styles.statCard}>
            <Text style={styles.statValue}>{stats?.productions || 0}</Text>
            <Text style={styles.statLabel}>Productions</Text>
          </NeoGlowCard>
          <NeoGlowCard style={styles.statCard} glowColor={colors.glow.secondary}>
            <Text style={styles.statValue}>{stats?.shorts || 0}</Text>
            <Text style={styles.statLabel}>Shorts</Text>
          </NeoGlowCard>
          <NeoGlowCard style={styles.statCard} glowColor={colors.glow.tertiary}>
            <Text style={styles.statValue}>{stats?.followers || 0}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </NeoGlowCard>
        </View>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <NeoGlowButton
          title="🎬 Create Production"
          onPress={() => {
            // TODO: Navigate to Cinema screen
          }}
          style={styles.actionButton}
        />
        <NeoGlowButton
          title="🎞 Create Short"
          onPress={() => {
            // TODO: Navigate to Shorts screen
          }}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>

      {/* Timeline Preview */}
      {timelinePreview.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {timelinePreview.slice(0, 3).map(event => (
            <TimelineEvent key={event.id} event={event} />
          ))}
        </View>
      )}

      {/* Recent Productions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Productions</Text>
        {loading ? (
          <>
            <Skeleton.Card style={styles.itemCard} />
            <Skeleton.Card style={styles.itemCard} />
          </>
        ) : recentProductions.length === 0 ? (
          <Text style={styles.emptyText}>No productions yet. Create your first one!</Text>
        ) : (
          recentProductions.slice(0, 3).map(prod => (
            <NeoGlowCard key={prod.id} style={styles.itemCard}>
              <Text style={styles.itemTitle}>{prod.title}</Text>
              <Text style={styles.itemStatus}>{prod.status}</Text>
            </NeoGlowCard>
          ))
        )}
      </View>

      {/* Recent Shorts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Shorts</Text>
        {loading ? (
          <>
            <Skeleton.Card style={styles.itemCard} />
            <Skeleton.Card style={styles.itemCard} />
          </>
        ) : recentShorts.length === 0 ? (
          <Text style={styles.emptyText}>No shorts yet. Start creating!</Text>
        ) : (
          recentShorts.slice(0, 3).map(short => (
            <NeoGlowCard key={short.id} style={styles.itemCard}>
              <Text style={styles.itemTitle}>{short.title}</Text>
              <Text style={styles.itemStatus}>{short.status}</Text>
            </NeoGlowCard>
          ))
        )}
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
    padding: spacing[5],
  },
  header: {
    marginBottom: spacing[6],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: spacing[4],
    flex: 1,
  },
  greeting: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
  },
  userName: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold as any,
    marginTop: spacing[1],
  },
  tagline: {
    color: colors.glow.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium as any,
    marginTop: spacing[1],
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  statCard: {
    flex: 1,
    marginHorizontal: spacing[1],
    alignItems: 'center',
  },
  statValue: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[1],
  },
  statLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[4],
  },
  actionButton: {
    marginBottom: spacing[3],
  },
  itemCard: {
    marginBottom: spacing[3],
  },
  itemTitle: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[1],
  },
  itemStatus: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    textTransform: 'capitalize',
  },
  emptyText: {
    color: colors.text.muted,
    fontSize: typography.size.md,
    textAlign: 'center',
    paddingVertical: spacing[6],
  },
  errorText: {
    color: '#EF4444',
    fontSize: typography.size.sm,
    textAlign: 'center',
    marginBottom: spacing[4],
    padding: spacing[3],
    backgroundColor: '#7F1D1D20',
    borderRadius: 8,
  },
});
