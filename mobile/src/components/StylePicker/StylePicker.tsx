/**
 * StylePicker Component
 * Cinematic style selector with chips
 */

import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, radii, spacing, typography } from '../../theme/tokens';

interface Style {
  id: string;
  name: string;
  preview?: string;
}

interface StylePickerProps {
  availableStyles: Style[];
  selectedStyle: string | null;
  onSelectStyle: (styleId: string) => void;
}

export const StylePicker: React.FC<StylePickerProps> = ({
  availableStyles,
  selectedStyle,
  onSelectStyle,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={localStyles.container}>
      {availableStyles.map((style) => (
        <TouchableOpacity
          key={style.id}
          style={[
            localStyles.chip,
            selectedStyle === style.id && localStyles.chipSelected,
          ]}
          onPress={() => onSelectStyle(style.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              localStyles.chipText,
              selectedStyle === style.id && localStyles.chipTextSelected,
            ]}
          >
            {style.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
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
