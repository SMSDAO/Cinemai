/**
 * Shorts Screen
 * Create viral short-form content with hook generation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { CaptionPreview } from '../../components/CaptionPreview/CaptionPreview';
import { useShorts } from '../../hooks/useShorts';
import { colors, spacing, typography, radii } from '../../theme/tokens';

const FORMATS = [
  { id: '9:16', name: 'Portrait (9:16)', icon: '📱' },
  { id: '1:1', name: 'Square (1:1)', icon: '⬜' },
  { id: '16:9', name: 'Landscape (16:9)', icon: '🖥' },
];

// Caption styles available for shorts (not yet implemented in UI)
// const CAPTION_STYLES = ['default', 'bold', 'neon', 'minimal'];

export const ShortsScreen = () => {
  const [title, setTitle] = useState('');
  const [idea, setIdea] = useState('');
  const [format, setFormat] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [hooks, setHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState<number | null>(null);
  // Caption style management (placeholder for future implementation)
  // const [captionStyle, setCaptionStyle] = useState('default');
  const { createShort, generateHooks, loading } = useShorts();
  // generateVariants will be used when implementing variant generation
  // const { generateVariants } = useShorts();

  const handleGenerateHooks = async () => {
    if (!idea) {
      Alert.alert('Error', 'Please enter your content idea');
      return;
    }

    try {
      const short = await createShort({ title: title || 'Untitled', idea, format });
      const generatedHooks = await generateHooks(short.id, idea);
      setHooks(generatedHooks);
      Alert.alert('Success', `Generated ${generatedHooks.length} hooks!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate hooks');
    }
  };

  const handleCreateVariants = async () => {
    if (selectedHook === null) {
      Alert.alert('Error', 'Please select a hook first');
      return;
    }

    try {
      Alert.alert('Success', 'Generating variants...');
      // TODO: Navigate to variant preview
    } catch (error) {
      Alert.alert('Error', 'Failed to create variants');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create Shorts</Text>
      <Text style={styles.subtitle}>Viral short-form content with AI</Text>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="My Viral Short"
          placeholderTextColor={colors.text.muted}
        />
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Format</Text>
        <View style={styles.formatRow}>
          {FORMATS.map(fmt => (
            <TouchableOpacity
              key={fmt.id}
              style={[styles.formatChip, format === fmt.id && styles.formatChipSelected]}
              onPress={() => setFormat(fmt.id as any)}
            >
              <Text style={styles.formatIcon}>{fmt.icon}</Text>
              <Text style={styles.formatText}>{fmt.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Content Idea</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={idea}
          onChangeText={setIdea}
          placeholder="Describe your content idea..."
          placeholderTextColor={colors.text.muted}
          multiline
          numberOfLines={4}
        />
      </NeoGlowCard>

      <NeoGlowButton
        title={loading ? 'Generating...' : '✨ Generate Hooks'}
        onPress={handleGenerateHooks}
        disabled={loading}
        style={styles.button}
      />

      {hooks.length > 0 && (
        <NeoGlowCard style={styles.card} glowColor={colors.glow.secondary}>
          <Text style={styles.label}>Generated Hooks</Text>
          {hooks.map((hook, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.hookItem, selectedHook === index && styles.hookItemSelected]}
              onPress={() => setSelectedHook(index)}
            >
              <Text style={styles.hookText}>{hook}</Text>
            </TouchableOpacity>
          ))}
        </NeoGlowCard>
      )}

      {selectedHook !== null && (
        <>
          <CaptionPreview text={hooks[selectedHook]} style={'default' as any} />
          <NeoGlowButton
            title="🎞 Create Variants"
            onPress={handleCreateVariants}
            variant="secondary"
          />
        </>
      )}
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
    marginBottom: spacing[2],
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    marginBottom: spacing[6],
  },
  card: {
    marginBottom: spacing[5],
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[3],
  },
  input: {
    backgroundColor: colors.bg.primary,
    borderWidth: 1,
    borderColor: '#1A1C22',
    borderRadius: radii.md,
    padding: spacing[4],
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formatRow: {
    gap: spacing[2],
  },
  formatChip: {
    backgroundColor: colors.bg.primary,
    borderWidth: 1,
    borderColor: colors.glow.primary,
    borderRadius: radii.md,
    padding: spacing[3],
    marginBottom: spacing[2],
  },
  formatChipSelected: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderColor: colors.glow.primary,
    borderWidth: 2,
  },
  formatIcon: {
    fontSize: typography.size.xl,
    marginBottom: spacing[1],
  },
  formatText: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
  },
  button: {
    marginBottom: spacing[5],
  },
  hookItem: {
    backgroundColor: colors.bg.primary,
    borderWidth: 1,
    borderColor: '#1A1C22',
    borderRadius: radii.md,
    padding: spacing[4],
    marginBottom: spacing[2],
  },
  hookItemSelected: {
    borderColor: colors.glow.secondary,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 46, 245, 0.1)',
  },
  hookText: {
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
});
