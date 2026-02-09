/**
 * Change Password Screen
 * Forces user to change password on first login (admin@admin.com)
 * Also accessible from Account settings
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { tokens } from '../../theme/tokens';

interface ChangePasswordScreenProps {
  navigation: any;
  route: any;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation, route }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFirstLogin = route.params?.isFirstLogin || false;
  const userId = route.params?.userId;

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Call API to change password
      // const response = await authService.changePassword(userId, currentPassword, newPassword);
      
      Alert.alert('Success', 'Password changed successfully', [
        {
          text: 'OK',
          onPress: () => {
            if (isFirstLogin) {
              // Navigate to home after forced password change
              navigation.navigate('Home');
            } else {
              // Go back to account settings
              navigation.goBack();
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isFirstLogin ? 'Change Your Password' : 'Update Password'}
        </Text>
        {isFirstLogin && (
          <Text style={styles.subtitle}>
            For security reasons, please change your password before continuing
          </Text>
        )}
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            placeholderTextColor={tokens.colors.text.tertiary}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password (min 8 characters)"
            placeholderTextColor={tokens.colors.text.tertiary}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter new password"
            placeholderTextColor={tokens.colors.text.tertiary}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <NeoGlowButton
          title={isLoading ? 'Changing Password...' : 'Change Password'}
          onPress={handleChangePassword}
          variant="primary"
          disabled={isLoading}
          style={styles.button}
        />

        {!isFirstLogin && (
          <NeoGlowButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
            style={styles.cancelButton}
          />
        )}
      </View>

      <View style={styles.requirements}>
        <Text style={styles.requirementsTitle}>Password Requirements:</Text>
        <Text style={styles.requirement}>• Minimum 8 characters</Text>
        <Text style={styles.requirement}>• Mix of letters and numbers recommended</Text>
        <Text style={styles.requirement}>• Avoid using common words</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background.dark900,
    padding: tokens.spacing.lg,
  },
  header: {
    marginBottom: tokens.spacing.xl,
    marginTop: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.typography.fontSize['3xl'],
    fontFamily: tokens.typography.fontFamily.heading,
    fontWeight: '700',
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.sm,
  },
  subtitle: {
    fontSize: tokens.typography.fontSize.base,
    fontFamily: tokens.typography.fontFamily.body,
    color: tokens.colors.text.secondary,
    lineHeight: 24,
  },
  form: {
    marginBottom: tokens.spacing.xl,
  },
  inputGroup: {
    marginBottom: tokens.spacing.lg,
  },
  label: {
    fontSize: tokens.typography.fontSize.sm,
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: '600',
    color: tokens.colors.text.secondary,
    marginBottom: tokens.spacing.xs,
  },
  input: {
    backgroundColor: tokens.colors.background.dark800,
    borderWidth: 1,
    borderColor: tokens.colors.primary.cyan,
    borderRadius: tokens.borderRadius.md,
    padding: tokens.spacing.md,
    fontSize: tokens.typography.fontSize.base,
    fontFamily: tokens.typography.fontFamily.body,
    color: tokens.colors.text.primary,
  },
  button: {
    marginTop: tokens.spacing.lg,
  },
  cancelButton: {
    marginTop: tokens.spacing.md,
  },
  requirements: {
    backgroundColor: tokens.colors.background.dark800,
    borderRadius: tokens.borderRadius.md,
    padding: tokens.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: tokens.colors.primary.cyan,
  },
  requirementsTitle: {
    fontSize: tokens.typography.fontSize.sm,
    fontFamily: tokens.typography.fontFamily.body,
    fontWeight: '600',
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  requirement: {
    fontSize: tokens.typography.fontSize.sm,
    fontFamily: tokens.typography.fontFamily.body,
    color: tokens.colors.text.secondary,
    marginTop: tokens.spacing.xs,
  },
});
