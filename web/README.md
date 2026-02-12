# CinemAi Neo - Web App

Minimal web application that mirrors the mobile CinemAi Neo implementation using the PR #7 backend APIs.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
web/
├── src/
│   ├── components/       # 3 components (Button, Input, Card)
│   ├── pages/           # 5 pages (Login, Dashboard, Timeline, Profile, Create)
│   ├── services/        # API client
│   ├── App.tsx          # Router + layout
│   ├── AuthContext.tsx  # Auth state
│   ├── types.ts         # TypeScript types
│   ├── styles.css       # Global styles (Neo Glow theme)
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Routes

- `/login` - Email + password authentication
- `/dashboard` - User stats, recent content, timeline preview
- `/timeline` - 3-tab timeline (You/Following/Global)
- `/profile` - User profile with stats and activity
- `/create` - Create productions and shorts

## Features

### ✅ Implemented

- **Auth Flow**: Login with JWT token, route guards
- **Dashboard**: Real-time stats, recent productions/shorts, timeline preview
- **Timeline**: 3 tabs with pagination (You, Following, Global)
- **Profile**: User avatar, stats, activity
- **Create**: Production and short creation forms
- **Responsive**: Mobile-first design, works on all screen sizes
- **Neo Glow Design**: Matches mobile app aesthetics

### 📋 Not Implemented (Future)

- Signup page
- Onboarding flow
- Admin dashboard
- Profile routing by handle
- Video player
- Social features (follow, like, comment)
- File upload
- Search
- Notifications
- Settings

## Backend Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User authentication |
| `/users/me` | GET | Current user data |
| `/users/me/stats` | GET | User statistics |
| `/timeline/me` | GET | User timeline |
| `/timeline/following` | GET | Following timeline |
| `/timeline/global` | GET | Global timeline |
| `/cinema/productions` | GET | Recent productions |
| `/cinema/productions` | POST | Create production |
| `/shorts` | GET | Recent shorts |
| `/shorts` | POST | Create short |

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **No CSS framework** - Pure CSS with Neo Glow theme

## Design System

### Colors

```css
Background: #0A0A0F
Surface: #1A1A24
Primary: #00F0FF (cyan glow)
Accent: #FF2EF5 (magenta)
Secondary: #6B4CFF (purple)
Error: #FF4444
```

### Typography

- Font: Inter, system fallbacks
- Sizes: 0.875rem - 2rem
- Weights: 400, 500, 600, 700

## Development

### File Count

- Total: 20 files (including config)
- Components: 3
- Pages: 5
- Services: 1

### Bundle Size

- JavaScript: 215KB
- CSS: 3.7KB

### Build

```bash
npm run build
# Output: web/dist/
```

## Deployment

Configured for Vercel deployment via root `vercel.json`:

```json
{
  "buildCommand": "cd web && npm install && npm run build",
  "outputDirectory": "web/dist"
}
```

## License

See root LICENSE file
