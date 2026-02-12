/**
 * Root Navigator
 * Handles auth flow routing based on user state
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { MainAppTabs } from './MainAppTabs';
import { AdminStack } from './AdminStack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';

const Stack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  const { user, isLoading, isAuthenticated } = useAuth();

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.glow.primary} />
      </View>
    );
  }

  // Determine which navigator to show based on auth state
  // If no user → AuthStack
  if (!isAuthenticated || !user) {
    return <AuthStack />;
  }

  // If user not onboarded → OnboardingStack
  // Note: Check if user has completed onboarding (handle, avatar, etc.)
  const isOnboarded = user.name && user.name.length > 0; // Simplified check for now
  if (!isOnboarded) {
    return <OnboardingStack />;
  }

  // If user is admin → Show AdminStack option in tabs
  // For now, we'll show MainAppTabs for all authenticated users
  // Admin navigation can be conditional within the app

  return <MainAppTabs />;
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg.primary,
  },
});
