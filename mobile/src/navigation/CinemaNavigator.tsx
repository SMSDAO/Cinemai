/**
 * Cinema Stack Navigator
 * Navigation for Cinema screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CinemaStackParamList } from './types';
import { CinemaSimpleScreen } from '../screens/Cinema/Simple/CinemaSimpleScreen';
import { CinemaProScreen } from '../screens/Cinema/Pro/CinemaProScreen';
import { colors, typography } from '../theme/tokens';

const Stack = createStackNavigator<CinemaStackParamList>();

export const CinemaNavigator: React.FC = () => {
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
          fontWeight: typography.weight.semibold as any,
        },
      }}
    >
      <Stack.Screen 
        name="CinemaSimple" 
        component={CinemaSimpleScreen}
        options={{ title: 'Quick Cinema' }}
      />
      <Stack.Screen 
        name="CinemaPro" 
        component={CinemaProScreen}
        options={{ title: 'Pro Cinema' }}
      />
    </Stack.Navigator>
  );
};
