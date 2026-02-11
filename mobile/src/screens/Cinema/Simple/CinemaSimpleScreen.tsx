/**
 * Cinema Simple Screen
 * Quick photo + script upload for fast production
 */

import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { UploadBox } from '../../../components/UploadBox/UploadBox';
import { NeoGlowButton } from '../../../components/NeoGlowButton/NeoGlowButton';
import { NeoGlowCard } from '../../../components/NeoGlowCard/NeoGlowCard';
import { useProductions } from '../../../hooks/useProductions';
import { colors, spacing, typography, radii } from '../../../theme/tokens';

export const CinemaSimpleScreen = () => {
  const [title, setTitle] = useState('');
  const [script, setScript] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const { createProduction, runProduction, loading } = useProductions();

  const handlePhotoUpload = () => {
    // TODO: Implement image picker
    Alert.alert('Upload', 'Photo upload would happen here');
    setPhotoUrl('https://placeholder.com/photo.jpg');
  };

  const handleCreate = async () => {
    if (!title || !script || !photoUrl) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const production = await createProduction({ title, script, photo_url: photoUrl });
      await runProduction(production.id);
      Alert.alert('Success', 'Production started!');
      setTitle('');
      setScript('');
      setPhotoUrl('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create production');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quick Cinema</Text>
      <Text style={styles.subtitle}>Transform a photo into cinematic video</Text>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="My Cinematic Story"
          placeholderTextColor={colors.text.muted}
        />
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Upload Photo</Text>
        <UploadBox
          onPress={handlePhotoUpload}
          label="Select Photo"
          hint="Tap to choose from gallery"
          icon="📸"
        />
        {photoUrl && <Text style={styles.uploadedText}>✓ Photo uploaded</Text>}
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Script</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={script}
          onChangeText={setScript}
          placeholder="Write your story here..."
          placeholderTextColor={colors.text.muted}
          multiline
          numberOfLines={6}
        />
      </NeoGlowCard>

      <NeoGlowButton
        title={loading ? 'Creating...' : '🎬 Create Production'}
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
    height: 120,
    textAlignVertical: 'top',
  },
  uploadedText: {
    color: colors.semantic.success,
    fontSize: typography.size.sm,
    marginTop: spacing[2],
  },
});
