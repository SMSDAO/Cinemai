/**
 * Timeline Component
 * Production progress timeline
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '../../theme/tokens';

interface TimelineStep {
  label: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
}

interface TimelineProps {
  steps: TimelineStep[];
}

export const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const getStepColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return colors.semantic.success;
      case 'active':
        return colors.glow.primary;
      case 'failed':
        return colors.semantic.error;
      default:
        return colors.text.muted;
    }
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.stepIndicatorContainer}>
            <View style={[styles.stepIndicator, { backgroundColor: getStepColor(step.status) }]} />
            {index < steps.length - 1 && <View style={styles.connector} />}
          </View>
          <View style={styles.stepContent}>
            <Text style={[styles.stepLabel, { color: getStepColor(step.status) }]}>
              {step.label}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[4],
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: spacing[2],
  },
  stepIndicatorContainer: {
    alignItems: 'center',
    marginRight: spacing[3],
  },
  stepIndicator: {
    width: 16,
    height: 16,
    borderRadius: radii.full,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.text.muted,
    marginTop: spacing[1],
  },
  stepContent: {
    flex: 1,
    paddingTop: spacing[1],
  },
  stepLabel: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium as any,
  },
});
