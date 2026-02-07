/**
 * StylePicker Component
 * Cinematic style selector with chips
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme/tokens';

interface Style {
  id: string;
  name: string;
  preview?: string;
}

interface StylePickerProps {
  styles: Style[];
  selectedStyle: string | null;
  onSelectStyle: (styleId: string) => void;
}

export const StylePicker: React.FC<StylePickerProps> = ({
  styles,
  selectedStyle,
  onSelectStyle,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {styles.map((style) => (
        <TouchableOpacity
          key={style.id}
          style={[
            styles.chip,
            selectedStyle === style.id && styles.chipSelected,
          ]}
          onPress={() => onSelectStyle(style.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.chipText,
              selectedStyle === style.id && styles.chipTextSelected,
            ]}
          >
            {style.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.glow.secondary,
    borderRadius: radii.full,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    marginRight: spacing[2],
  },
  chipSelected: {
    backgroundColor: 'rgba(255, 46, 245, 0.2)',
    borderColor: colors.glow.secondary,
    shadowColor: colors.glow.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 4,
  },
  chipText: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium as any,
  },
  chipTextSelected: {
    color: colors.text.primary,
    fontWeight: typography.weight.semibold as any,
  },
});
