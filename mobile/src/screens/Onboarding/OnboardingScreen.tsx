/**
 * OnboardingScreen
 * Post-signup onboarding: handle selection, avatar upload, interests
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/Toast/ToastContext';
import { Input, NeoGlowButton, Avatar } from '../../components';
import * as ImagePicker from 'expo-image-picker';

const INTEREST_OPTIONS = [
  { id: 'cinema', label: '🎬 Cinema', value: 'cinema' },
  { id: 'shorts', label: '🎞️ Shorts', value: 'shorts' },
  { id: 'music', label: '🎵 Music', value: 'music' },
  { id: 'animation', label: '✨ Animation', value: 'animation' },
  { id: 'documentary', label: '📹 Documentary', value: 'documentary' },
  { id: 'comedy', label: '😂 Comedy', value: 'comedy' },
  { id: 'drama', label: '🎭 Drama', value: 'drama' },
  { id: 'scifi', label: '🚀 Sci-Fi', value: 'scifi' },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [handle, setHandle] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [handleError, setHandleError] = useState<string | undefined>();

  const validateHandle = (text: string): boolean => {
    // Handle must be 3-20 characters, alphanumeric with underscores
    if (!text.trim()) {
      setHandleError('Handle is required');
      return false;
    }
    if (text.length < 3) {
      setHandleError('Handle must be at least 3 characters');
      return false;
    }
    if (text.length > 20) {
      setHandleError('Handle must be at most 20 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(text)) {
      setHandleError('Handle can only contain letters, numbers, and underscores');
      return false;
    }
    setHandleError(undefined);
    return true;
  };

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Please grant camera roll permissions to upload an avatar.'
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      showToast('Failed to pick image', 'error');
    }
  };

  const toggleInterest = (interestValue: string) => {
    if (selectedInterests.includes(interestValue)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interestValue));
    } else {
      setSelectedInterests([...selectedInterests, interestValue]);
    }
  };

  const handleContinue = async () => {
    if (!validateHandle(handle)) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Call API to update user profile with handle, avatar, interests
      // For now, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data
      await refreshUser();

      showToast('Profile setup complete!', 'success');
      // Navigation to main app will be handled by auth state
    } catch (error: any) {
      console.error('Onboarding error:', error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to complete onboarding';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Allow users to skip onboarding
    showToast('You can complete your profile later', 'info');
    // Navigation to main app will be handled by auth state
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Set up your profile to get started with CinemAi
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Avatar
            source={avatarUri ? { uri: avatarUri } : undefined}
            name={user?.name || 'User'}
            size="xl"
          />
          <View style={styles.avatarOverlay}>
            <Text style={styles.avatarOverlayText}>Tap to upload</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Handle</Text>
        <Input
          value={handle}
          onChangeText={(text) => {
            setHandle(text.toLowerCase().replace(/[^a-z0-9_]/g, ''));
            validateHandle(text);
          }}
          placeholder="username"
          autoCapitalize="none"
          autoCorrect={false}
          error={handleError}
          helperText="3-20 characters, letters, numbers, and underscores only"
          disabled={isLoading}
          prefix="@"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Interests <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <Text style={styles.sectionDescription}>
          Select topics you're interested in
        </Text>
        <View style={styles.interestsGrid}>
          {INTEREST_OPTIONS.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestChip,
                selectedInterests.includes(interest.value) &&
                  styles.interestChipSelected,
              ]}
              onPress={() => toggleInterest(interest.value)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.interestChipText,
                  selectedInterests.includes(interest.value) &&
                    styles.interestChipTextSelected,
                ]}
              >
                {interest.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <NeoGlowButton
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          loading={isLoading}
          style={styles.continueButton}
        />
        <NeoGlowButton
          title="Skip for now"
          onPress={handleSkip}
          variant="ghost"
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0B0',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#A0A0B0',
    marginBottom: 16,
  },
  optional: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  avatarOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1A1A24',
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  interestChipSelected: {
    backgroundColor: '#6B4CFF',
    borderColor: '#6B4CFF',
  },
  interestChipText: {
    fontSize: 14,
    color: '#A0A0B0',
    fontWeight: '500',
  },
  interestChipTextSelected: {
    color: '#FFFFFF',
  },
  actions: {
    gap: 12,
    marginTop: 24,
  },
  continueButton: {
    marginBottom: 8,
  },
});
