# Mobile App Structure

```
mobile/src/
├── App.tsx                              # Root component with providers
│
├── components/                          # 7 Neo Glow components
│   ├── AnalyticsCharts/
│   │   └── AnalyticsCharts.tsx         # Performance metrics
│   ├── CaptionPreview/
│   │   └── CaptionPreview.tsx          # Caption styling preview
│   ├── NeoGlowButton/
│   │   └── NeoGlowButton.tsx           # Primary/secondary buttons
│   ├── NeoGlowCard/
│   │   └── NeoGlowCard.tsx             # Glowing card container
│   ├── StylePicker/
│   │   └── StylePicker.tsx             # Cinematic style selector
│   ├── Timeline/
│   │   └── Timeline.tsx                # Production progress
│   ├── UploadBox/
│   │   └── UploadBox.tsx               # File upload interface
│   └── index.ts                         # Component exports
│
├── context/                             # 3 Context providers
│   ├── AppContext.tsx                   # Global app state
│   ├── AuthContext.tsx                  # Authentication state
│   └── ThemeContext.tsx                 # Theme management
│
├── hooks/                               # 5 Custom hooks
│   ├── useAnalytics.ts                  # Analytics data
│   ├── useAuth.ts                       # Auth helper
│   ├── useBrandKit.ts                   # Brand kit CRUD
│   ├── useProductions.ts                # Cinema productions
│   ├── useShorts.ts                     # Shorts management
│   └── index.ts                         # Hook exports
│
├── navigation/                          # Navigation setup
│   ├── AppNavigator.tsx                 # Root navigator
│   ├── CinemaNavigator.tsx              # Cinema stack
│   ├── TabNavigator.tsx                 # Bottom tabs
│   └── types.ts                         # Type definitions
│
├── screens/                             # 8 Main screens
│   ├── Account/
│   │   └── AccountScreen.tsx           # Profile & settings
│   ├── Billing/
│   │   └── BillingScreen.tsx           # Trips & subscriptions
│   ├── BrandKit/
│   │   └── BrandKitScreen.tsx          # Brand identity
│   ├── Cinema/
│   │   ├── Pro/
│   │   │   └── CinemaProScreen.tsx     # Advanced controls
│   │   └── Simple/
│   │       └── CinemaSimpleScreen.tsx  # Quick mode
│   ├── Growth/
│   │   └── GrowthScreen.tsx            # Social publishing
│   ├── Home/
│   │   └── HomeScreen.tsx              # Dashboard
│   └── Shorts/
│       └── ShortsScreen.tsx            # Short-form content
│
├── services/                            # 7 API services
│   ├── api.ts                           # Axios client
│   ├── auth.service.ts                  # Authentication
│   ├── billing.service.ts               # Payments
│   ├── brandkit.service.ts              # Brand kits
│   ├── cinema.service.ts                # Productions
│   ├── growth.service.ts                # Social media
│   ├── shorts.service.ts                # Shorts
│   └── index.ts                         # Service exports
│
└── theme/
    └── tokens.ts                        # Neo Glow design tokens
```

## File Count

- **Screens**: 8
- **Components**: 7
- **Hooks**: 5
- **Services**: 7
- **Context Providers**: 3
- **Navigation**: 4
- **Total**: 41 files

## Design System

All components use Neo Glow tokens:
- Dark backgrounds: #05060A, #0A0C12
- Cyan glow: #00F0FF
- Magenta glow: #FF2EF5
- Purple glow: #6B4CFF
- Typography: Inter, Space Grotesk
- 4pt spacing grid
- WCAG AA compliant
