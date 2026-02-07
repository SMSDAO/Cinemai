/**
 * UploadBox Component
 * File upload interface with drag-drop styling
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme/tokens';

interface UploadBoxProps {
  onPress: () => void;
  label?: string;
  hint?: string;
  icon?: string;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  onPress,
  label = 'Upload File',
  hint = 'Tap to select',
  icon = '📁',
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.glow.primary,
    borderRadius: radii.lg,
    padding: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[2],
  },
  hint: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
  },
});
