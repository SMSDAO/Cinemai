/**
 * Cinema Pro Screen
 * Advanced controls with style selection and production packs
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { UploadBox } from '../../../components/UploadBox/UploadBox';
import { NeoGlowButton } from '../../../components/NeoGlowButton/NeoGlowButton';
import { NeoGlowCard } from '../../../components/NeoGlowCard/NeoGlowCard';
import { StylePicker } from '../../../components/StylePicker/StylePicker';
import { useProductions } from '../../../hooks/useProductions';
import { colors, spacing, typography, radii } from '../../../theme/tokens';

const CINEMATIC_STYLES = [
  { id: 'noir', name: 'Film Noir' },
  { id: 'sci-fi', name: 'Sci-Fi' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'modern', name: 'Modern' },
  { id: 'anime', name: 'Anime' },
  { id: 'cinematic', name: 'Cinematic' },
];

export const CinemaProScreen = () => {
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const { createProduction, runProduction, loading } = useProductions();

  const handlePhotoUpload = () => {
    Alert.alert('Upload', 'Photo upload would happen here');
    setPhotoUrl('https://placeholder.com/photo.jpg');
  };

  const handleCreate = async () => {
    if (!title || !script || !photoUrl || !selectedStyle) {
      Alert.alert('Error', 'Please fill all fields and select a style');
      return;
    }

    try {
      const production = await createProduction({
        title,
        script,
        photo_url: photoUrl,
        style: selectedStyle,
      });
      await runProduction(production.id);
      Alert.alert('Success', 'Pro production started!');
      setTitle('');
      setScript('');
      setPhotoUrl('');
      setSelectedStyle(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to create production');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Pro Cinema</Text>
      <Text style={styles.subtitle}>Advanced controls and cinematic styles</Text>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Production Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Epic Cinematic Production"
          placeholderTextColor={colors.text.muted}
        />
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Upload Photo</Text>
        <UploadBox
          onPress={handlePhotoUpload}
          label="Select Photo"
          hint="Tap to choose high-res image"
          icon="📸"
        />
        {photoUrl && <Text style={styles.uploadedText}>✓ Photo uploaded</Text>}
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Cinematic Style</Text>
        <StylePicker
          styles={CINEMATIC_STYLES}
          selectedStyle={selectedStyle}
          onSelectStyle={setSelectedStyle}
        />
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Script</Text>
        <Text style={styles.hint}>Write your story with scene directions</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={script}
          onChangeText={setScript}
          placeholder="Scene 1: A lone figure walks through neon-lit streets..."
          placeholderTextColor={colors.text.muted}
          multiline
          numberOfLines={8}
        />
      </NeoGlowCard>

      <NeoGlowButton
        title={loading ? 'Creating...' : '🎬 Create Pro Production'}
        onPress={handleCreate}
        disabled={loading}
      />
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
  hint: {
    color: colors.text.muted,
    fontSize: typography.size.sm,
    marginBottom: spacing[2],
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
    height: 160,
    textAlignVertical: 'top',
  },
  uploadedText: {
    color: colors.semantic.success,
    fontSize: typography.size.sm,
    marginTop: spacing[2],
  },
});
