/**
 * NeoGlowButton Component
 * Primary button with Neo Glow effect
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme/tokens';

interface NeoGlowButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const NeoGlowButton: React.FC<NeoGlowButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        variant === 'destructive' && styles.destructive,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={variant === 'primary' || variant === 'destructive' ? '#000' : colors.text.primary} />
        </View>
      ) : (
        <Text style={[styles.text, variant === 'ghost' && styles.ghostText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.glow.primary,
    shadowColor: colors.glow.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  secondary: {
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.glow.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: colors.semantic.error,
    shadowColor: colors.semantic.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
  },
  ghostText: {
    color: colors.glow.primary,
  },
});
