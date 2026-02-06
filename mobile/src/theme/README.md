# Neo Glow Design Tokens

This directory contains the official design tokens for the CinemAi Neo design system.

## Files

- **`tokens.ts`** - TypeScript/JavaScript design tokens for React Native
- **`tokens.json`** - JSON format for tooling integration
- **`README.md`** - This file

## Usage

### React Native Components

```typescript
import { theme } from './theme/tokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.primary,
    padding: theme.spacing[4],
    borderRadius: theme.radii.md,
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
  },
  button: {
    ...theme.components.button.primary,
  },
});
```

### Importing Individual Tokens

```typescript
import { colors, spacing, typography } from './theme/tokens';

const buttonStyle = {
  backgroundColor: colors.glow.primary,
  padding: spacing[4],
  fontSize: typography.size.md,
};
```

## Design Token Categories

### 🎨 Colors
- Background colors (primary, secondary)
- Text colors (primary, secondary, muted)
- Glow colors (primary, secondary, tertiary)
- Semantic colors (success, warning, error, info)
- Gradients

### ✍️ Typography
- Font families (primary, display)
- Font sizes (xs through display)
- Font weights (light through bold)

### 📏 Spacing
4-point grid system: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48

### 🟦 Radii
Border radius values: sm, md, lg, xl, full

### 🌟 Shadows
- Glow shadows (neon effects)
- Depth shadows (elevation)

### 🎞️ Motion
Animation timing values: fast, normal, slow, glowPulse

### ♿ Accessibility
Contrast ratios, touch targets, font scaling

## Component Tokens

Pre-configured tokens for common components:
- Buttons (primary, secondary)
- Cards
- Inputs
- Upload boxes
- Style picker chips

## Documentation

See `.github/ui-design-tokens.md` for complete documentation and Copilot instructions.
