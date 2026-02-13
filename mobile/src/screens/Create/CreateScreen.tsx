/**
 * Create Screen
 * Quick access to create Productions and Shorts
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NeoGlowButton, NeoGlowCard } from '../../components';
import { colors, spacing, typography } from '../../theme/tokens';

export const CreateScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>What do you want to create?</Text>
      
      <NeoGlowCard style={styles.card}>
        <Text style={styles.cardTitle}>🎬 Cinema Production</Text>
        <Text style={styles.cardDescription}>
          Transform your ideas into cinematic videos with AI-powered production tools.
        </Text>
        <NeoGlowButton
          title="Create Production"
          onPress={() => {
            // TODO: Navigate to Cinema creation
          }}
          style={styles.button}
        />
      </NeoGlowCard>

      <NeoGlowCard style={styles.card} glowColor={colors.glow.secondary}>
        <Text style={styles.cardTitle}>🎞 Short Content</Text>
        <Text style={styles.cardDescription}>
          Create engaging short-form content optimized for social media.
        </Text>
        <NeoGlowButton
          title="Create Short"
          onPress={() => {
            // TODO: Navigate to Shorts creation
          }}
          variant="secondary"
          style={styles.button}
        />
      </NeoGlowCard>

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Quick Tips</Text>
        <Text style={styles.tipText}>• Productions work best with 1-3 minute scripts</Text>
        <Text style={styles.tipText}>• Shorts are optimized for 15-60 second content</Text>
        <Text style={styles.tipText}>• Use style presets for consistent branding</Text>
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
    padding: spacing[5],
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[6],
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing[5],
  },
  cardTitle: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[3],
  },
  cardDescription: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    lineHeight: typography.size.md * 1.5,
    marginBottom: spacing[4],
  },
  button: {
    marginTop: spacing[2],
  },
  tipsSection: {
    marginTop: spacing[6],
    padding: spacing[4],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[3],
  },
  tipsTitle: {
    color: colors.glow.primary,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[3],
  },
  tipText: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginBottom: spacing[2],
  },
});
