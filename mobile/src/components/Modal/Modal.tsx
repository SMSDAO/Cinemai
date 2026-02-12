import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ModalProps as RNModalProps,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, radii } from '../../theme/tokens';

export interface ModalProps extends Omit<RNModalProps, 'visible'> {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'centered' | 'fullscreen';
  showCloseButton?: boolean;
  containerStyle?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  variant = 'centered',
  showCloseButton = true,
  containerStyle,
  ...modalProps
}) => {
  return (
    <RNModal
      visible={visible}
      transparent={variant === 'centered'}
      animationType={variant === 'centered' ? 'fade' : 'slide'}
      onRequestClose={onClose}
      {...modalProps}
    >
      <View style={[styles.overlay, variant === 'fullscreen' && styles.fullscreen]}>
        <View style={[styles.container, variant === 'fullscreen' && styles.fullscreenContainer, containerStyle]}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  fullscreen: {
    padding: 0,
  },
  container: {
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.xl,
    padding: spacing[6],
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: colors.glow.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  fullscreenContainer: {
    borderRadius: 0,
    maxWidth: undefined,
    maxHeight: undefined,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    flex: 1,
  },
  closeButton: {
    padding: spacing[2],
    marginLeft: spacing[4],
  },
  closeButtonText: {
    color: colors.text.secondary,
    fontSize: typography.size.xl,
    lineHeight: typography.size.xl,
  },
  content: {
    flex: 1,
  },
});

export default Modal;
