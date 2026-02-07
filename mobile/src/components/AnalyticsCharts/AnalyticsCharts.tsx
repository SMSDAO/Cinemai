/**
 * AnalyticsCharts Component
 * Performance metrics visualization
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    {trend !== undefined && (
      <Text style={[styles.metricTrend, trend >= 0 ? styles.trendUp : styles.trendDown]}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </Text>
    )}
  </View>
);

interface AnalyticsChartsProps {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  engagementRate: number;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  totalViews,
  totalLikes,
  totalShares,
  engagementRate,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Overview</Text>
      <View style={styles.metricsGrid}>
        <MetricCard label="Total Views" value={totalViews.toLocaleString()} trend={12} />
        <MetricCard label="Total Likes" value={totalLikes.toLocaleString()} trend={8} />
        <MetricCard label="Shares" value={totalShares.toLocaleString()} trend={-3} />
        <MetricCard label="Engagement" value={`${engagementRate.toFixed(1)}%`} trend={5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[5],
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[2],
  },
  metricCard: {
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.md,
    padding: spacing[4],
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: colors.glow.primary,
  },
  metricLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginBottom: spacing[2],
  },
  metricValue: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[1],
  },
  metricTrend: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium as any,
  },
  trendUp: {
    color: colors.semantic.success,
  },
  trendDown: {
    color: colors.semantic.error,
  },
});
