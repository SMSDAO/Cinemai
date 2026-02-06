# GitHub Copilot — UI Design Tokens Instructions (CinemAi Neo)

You are GitHub Copilot working on the **CinemAi Neo** design system.

Your job is to generate UI code (React Native, React, CSS, Tailwind, design tokens, component styles) that strictly follows the **Neo Glow** design tokens defined below.

These tokens are the **official, canonical design system** for:
- Mobile app
- Web dashboard
- Marketing surfaces

Always prefer using these tokens over hard‑coded values.

---

## 🎨 Color Tokens

### Core Colors
- `color.bg.primary` = `#05060A`  // App background  
- `color.bg.secondary` = `#0A0C12`  // Cards, modals  
- `color.text.primary` = `#FFFFFF`  // Main text  
- `color.text.secondary` = `#A0A0B0`  // Subtext, labels  
- `color.text.muted` = `#6A6A7A`  // Hints, placeholders  

### Brand Glow Colors
- `color.glow.primary` = `#00F0FF`  // Buttons, accents  
- `color.glow.secondary` = `#FF2EF5`  // Highlights, active states  
- `color.glow.tertiary` = `#6B4CFF`  // Secondary accents  

### Semantic Colors
- `color.success` = `#00FFAA`  
- `color.warning` = `#FFB800`  
- `color.error` = `#FF3B5C`  
- `color.info` = `#00A8FF`  

### Gradients
- `gradient.primary` = `linear-gradient(135deg, #00F0FF 0%, #FF2EF5 100%)`  
- `gradient.secondary` = `linear-gradient(135deg, #6B4CFF 0%, #00F0FF 100%)`  
- `gradient.cardGlow` = `radial-gradient(circle at top, rgba(0,240,255,0.25), transparent 70%)`  

---

## ✍️ Typography Tokens

### Font Families
- `font.family.primary` = `"Inter", "SF Pro", "Roboto", sans-serif`  
- `font.family.display` = `"Space Grotesk", "Inter", sans-serif`  

### Font Sizes
- `font.size.xs` = `12px`  
- `font.size.sm` = `14px`  
- `font.size.md` = `16px`  
- `font.size.lg` = `20px`  
- `font.size.xl` = `24px`  
- `font.size.display` = `32–48px`  

### Font Weights
- `font.weight.light` = `300`  
- `font.weight.regular` = `400`  
- `font.weight.medium` = `500`  
- `font.weight.semibold` = `600`  
- `font.weight.bold` = `700`  

---

## 📏 Spacing Tokens (4‑point grid)

- `space.0` = `0px`  
- `space.1` = `4px`  
- `space.2` = `8px`  
- `space.3` = `12px`  
- `space.4` = `16px`  
- `space.5` = `20px`  
- `space.6` = `24px`  
- `space.8` = `32px`  
- `space.10` = `40px`  
- `space.12` = `48px`  

---

## 🟦 Radii & Shape Tokens

- `radius.sm` = `8px`   // Inputs  
- `radius.md` = `12px`  // Cards  
- `radius.lg` = `16px`  // Buttons  
- `radius.xl` = `24px`  // Modals  
- `radius.full` = `999px`  // Pills, avatars  

---

## 🌟 Shadow & Glow Tokens

### Glow Shadows
- `glow.primary` = `0 0 12px rgba(0,240,255,0.6)`  
- `glow.secondary` = `0 0 12px rgba(255,46,245,0.6)`  
- `glow.card` = `0 0 24px rgba(0,240,255,0.15)`  

### Depth Shadows
- `shadow.sm` = `0 2px 4px rgba(0,0,0,0.4)`  
- `shadow.md` = `0 4px 8px rgba(0,0,0,0.45)`  
- `shadow.lg` = `0 8px 16px rgba(0,0,0,0.5)`  

---

## 🧩 Component Tokens

### Buttons
- `button.primary`  
  - `background`: `gradient.primary`  
  - `radius`: `radius.lg`  
  - `padding`: `space.4 space.6`  
  - `text`: `font.size.md`, `font.weight.semibold`  
  - `glow`: `glow.primary`  

- `button.secondary`  
  - `background`: `color.bg.secondary`  
  - `border`: `1px solid color.glow.primary`  
  - `glow`: `glow.card`  

### Cards
- `card.default`  
  - `background`: `color.bg.secondary`  
  - `radius`: `radius.md`  
  - `padding`: `space.5`  
  - `shadow`: `glow.card`  

### Inputs
- `input.default`  
  - `background`: `#0A0C12`  
  - `border`: `1px solid #1A1C22`  
  - `radius`: `radius.md`  
  - `padding`: `space.4`  
  - `focus-border`: `color.glow.primary`  
  - `focus-glow`: `glow.primary`  

### Upload Box
- `upload.box`  
  - `border`: `2px dashed color.glow.primary`  
  - `radius`: `radius.lg`  
  - `padding`: `space.8`  
  - `icon`: `glow.primary`  

### Style Picker Chips
- `chip.style`  
  - `background`: `#0A0C12`  
  - `border`: `1px solid color.glow.secondary`  
  - `radius`: `radius.full`  
  - `padding`: `space.2 space.4`  
  - `glow`: `glow.secondary` (on active)  

---

## 🎞️ Motion & Animation Tokens

- `motion.fast` = `120ms`   // Button press  
- `motion.normal` = `200ms` // Card hover  
- `motion.slow` = `350ms`  // Modal fade  
- `motion.glowPulse` = `2.5s infinite`  // Neon breathing effect  

Glow pulse keyframes (conceptual):

- `0%`   → `box-shadow: 0 0 8px rgba(0,240,255,0.4)`  
- `50%`  → `box-shadow: 0 0 16px rgba(0,240,255,0.8)`  
- `100%` → `box-shadow: 0 0 8px rgba(0,240,255,0.4)`  

When generating animations, follow this pattern.

---

## ♿ Accessibility Tokens

- `contrast.minimum` = `4.5:1`  
- `touch.target.min` = `44px`  
- `font.scale.min` = `1.0`  
- `font.scale.max` = `1.3`  
- `motion.reduce` = disable `motion.glowPulse` and heavy animations  

---

## HOW COPILOT SHOULD USE THIS

- Never hard‑code colors, spacing, radii, or typography when a token exists.  
- Prefer **token‑driven styles** (e.g. theme objects, Tailwind config, design‑tokens JSON).  
- When creating new components, wire them to these tokens by default.  
- When unsure, choose values that align with this system rather than inventing new ones.

This is the **official high‑fidelity design token system** for CinemAi Neo.  
All UI code should align with it.
