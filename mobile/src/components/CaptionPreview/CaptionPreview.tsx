/**
 * CaptionPreview Component
 * Preview caption styling for shorts
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

interface CaptionPreviewProps {
  text: string;
  style?: 'default' | 'bold' | 'neon' | 'minimal';
}

export const CaptionPreview: React.FC<CaptionPreviewProps> = ({
  text,
  style: captionStyle = 'default',
}) => {
  const getCaptionStyles = () => {
    switch (captionStyle) {
      case 'bold':
        return { fontWeight: typography.weight.bold as any, fontSize: typography.size.xl };
      case 'neon':
        return {
          color: colors.glow.primary,
          fontWeight: typography.weight.bold as any,
          textShadowColor: colors.glow.primary,
          textShadowRadius: 12,
        };
      case 'minimal':
        return { fontSize: typography.size.sm, color: colors.text.secondary };
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewBox}>
        <Text style={[styles.caption, getCaptionStyles()]}>{text}</Text>
      </View>
      <Text style={styles.label}>Style: {captionStyle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[4],
  },
  previewBox: {
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.md,
    padding: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.glow.primary,
  },
  caption: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    textAlign: 'center',
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginTop: spacing[2],
    textAlign: 'center',
  },
});
