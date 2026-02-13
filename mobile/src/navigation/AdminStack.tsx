/**
 * Admin Stack Navigator
 * Admin-only screens for user and content management
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AdminScreen } from '../screens/Admin/AdminScreen';
import { colors, typography } from '../theme/tokens';

export type AdminStackParamList = {
  AdminDashboard: undefined;
  UserManagement: undefined;
  ContentModeration: undefined;
};

const Stack = createStackNavigator<AdminStackParamList>();

export const AdminStack: React.FC = () => {
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
        name="AdminDashboard"
        component={AdminScreen}
        options={{ title: 'Admin Dashboard' }}
      />
    </Stack.Navigator>
  );
};
