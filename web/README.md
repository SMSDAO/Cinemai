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

**Required:** Create a `.env` file based on `.env.example`:

```bash
# Backend API URL (REQUIRED)
VITE_API_URL=http://localhost:3000
```

⚠️ **Important:** The application will fail to start if `VITE_API_URL` is not set. This must point to your backend API server.

**Examples:**
- Local development: `http://localhost:3000`
- Production: `https://api.cinemai.example.com`

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

- `/` - Landing page with Neo Glow hero
- `/login` - Email + password authentication
- `/signup` - User registration
- `/dashboard` - User stats, recent content, timeline preview
- `/timeline` - 3-tab timeline (You/Following/Global)
- `/profile` - User profile with stats and activity
- `/create` - Create productions and shorts
- `/admin` - Admin dashboard (requires ADMIN role)

## Features

### ✅ Implemented

- **Landing Page**: Neo Glow hero section with CTAs
- **Auth Flow**: Login/Signup with JWT token, route guards
- **Dashboard**: Real-time stats, recent productions/shorts, timeline preview
- **Timeline**: 3 tabs with pagination (You, Following, Global)
- **Profile**: User avatar, stats, activity
- **Create**: Production and short creation forms
- **Admin**: Admin dashboard with Users/Content/System tabs (role-based access)
- **Responsive**: Mobile-first design, works on all screen sizes
- **Neo Glow Design**: Matches mobile app aesthetics

### 📋 Not Implemented (Future)

- Onboarding flow (handle/avatar/interests)
- Profile routing by handle (`/profile/:handle`)
- Production/Short detail pages with video player
- Social features (follow, like, comment)
- File upload (images/videos)
- Search functionality
- Notifications system
- User settings
- Password reset flow

## Backend Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | User authentication |
| `/auth/signup` | POST | User registration |
| `/users/me` | GET | Current user data |
| `/users/me/stats` | GET | User statistics |
| `/timeline/me` | GET | User timeline |
| `/timeline/following` | GET | Following timeline |
| `/timeline/global` | GET | Global timeline |
| `/cinema/productions` | GET | Recent productions |
| `/cinema/productions` | POST | Create production |
| `/shorts` | GET | Recent shorts |
| `/shorts` | POST | Create short |
| `/admin/users` | GET | List all users (admin) |
| `/admin/dashboard` | GET | System stats (admin) |

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

- Total: 28 files (including config)
- Components: 4 (Button, Input, Card, Tabs)
- Pages: 8 (Landing, Login, Signup, Dashboard, Timeline, Profile, Create, Admin)
- Services: 1

### Bundle Size

- JavaScript: 226KB (73KB gzipped)
- CSS: 3.7KB (1.2KB gzipped)

### Build

```bash
npm run build
# Output: web/dist/
```

## Deployment

> **Note**: This `web/` folder is a minimal legacy implementation. The primary web application is `app-nextjs/`, which is deployed to Vercel via root `vercel.json`.

For development use only:

```bash
npm run build
# Output: web/dist/
```

## License

See root LICENSE file
