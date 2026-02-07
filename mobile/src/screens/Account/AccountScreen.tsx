/**
 * Account Screen
 * User profile, settings, and preferences
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { useAuth } from '../../hooks/useAuth';
import { colors, spacing, typography, radii } from '../../theme/tokens';

export const AccountScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Account</Text>

      {/* Profile */}
      <NeoGlowCard style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {user?.subscription_type === 'pro' ? '⭐ Pro' : 'Free'}
              </Text>
            </View>
          </View>
        </View>
      </NeoGlowCard>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Edit Profile</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy & Security</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Connected Accounts</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Default Video Format</Text>
          <Text style={styles.settingValue}>9:16</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Auto-publish</Text>
          <Text style={styles.settingValue}>Off</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Quality</Text>
          <Text style={styles.settingValue}>High</Text>
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Help Center</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Contact Us</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Terms of Service</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy Policy</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <NeoGlowCard style={styles.card}>
        <Text style={styles.appInfo}>CinemAi Neo v1.0.0</Text>
        <Text style={styles.appTagline}>Create with power. Create with Neo.</Text>
      </NeoGlowCard>

      {/* Logout */}
      <NeoGlowButton
        title="Logout"
        onPress={handleLogout}
        variant="secondary"
        textStyle={{ color: colors.semantic.error }}
      />
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
    marginBottom: spacing[6],
  },
  card: {
    marginBottom: spacing[5],
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.glow.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[4],
  },
  avatarText: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold as any,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[1],
  },
  profileEmail: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    marginBottom: spacing[2],
  },
  badge: {
    backgroundColor: 'rgba(0, 240, 255, 0.2)',
    borderWidth: 1,
    borderColor: colors.glow.primary,
    borderRadius: radii.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: colors.glow.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold as any,
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
  settingItem: {
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.md,
    padding: spacing[4],
    marginBottom: spacing[2],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  settingValue: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
  },
  settingArrow: {
    color: colors.text.secondary,
    fontSize: typography.size.xl,
  },
  appInfo: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  appTagline: {
    color: colors.glow.primary,
    fontSize: typography.size.sm,
    textAlign: 'center',
    fontWeight: typography.weight.medium as any,
  },
});
