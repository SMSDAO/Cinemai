/**
 * Profile Screen
 * User profile with stats, content, and settings
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Tabs, NeoGlowCard, NeoGlowButton, Skeleton } from '../../components';
import { colors, spacing, typography } from '../../theme/tokens';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'productions', label: 'Productions' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'likes', label: 'Likes' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Avatar
          name={user?.name || 'User'}
          source={user?.avatar_url ? { uri: user.avatar_url } : undefined}
          size="xl"
        />
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        <NeoGlowButton
          title="Edit Profile"
          onPress={() => {
            // TODO: Navigate to edit profile
          }}
          variant="secondary"
          style={styles.editButton}
        />
      </View>

      {/* Content Tabs */}
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <View style={styles.content}>
        {/* Tab Content Placeholder */}
        <Text style={styles.placeholderText}>
          {activeTab === 0 && 'Your timeline activity'}
          {activeTab === 1 && 'Your productions'}
          {activeTab === 2 && 'Your shorts'}
          {activeTab === 3 && 'Content you liked'}
        </Text>
        
        <Skeleton.Card style={styles.skeletonCard} />
        <Skeleton.Card style={styles.skeletonCard} />
      </View>

      {/* Logout Button */}
      <View style={styles.footer}>
        <NeoGlowButton
          title="Logout"
          onPress={handleLogout}
          variant="destructive"
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
  header: {
    alignItems: 'center',
    padding: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.bg.secondary,
  },
  name: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginTop: spacing[4],
  },
  email: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: spacing[1],
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing[6],
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: colors.glow.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
  },
  statLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    marginTop: spacing[1],
  },
  editButton: {
    marginTop: spacing[5],
    width: '80%',
  },
  content: {
    padding: spacing[5],
  },
  placeholderText: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    textAlign: 'center',
    marginVertical: spacing[6],
  },
  skeletonCard: {
    marginBottom: spacing[4],
  },
  footer: {
    padding: spacing[5],
    paddingBottom: spacing[8],
  },
});
