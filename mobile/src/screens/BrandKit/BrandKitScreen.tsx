/**
 * Brand Kit Screen
 * Manage brand assets: logo, colors, fonts
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
import { UploadBox } from '../../components/UploadBox/UploadBox';
import { useBrandKit } from '../../hooks/useBrandKit';
import { colors, spacing, typography, radii } from '../../theme/tokens';

const PRESET_COLORS = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#9400D3',
  '#FF1493',
];

const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Montserrat',
  'Poppins',
  'Playfair Display',
  'Space Grotesk',
  'Open Sans',
];

export const BrandKitScreen = () => {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#00F0FF');
  const [secondaryColor, setSecondaryColor] = useState('#FF2EF5');
  const [fontFamily, setFontFamily] = useState('Inter');
  const { brandKits, createBrandKit, loading } = useBrandKit();

  const handleLogoUpload = () => {
    Alert.alert('Upload', 'Logo upload would happen here');
    setLogoUrl('https://placeholder.com/logo.png');
  };

  const handleSave = async () => {
    if (!name) {
      Alert.alert('Error', 'Please enter a brand kit name');
      return;
    }

    try {
      await createBrandKit({
        name,
        logo_url: logoUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        font_family: fontFamily,
      });
      Alert.alert('Success', 'Brand kit saved!');
      setName('');
      setLogoUrl('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save brand kit');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Brand Kit</Text>
      <Text style={styles.subtitle}>Define your brand identity</Text>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Brand Kit Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="My Brand"
          placeholderTextColor={colors.text.muted}
        />
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Logo</Text>
        <UploadBox
          onPress={handleLogoUpload}
          label="Upload Logo"
          hint="PNG or SVG recommended"
          icon="🎨"
        />
        {logoUrl && <Text style={styles.uploadedText}>✓ Logo uploaded</Text>}
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Primary Color</Text>
        <View style={styles.colorRow}>
          {PRESET_COLORS.slice(0, 4).map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorSwatch,
                { backgroundColor: color },
                primaryColor === color && styles.colorSwatchSelected,
              ]}
              onPress={() => setPrimaryColor(color)}
            />
          ))}
        </View>
        <View style={[styles.colorPreview, { backgroundColor: primaryColor }]}>
          <Text style={styles.colorValue}>{primaryColor}</Text>
        </View>
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Secondary Color</Text>
        <View style={styles.colorRow}>
          {PRESET_COLORS.slice(4, 8).map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorSwatch,
                { backgroundColor: color },
                secondaryColor === color && styles.colorSwatchSelected,
              ]}
              onPress={() => setSecondaryColor(color)}
            />
          ))}
        </View>
        <View style={[styles.colorPreview, { backgroundColor: secondaryColor }]}>
          <Text style={styles.colorValue}>{secondaryColor}</Text>
        </View>
      </NeoGlowCard>

      <NeoGlowCard style={styles.card}>
        <Text style={styles.label}>Font Family</Text>
        <View style={styles.fontList}>
          {FONT_FAMILIES.map((font) => (
            <TouchableOpacity
              key={font}
              style={[styles.fontOption, fontFamily === font && styles.fontOptionSelected]}
              onPress={() => setFontFamily(font)}
            >
              <Text style={styles.fontText}>{font}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </NeoGlowCard>

      <NeoGlowButton
        title={loading ? 'Saving...' : '💾 Save Brand Kit'}
        onPress={handleSave}
        disabled={loading}
      />

      {/* Existing Brand Kits */}
      {brandKits.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Brand Kits</Text>
          {brandKits.map((kit) => (
            <NeoGlowCard key={kit.id} style={styles.kitCard}>
              <Text style={styles.kitName}>{kit.name}</Text>
              <View style={styles.kitColors}>
                <View style={[styles.kitColorSwatch, { backgroundColor: kit.primary_color }]} />
                <View style={[styles.kitColorSwatch, { backgroundColor: kit.secondary_color }]} />
              </View>
            </NeoGlowCard>
          ))}
        </View>
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
  uploadedText: {
    color: colors.semantic.success,
    fontSize: typography.size.sm,
    marginTop: spacing[2],
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorSwatchSelected: {
    borderColor: colors.text.primary,
  },
  colorPreview: {
    height: 60,
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorValue: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
  },
  fontList: {
    gap: spacing[2],
  },
  fontOption: {
    backgroundColor: colors.bg.primary,
    borderWidth: 1,
    borderColor: '#1A1C22',
    borderRadius: radii.md,
    padding: spacing[4],
  },
  fontOptionSelected: {
    borderColor: colors.glow.primary,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  fontText: {
    color: colors.text.primary,
    fontSize: typography.size.md,
  },
  section: {
    marginTop: spacing[6],
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[4],
  },
  kitCard: {
    marginBottom: spacing[3],
  },
  kitName: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[2],
  },
  kitColors: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  kitColorSwatch: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
  },
});
