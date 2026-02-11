/**
 * Neo Glow Design Tokens
 * Official design system for CinemAi Neo
 *
 * @see .github/ui-design-tokens.md for full documentation
 */

export const colors = {
  bg: {
    primary: '#05060A',
    secondary: '#0A0C12',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0B0',
    muted: '#6A6A7A',
  },
  glow: {
    primary: '#00F0FF',
    secondary: '#FF2EF5',
    tertiary: '#6B4CFF',
  },
  semantic: {
    success: '#00FFAA',
    warning: '#FFB800',
    error: '#FF3B5C',
    info: '#00A8FF',
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #00F0FF 0%, #FF2EF5 100%)',
  secondary: 'linear-gradient(135deg, #6B4CFF 0%, #00F0FF 100%)',
  cardGlow: 'radial-gradient(circle at top, rgba(0,240,255,0.25), transparent 70%)',
};

export const typography = {
  family: {
    primary: '"Inter", "SF Pro", "Roboto", sans-serif',
    display: '"Space Grotesk", "Inter", sans-serif',
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    display: 32,
  },
  weight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  glow: {
    primary: '0 0 12px rgba(0,240,255,0.6)',
    secondary: '0 0 12px rgba(255,46,245,0.6)',
    card: '0 0 24px rgba(0,240,255,0.15)',
  },
  depth: {
    sm: '0 2px 4px rgba(0,0,0,0.4)',
    md: '0 4px 8px rgba(0,0,0,0.45)',
    lg: '0 8px 16px rgba(0,0,0,0.5)',
  },
};

export const motion = {
  fast: 120,
  normal: 200,
  slow: 350,
  glowPulse: 2500,
};

export const accessibility = {
  contrast: {
    minimum: 4.5,
  },
  touch: {
    targetMin: 44,
  },
  font: {
    scaleMin: 1.0,
    scaleMax: 1.3,
  },
};

// Component-specific tokens
export const components = {
  button: {
    primary: {
      background: gradients.primary,
      radius: radii.lg,
      padding: `${spacing[4]}px ${spacing[6]}px`,
      fontSize: typography.size.md,
      fontWeight: typography.weight.semibold,
      glow: shadows.glow.primary,
    },
    secondary: {
      background: colors.bg.secondary,
      border: `1px solid ${colors.glow.primary}`,
      glow: shadows.glow.card,
    },
  },
  card: {
    default: {
      background: colors.bg.secondary,
      radius: radii.md,
      padding: spacing[5],
      shadow: shadows.glow.card,
    },
  },
  input: {
    default: {
      background: '#0A0C12',
      border: '1px solid #1A1C22',
      radius: radii.md,
      padding: spacing[4],
      focusBorder: colors.glow.primary,
      focusGlow: shadows.glow.primary,
    },
  },
  upload: {
    box: {
      border: `2px dashed ${colors.glow.primary}`,
      radius: radii.lg,
      padding: spacing[8],
      icon: colors.glow.primary,
    },
  },
  chip: {
    style: {
      background: '#0A0C12',
      border: `1px solid ${colors.glow.secondary}`,
      radius: radii.full,
      padding: `${spacing[2]}px ${spacing[4]}px`,
      activeGlow: shadows.glow.secondary,
    },
  },
};

export const theme = {
  colors,
  gradients,
  typography,
  spacing,
  radii,
  shadows,
  motion,
  accessibility,
  components,
};

export default theme;
