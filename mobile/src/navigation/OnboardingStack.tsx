/**
 * Onboarding Stack Navigator
 * Handles onboarding flow for new users
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen';
import { colors, typography } from '../theme/tokens';

export type OnboardingStackParamList = {
  Onboarding: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.bg.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: typography.weight.bold as any,
        },
        cardStyle: {
          backgroundColor: colors.bg.primary,
        },
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
