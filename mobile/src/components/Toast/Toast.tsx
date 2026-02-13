import React, { useEffect } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, spacing, radii } from '../../theme/tokens';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onDismiss,
}) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => onDismiss());
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss, opacity]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.semantic.success;
      case 'error':
        return colors.semantic.error;
      case 'warning':
        return colors.semantic.warning;
      case 'info':
      default:
        return colors.semantic.info;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, backgroundColor: getBackgroundColor() },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing[4],
    borderRadius: radii.md,
    marginHorizontal: spacing[4],
    marginBottom: spacing[2],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    color: '#000',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    flex: 1,
  },
  closeButton: {
    padding: spacing[1],
    marginLeft: spacing[2],
  },
  closeText: {
    color: '#000',
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
});

export default Toast;
