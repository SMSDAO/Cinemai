/**
 * Main App Tabs Navigator
 * Bottom tab navigation for authenticated users
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { TimelineScreen } from '../screens/Timeline/TimelineScreen';
import { CreateScreen } from '../screens/Create/CreateScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { colors, typography } from '../theme/tokens';

export type MainAppTabsParamList = {
  Home: undefined;
  Timeline: undefined;
  Create: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainAppTabsParamList>();

export const MainAppTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.bg.primary,
          borderTopColor: colors.glow.primary,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.glow.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: typography.size.xs,
          fontWeight: typography.weight.medium as any,
        },
        headerStyle: {
          backgroundColor: colors.bg.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: typography.weight.bold as any,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          tabBarIcon: () => null, // TODO: Add icon
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          tabBarIcon: () => null, // TODO: Add icon
          tabBarLabel: 'Timeline',
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: () => null, // TODO: Add icon
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => null, // TODO: Add icon
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
