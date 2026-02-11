/**
 * Tab Navigator
 * Bottom tab navigation for main sections
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { CinemaNavigator } from './CinemaNavigator';
import { ShortsScreen } from '../screens/Shorts/ShortsScreen';
import { GrowthScreen } from '../screens/Growth/GrowthScreen';
import { AccountScreen } from '../screens/Account/AccountScreen';
import { colors, typography } from '../theme/tokens';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
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
          tabBarIcon: () => null,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Cinema"
        component={CinemaNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabel: 'Cinema',
        }}
      />
      <Tab.Screen
        name="Shorts"
        component={ShortsScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: 'Shorts',
        }}
      />
      <Tab.Screen
        name="Growth"
        component={GrowthScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: 'Growth',
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};
