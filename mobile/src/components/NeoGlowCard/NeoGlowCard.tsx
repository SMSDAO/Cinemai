/**
 * NeoGlowCard Component
 * Card with glow border effect
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing } from '../../theme/tokens';

interface NeoGlowCardProps {
  children: ReactNode;
  style?: ViewStyle;
  glowColor?: string;
}

export const NeoGlowCard: React.FC<NeoGlowCardProps> = ({
  children,
  style,
  glowColor = colors.glow.primary,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          shadowColor: glowColor,
          borderColor: glowColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.md,
    padding: spacing[5],
    borderWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 4,
  },
});
