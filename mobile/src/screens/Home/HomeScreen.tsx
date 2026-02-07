/**
 * Home Screen
 * Dashboard with recent productions and quick actions
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useProductions } from '../../hooks/useProductions';
import { useShorts } from '../../hooks/useShorts';
import { useAuth } from '../../hooks/useAuth';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { colors, spacing, typography } from '../../theme/tokens';

export const HomeScreen = () => {
  const { user } = useAuth();
  const { productions, loading: loadingProductions } = useProductions();
  const { shorts, loading: loadingShorts } = useShorts();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.name || 'Creator'}</Text>
        <Text style={styles.tagline}>Create with Neo</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <NeoGlowCard style={styles.statCard}>
          <Text style={styles.statValue}>{productions.length}</Text>
          <Text style={styles.statLabel}>Productions</Text>
        </NeoGlowCard>
        <NeoGlowCard style={styles.statCard} glowColor={colors.glow.secondary}>
          <Text style={styles.statValue}>{shorts.length}</Text>
          <Text style={styles.statLabel}>Shorts</Text>
        </NeoGlowCard>
        <NeoGlowCard style={styles.statCard} glowColor={colors.glow.tertiary}>
          <Text style={styles.statValue}>{user?.trips_remaining || 0}</Text>
          <Text style={styles.statLabel}>Trips Left</Text>
        </NeoGlowCard>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <NeoGlowButton
          title="🎬 Create Cinema"
          onPress={() => {}}
          style={styles.actionButton}
        />
        <NeoGlowButton
          title="🎞 Create Short"
          onPress={() => {}}
          variant="secondary"
          style={styles.actionButton}
        />
      </View>

      {/* Recent Productions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Productions</Text>
        {loadingProductions ? (
          <Text style={styles.emptyText}>Loading...</Text>
        ) : productions.length === 0 ? (
          <Text style={styles.emptyText}>No productions yet</Text>
        ) : (
          productions.slice(0, 3).map((prod) => (
            <NeoGlowCard key={prod.id} style={styles.itemCard}>
              <Text style={styles.itemTitle}>{prod.title}</Text>
              <Text style={styles.itemStatus}>{prod.status}</Text>
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
  greeting: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[2],
  },
  tagline: {
    color: colors.glow.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium as any,
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
});
