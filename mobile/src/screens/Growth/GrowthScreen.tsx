/**
 * Growth Screen
 * Social media publishing and analytics
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { AnalyticsCharts } from '../../components/AnalyticsCharts/AnalyticsCharts';
import { useAnalytics } from '../../hooks/useAnalytics';
import { colors, spacing, typography, radii } from '../../theme/tokens';

const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' },
  { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000' },
  { id: 'x', name: 'X', icon: '𝕏', color: '#000000' },
];

export const GrowthScreen = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  // Analytics data (placeholder for future implementation)
  // const { shortsAnalytics, productionsAnalytics, loading } = useAnalytics();

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const mockAnalytics = {
    totalViews: 125000,
    totalLikes: 8500,
    totalShares: 1200,
    engagementRate: 6.8,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Growth</Text>
      <Text style={styles.subtitle}>Publish and track your content</Text>

      {/* Connected Platforms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Platforms</Text>
        <View style={styles.platformsGrid}>
          {PLATFORMS.map((platform) => (
            <TouchableOpacity
              key={platform.id}
              style={[
                styles.platformCard,
                selectedPlatforms.includes(platform.id) && styles.platformCardSelected,
              ]}
              onPress={() => togglePlatform(platform.id)}
            >
              <Text style={styles.platformIcon}>{platform.icon}</Text>
              <Text style={styles.platformName}>{platform.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <NeoGlowButton
          title="📤 Schedule Post"
          onPress={() => {
            // TODO: Navigate to schedule post screen
          }}
          style={styles.actionButton}
        />
        <NeoGlowButton
          title="📅 View Calendar"
          onPress={() => {
            // TODO: Navigate to calendar screen
          }}
          variant="secondary"
        />
      </View>

      {/* Analytics */}
      <View style={styles.section}>
        <AnalyticsCharts {...mockAnalytics} />
      </View>

      {/* Recent Posts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Posts</Text>
        <NeoGlowCard style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.postPlatform}>📷 Instagram</Text>
            <Text style={styles.postStatus}>Published</Text>
          </View>
          <Text style={styles.postTitle}>My Latest Short</Text>
          <View style={styles.postMetrics}>
            <Text style={styles.postMetric}>👁 1.2K</Text>
            <Text style={styles.postMetric}>❤️ 89</Text>
            <Text style={styles.postMetric}>💬 12</Text>
          </View>
        </NeoGlowCard>

        <NeoGlowCard style={styles.postCard}>
          <View style={styles.postHeader}>
            <Text style={styles.postPlatform}>🎵 TikTok</Text>
            <Text style={styles.postStatus}>Scheduled</Text>
          </View>
          <Text style={styles.postTitle}>Cinema Production #2</Text>
          <Text style={styles.postScheduled}>Posts in 2 hours</Text>
        </NeoGlowCard>
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
  title: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[2],
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    marginBottom: spacing[6],
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
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[2],
  },
  platformCard: {
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.glow.primary,
    borderRadius: radii.md,
    padding: spacing[4],
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: spacing[3],
    alignItems: 'center',
  },
  platformCardSelected: {
    borderColor: colors.glow.primary,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  platformIcon: {
    fontSize: 32,
    marginBottom: spacing[2],
  },
  platformName: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium as any,
  },
  actionButton: {
    marginBottom: spacing[3],
  },
  postCard: {
    marginBottom: spacing[3],
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  postPlatform: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium as any,
  },
  postStatus: {
    color: colors.semantic.success,
    fontSize: typography.size.xs,
  },
  postTitle: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[3],
  },
  postMetrics: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  postMetric: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
  },
  postScheduled: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
  },
});
