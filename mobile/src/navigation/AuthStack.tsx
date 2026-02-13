/**
 * Auth Stack Navigator
 * Handles login and signup flows
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { SignupScreen } from '../screens/Auth/SignupScreen';
import { colors, typography } from '../theme/tokens';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack: React.FC = () => {
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
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: colors.bg.primary,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Create Account' }}
      />
    </Stack.Navigator>
  );
};
