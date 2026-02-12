/**
 * Timeline Screen
 * Shows timeline events (User, Following, Global) with infinite scroll
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { Tabs, TimelineEvent } from '../../components';
import { useTimeline } from '../../hooks/useTimeline';
import { colors, spacing, typography } from '../../theme/tokens';
import type { TimelineEvent as TimelineEventType } from '../../services/timeline.service';

type TimelineType = 'user' | 'following' | 'global';

export const TimelineScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'user', label: 'You' },
    { id: 'following', label: 'Following' },
    { id: 'global', label: 'Global' },
  ];

  const timelineType: TimelineType = tabs[activeTab].id as TimelineType;

  const {
    events,
    loading,
    refreshing,
    hasMore,
    error,
    loadMore,
    refresh,
  } = useTimeline(timelineType);

  const renderItem = ({ item }: { item: TimelineEventType }) => (
    <TimelineEvent
      event={item}
      onPress={(event) => {
        console.log('Event pressed:', event.id);
        // TODO: Navigate to event detail or related content
      }}
    />
  );

  const renderEmpty = () => {
    if (loading && events.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.glow.primary} />
          <Text style={styles.emptyText}>Loading timeline...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <Text style={styles.emptySubtext}>Pull down to retry</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {activeTab === 0 && 'No events in your timeline yet'}
          {activeTab === 1 && 'Follow users to see their timeline'}
          {activeTab === 2 && 'No events in the global timeline yet'}
        </Text>
        <Text style={styles.emptySubtext}>
          Start creating productions and shorts to see activity here
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loading || events.length === 0) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.glow.primary} />
        <Text style={styles.footerText}>Loading more...</Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasMore && !loading) {
      loadMore();
    }
  };

  return (
    <View style={styles.container}>
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
        variant="segmented"
      />

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.glow.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  listContent: {
    padding: spacing[4],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  emptySubtext: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: typography.size.md,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
  footerText: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    marginLeft: spacing[2],
  },
});
