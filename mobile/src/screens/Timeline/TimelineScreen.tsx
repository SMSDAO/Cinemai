/**
 * Timeline Screen
 * Shows timeline events (User, Following, Global)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Tabs, NeoGlowCard, Skeleton } from '../../components';
import { colors, spacing, typography } from '../../theme/tokens';

export const TimelineScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'user', label: 'You' },
    { id: 'following', label: 'Following' },
    { id: 'global', label: 'Global' },
  ];

  return (
    <View style={styles.container}>
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
        variant="segmented"
      />
      
      <ScrollView style={styles.content}>
        {/* Placeholder for timeline events */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {activeTab === 0 && 'Your timeline will appear here'}
            {activeTab === 1 && 'Timeline from people you follow'}
            {activeTab === 2 && 'Global timeline from all users'}
          </Text>
          
          {/* Mock loading skeletons */}
          <Skeleton.Card style={styles.skeletonCard} />
          <Skeleton.Card style={styles.skeletonCard} />
          <Skeleton.Card style={styles.skeletonCard} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  content: {
    flex: 1,
    padding: spacing[4],
  },
  placeholder: {
    marginTop: spacing[6],
  },
  placeholderText: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  skeletonCard: {
    marginBottom: spacing[4],
  },
});
