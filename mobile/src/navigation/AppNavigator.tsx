/**
 * App Navigator
 * Main navigation container
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';
import { colors } from '../theme/tokens';

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.glow.primary,
          background: colors.bg.primary,
          card: colors.bg.secondary,
          text: colors.text.primary,
          border: colors.glow.primary,
          notification: colors.semantic.info,
        },
      }}
    >
      <TabNavigator />
    </NavigationContainer>
  );
};
