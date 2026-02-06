# Neo Glow Design Tokens

Complete reference for the CinemAi Neo design token system.

## Overview

Neo Glow is a dark-themed, neon-inspired design system featuring:
- Dark backgrounds with cinematic depth
- Vibrant cyan and magenta glow accents
- Smooth animations and transitions
- Accessibility-first approach

## Color System

### Background Colors
```
bg.primary:   #05060A  // Main app background
bg.secondary: #0A0C12  // Cards, panels, modals
```

### Text Colors
```
text.primary:   #FFFFFF  // Main content
text.secondary: #A0A0B0  // Labels, secondary info
text.muted:     #6A6A7A  // Hints, placeholders
```

### Brand Glow Colors
```
glow.primary:   #00F0FF  // Cyan - primary actions
glow.secondary: #FF2EF5  // Magenta - highlights
glow.tertiary:  #6B4CFF  // Purple - accents
```

### Semantic Colors
```
success: #00FFAA  // Green
warning: #FFB800  // Amber
error:   #FF3B5C  // Red
info:    #00A8FF  // Blue
```

### Gradients
```
primary:   linear-gradient(135deg, #00F0FF 0%, #FF2EF5 100%)
secondary: linear-gradient(135deg, #6B4CFF 0%, #00F0FF 100%)
cardGlow:  radial-gradient(circle at top, rgba(0,240,255,0.25), transparent 70%)
```

## Typography

### Font Families
- **Primary**: Inter, SF Pro, Roboto (body text)
- **Display**: Space Grotesk, Inter (headings)

### Font Sizes
- xs: 12px (captions, small labels)
- sm: 14px (body text, buttons)
- md: 16px (default body)
- lg: 20px (subheadings)
- xl: 24px (headings)
- display: 32-48px (hero text)

### Font Weights
- light: 300
- regular: 400
- medium: 500
- semibold: 600
- bold: 700

## Spacing Scale

4-point grid system:
```
0:  0px
1:  4px   (tight spacing)
2:  8px   (compact spacing)
3:  12px  (small spacing)
4:  16px  (standard spacing)
5:  20px  (medium spacing)
6:  24px  (large spacing)
8:  32px  (extra large)
10: 40px  (section spacing)
12: 48px  (major sections)
```

## Border Radii

```
sm:   8px   (inputs)
md:   12px  (cards)
lg:   16px  (buttons)
xl:   24px  (modals)
full: 999px (pills, avatars)
```

## Shadows & Glows

### Glow Effects (Neon)
```
glow.primary:   0 0 12px rgba(0,240,255,0.6)
glow.secondary: 0 0 12px rgba(255,46,245,0.6)
glow.card:      0 0 24px rgba(0,240,255,0.15)
```

### Depth Shadows
```
shadow.sm: 0 2px 4px rgba(0,0,0,0.4)
shadow.md: 0 4px 8px rgba(0,0,0,0.45)
shadow.lg: 0 8px 16px rgba(0,0,0,0.5)
```

## Motion & Animations

### Timing
```
fast:      120ms  (button press, instant feedback)
normal:    200ms  (hover states, transitions)
slow:      350ms  (modal open/close)
glowPulse: 2.5s   (breathing neon effect)
```

### Glow Pulse Animation
```css
@keyframes glowPulse {
  0%   { box-shadow: 0 0 8px rgba(0,240,255,0.4); }
  50%  { box-shadow: 0 0 16px rgba(0,240,255,0.8); }
  100% { box-shadow: 0 0 8px rgba(0,240,255,0.4); }
}
```

## Component Patterns

### Primary Button
```
background: gradient.primary
radius: radius.lg (16px)
padding: space.4 space.6 (16px 24px)
fontSize: typography.size.md (16px)
fontWeight: typography.weight.semibold (600)
glow: glow.primary
```

### Secondary Button
```
background: color.bg.secondary
border: 1px solid color.glow.primary
glow: glow.card
```

### Card
```
background: color.bg.secondary
radius: radius.md (12px)
padding: space.5 (20px)
shadow: glow.card
```

### Input
```
background: #0A0C12
border: 1px solid #1A1C22
radius: radius.md (12px)
padding: space.4 (16px)
focus-border: color.glow.primary
focus-glow: glow.primary
```

### Upload Box
```
border: 2px dashed color.glow.primary
radius: radius.lg (16px)
padding: space.8 (32px)
icon: color.glow.primary
```

### Style Picker Chip
```
background: #0A0C12
border: 1px solid color.glow.secondary
radius: radius.full (999px)
padding: space.2 space.4 (8px 16px)
active-glow: glow.secondary
```

## Accessibility

### Contrast
- Minimum contrast ratio: 4.5:1
- All text meets WCAG AA standards

### Touch Targets
- Minimum size: 44x44px
- Adequate spacing between interactive elements

### Font Scaling
- Support system font scaling
- Min scale: 1.0x
- Max scale: 1.3x

### Motion
- Respect `prefers-reduced-motion`
- Disable glow pulse and heavy animations when requested

## Implementation

### React Native
```typescript
import { theme } from '@/theme/tokens';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.glow.primary,
    padding: theme.spacing[4],
    borderRadius: theme.radii.lg,
  },
});
```

### Web/CSS
```css
:root {
  --color-bg-primary: #05060A;
  --color-glow-primary: #00F0FF;
  --space-4: 16px;
  --radius-lg: 16px;
}

.button {
  background-color: var(--color-glow-primary);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

## Resources

- Design tokens source: `mobile/src/theme/tokens.ts`
- JSON format: `mobile/src/theme/tokens.json`
- Copilot instructions: `.github/ui-design-tokens.md`
