import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, radii, components } from '../../theme/tokens';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'text' | 'textarea';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'text',
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const hasError = Boolean(error);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          variant === 'textarea' && styles.textarea,
          hasError && styles.inputError,
          inputStyle,
        ]}
        placeholderTextColor={colors.text.muted}
        multiline={variant === 'textarea'}
        numberOfLines={variant === 'textarea' ? 4 : 1}
        {...textInputProps}
      />
      {(error || helperText) && (
        <Text style={[styles.helperText, hasError && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    marginBottom: spacing[2],
  },
  input: {
    backgroundColor: components.input.default.background,
    borderWidth: 1,
    borderColor: '#1A1C22',
    borderRadius: radii.md,
    padding: spacing[4],
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontFamily: typography.family.primary,
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: colors.semantic.error,
  },
  helperText: {
    color: colors.text.muted,
    fontSize: typography.size.xs,
    marginTop: spacing[1],
  },
  errorText: {
    color: colors.semantic.error,
  },
});

export default Input;
