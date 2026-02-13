import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii } from '../../theme/tokens';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = radii.sm,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <View>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={16}
          width={index === lines - 1 ? '70%' : '100%'}
          style={styles.textLine}
        />
      ))}
    </View>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Skeleton height={150} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Skeleton height={20} width="80%" style={styles.cardTitle} />
        <SkeletonText lines={2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.bg.secondary,
  },
  textLine: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.md,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: {
    marginBottom: 0,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    marginBottom: 12,
  },
});

export default Skeleton;
