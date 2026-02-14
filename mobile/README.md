# CinemAi Neo Mobile App

React Native mobile application for CinemAi Neo - AI-powered production studio.

## 🏗️ Architecture

The mobile app follows the architecture defined in `/ARCHITECTURE.md`.

### Structure

```
mobile/src/
├── screens/          # All app screens
│   ├── Home/
│   ├── Cinema/
│   │   ├── Simple/   # Quick photo + script
│   │   └── Pro/      # Advanced controls
│   ├── Shorts/       # Short-form content
│   ├── Growth/       # Social publishing
│   ├── BrandKit/     # Brand identity
│   ├── Billing/      # Trips & subscriptions
│   └── Account/      # User settings
├── components/       # Reusable UI components
│   ├── NeoGlowButton/
│   ├── NeoGlowCard/
│   ├── UploadBox/
│   ├── StylePicker/
│   ├── Timeline/
│   ├── CaptionPreview/
│   └── AnalyticsCharts/
├── navigation/       # Navigation setup
│   ├── AppNavigator.tsx
│   ├── TabNavigator.tsx
│   ├── CinemaNavigator.tsx
│   └── types.ts
├── context/          # Global state
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── AppContext.tsx
├── hooks/            # Custom React hooks
│   ├── useAuth.ts
│   ├── useProductions.ts
│   ├── useShorts.ts
│   ├── useAnalytics.ts
│   └── useBrandKit.ts
├── services/         # API service layer
│   ├── api.ts
│   ├── auth.service.ts
│   ├── cinema.service.ts
│   ├── shorts.service.ts
│   ├── growth.service.ts
│   ├── billing.service.ts
│   └── brandkit.service.ts
└── theme/            # Design system
    └── tokens.ts     # Neo Glow design tokens
```

## 🎨 Design System

Neo Glow design system with:
- Dark theme (#05060A, #0A0C12)
- Cyan primary glow (#00F0FF)
- Magenta secondary glow (#FF2EF5)
- Purple tertiary (#6B4CFF)
- Typography: Inter, Space Grotesk
- 4-point spacing grid
- Accessibility-first (WCAG AA)

## 📦 Key Features

### Cinema
- Quick mode: Photo + script upload
- Pro mode: Advanced controls, style selection
- Multi-scene video generation
- Voiceover synthesis
- Background music

### Shorts
- AI hook generator
- Multiple variants for A/B testing
- Caption engine with styling
- Multi-format export (9:16, 1:1, 16:9)
- Brand kit integration

### Growth
- Publish to TikTok, Instagram, YouTube, X
- Schedule posts
- Analytics dashboard
- Performance insights

### Billing
- $1 trips (pay-as-you-go)
- $49/month Pro subscription
- Trip packages with discounts

### Brand Kit
- Logo management
- Color palette
- Font family selection
- Reusable across all content

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0
- React Native CLI
- iOS: Xcode 14+
- Android: Android Studio

### Install Dependencies
```bash
npm install

# iOS only
cd ios && pod install && cd ..
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Start Metro
```bash
npm start
```

### Lint & Format
```bash
npm run lint
npm run format
```

## 📦 Tech Stack

- React Native
- TypeScript
- React Navigation
- Axios (for API calls)

## 🔌 API Integration

The app connects to the backend API at `http://localhost:3000/api` (configurable via environment variables).

All API calls use:
- Axios for HTTP requests
- JWT authentication
- Automatic token refresh
- Error handling
- Request/response interceptors

## 📱 Navigation

- **Tab Navigation**: Home, Cinema, Shorts, Growth, Account
- **Stack Navigation**: Cinema (Simple, Pro, Detail)
- **Deep Linking**: Support for production/short URLs

## 🧪 Testing

```bash
npm test
```

## 📄 License

Proprietary - CinemAi Neo

---

**Version**: 1.0.0
**Last Updated**: 2026-02-07
