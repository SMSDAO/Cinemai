import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing } from '../../theme/tokens';
import { Input, NeoGlowButton, useToast } from '../../components';
import { useAuth } from '../../hooks';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast('Login successful!', 'success');
    } catch (error) {
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    showToast(\`\${provider} login coming soon!\`, 'info');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue creating amazing content
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <NeoGlowButton
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
        />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtons}>
        <NeoGlowButton
          title="Continue with Google"
          onPress={() => handleSocialLogin('Google')}
          variant="secondary"
        />
      </View>

      <View style={styles.signupPrompt}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  content: {
    padding: spacing[6],
  },
  header: {
    marginTop: spacing[10],
    marginBottom: spacing[8],
  },
  title: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  subtitle: {
    fontSize: typography.size.md,
    color: colors.text.secondary,
  },
  form: {
    marginBottom: spacing[6],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[6],
  },
  forgotPasswordText: {
    color: colors.glow.primary,
    fontSize: typography.size.sm,
  },
  loginButton: {
    marginTop: spacing[2],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1A1C22',
  },
  dividerText: {
    marginHorizontal: spacing[4],
    color: colors.text.muted,
    fontSize: typography.size.sm,
  },
  socialButtons: {
    marginBottom: spacing[6],
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  signupText: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
  },
  signupLink: {
    color: colors.glow.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
});

export default LoginScreen;
