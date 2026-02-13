import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, radii } from '../../theme/tokens';

export interface AvatarProps {
  source?: { uri: string } | number;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

const SIZES = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const FONT_SIZES = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 36,
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  style,
}) => {
  const dimensions = SIZES[size];
  const fontSize = FONT_SIZES[size];

  const getInitials = (fullName?: string): string => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName[0]?.toUpperCase() || '?';
  };

  const getColorFromName = (fullName?: string): string => {
    if (!fullName) return colors.glow.tertiary;
    const hash = fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const glowColors = [colors.glow.primary, colors.glow.secondary, colors.glow.tertiary];
    return glowColors[hash % glowColors.length];
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions,
          height: dimensions,
          borderRadius: dimensions / 2,
          backgroundColor: source ? 'transparent' : getColorFromName(name),
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: dimensions,
              height: dimensions,
              borderRadius: dimensions / 2,
            },
          ]}
        />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{getInitials(name)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: '#000',
    fontWeight: typography.weight.bold,
  },
});

export default Avatar;
