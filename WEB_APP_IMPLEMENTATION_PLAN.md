# Web App Implementation Plan

## Executive Summary

The CinemAi web app needs to be built from scratch to align with the mobile CinemAi Neo implementation and the backend APIs from PR #7. This document outlines the complete implementation plan.

**Current State:** Static HTML landing page  
**Target State:** Full-featured React web application with feature parity to mobile  
**Estimated Effort:** 4-6 weeks (30-40 days)  
**Tech Stack:** React + TypeScript + Vite + React Router + Axios

---

## Project Structure

```
web/
├── public/
│   └── assets/
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Toast/
│   │   ├── Avatar/
│   │   ├── Tabs/
│   │   ├── Skeleton/
│   │   └── TimelineEvent/
│   ├── pages/              # Route pages
│   │   ├── Landing/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Onboarding.tsx
│   │   ├── Dashboard/
│   │   ├── Timeline/
│   │   ├── Profile/
│   │   ├── Create/
│   │   │   ├── Production.tsx
│   │   │   └── Short.tsx
│   │   └── Admin/
│   │       ├── Dashboard.tsx
│   │       ├── Users.tsx
│   │       ├── Content.tsx
│   │       └── System.tsx
│   ├── layouts/            # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   ├── useTimeline.ts
│   │   └── useProfile.ts
│   ├── services/           # API services
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── timeline.service.ts
│   │   ├── production.service.ts
│   │   ├── shorts.service.ts
│   │   ├── profile.service.ts
│   │   └── admin.service.ts
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── guards/             # Route guards
│   │   ├── RequireAuth.tsx
│   │   ├── RequireAdmin.tsx
│   │   └── RequireOnboarded.tsx
│   ├── utils/              # Utility functions
│   ├── theme/              # Design tokens
│   │   └── tokens.ts
│   ├── types/              # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── .eslintrc.json
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

**Setup:**
```bash
# Create web directory
mkdir web && cd web

# Initialize Vite project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install react-router-dom axios clsx
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/react-router-dom

# Initialize Tailwind
npx tailwindcss init -p
```

**Design Tokens:**
```typescript
// src/theme/tokens.ts
export const tokens = {
  colors: {
    background: '#0A0A0F',
    surface: '#1A1A24',
    primary: '#00F0FF',    // Cyan
    accent: '#FF2EF5',     // Magenta
    secondary: '#6B4CFF',  // Purple
    success: '#00FF88',
    error: '#FF4444',
    warning: '#FFA500',
    text: {
      primary: '#FFFFFF',
      secondary: '#A3A3A3',
      tertiary: '#666666',
    }
  },
  typography: {
    fontFamily: {
      ui: 'Inter, system-ui, sans-serif',
      display: 'Space Grotesk, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '2rem',    // 32px
      '4xl': '2.5rem',  // 40px
      '5xl': '3rem',    // 48px
    }
  },
  spacing: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    glow: {
      primary: '0 0 20px rgba(0, 240, 255, 0.3)',
      accent: '0 0 20px rgba(255, 46, 245, 0.3)',
      secondary: '0 0 20px rgba(107, 76, 255, 0.3)',
    }
  }
};
```

---

### Phase 2: Core Components (Week 1-2)

**Button Component:**
```typescript
// src/components/Button/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        'button',
        `button-${variant}`,
        `button-${size}`,
        loading && 'button-loading',
        className
      )}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
```

**Input Component:**
```typescript
// src/components/Input/Input.tsx
interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  prefix,
  suffix,
  placeholder,
  disabled,
  required,
}) => {
  const Component = type === 'textarea' ? 'textarea' : 'input';
  
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}{required && ' *'}</label>}
      <div className={clsx('input-container', error && 'input-error')}>
        {prefix && <span className="input-prefix">{prefix}</span>}
        <Component
          type={type !== 'textarea' ? type : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="input-field"
        />
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>
      {error && <p className="input-error-text">{error}</p>}
      {helperText && !error && <p className="input-helper-text">{helperText}</p>}
    </div>
  );
};
```

**Additional Components:**
- Card (with Neo Glow effects)
- Modal (centered/fullscreen)
- Toast + ToastProvider
- Avatar (with fallback)
- Tabs (underline/segmented)
- Skeleton loaders
- TimelineEvent card

---

### Phase 3: Auth & State Management (Week 2)

**AuthContext:**
```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

interface User {
  id: string;
  email: string;
  name: string;
  handle: string;
  avatar?: string;
  role: 'user' | 'admin';
  onboarded: boolean;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOnboarded: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from token on mount
    const token = localStorage.getItem('token');
    if (token) {
      refresh();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await authService.login(email, password);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const signup = async (data: SignupData) => {
    const { token, user } = await authService.signup(data);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refresh = async () => {
    try {
      const user = await authService.me();
      setUser(user);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isOnboarded: user?.onboarded ?? false,
        loading,
        login,
        signup,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

**API Client:**
```typescript
// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

### Phase 4: Routing & Layout (Week 2)

**App Router:**
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { RequireAuth, RequireAdmin, RequireOnboarded } from './guards';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Pages
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Auth/Login';
import { SignupPage } from './pages/Auth/Signup';
import { OnboardingPage } from './pages/Auth/Onboarding';
import { DashboardPage } from './pages/Dashboard';
import { TimelinePage } from './pages/Timeline';
import { CreateProductionPage } from './pages/Create/Production';
import { CreateShortPage } from './pages/Create/Short';
import { ProfilePage } from './pages/Profile';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AdminUsers } from './pages/Admin/Users';
import { AdminContent } from './pages/Admin/Content';
import { AdminSystem } from './pages/Admin/System';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            
            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              {/* Onboarding - must complete before accessing main app */}
              <Route path="/onboarding" element={<OnboardingPage />} />
              
              {/* Main app - requires onboarding complete */}
              <Route element={<RequireOnboarded />}>
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/timeline" element={<TimelinePage />} />
                  <Route path="/productions/new" element={<CreateProductionPage />} />
                  <Route path="/shorts/new" element={<CreateShortPage />} />
                  <Route path="/profile/:handle" element={<ProfilePage />} />
                  
                  {/* Admin routes */}
                  <Route element={<RequireAdmin />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/content" element={<AdminContent />} />
                    <Route path="/admin/system" element={<AdminSystem />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

**Main Layout:**
```typescript
// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { TopNav } from '../components/Layout/TopNav';
import { Sidebar } from '../components/Layout/Sidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <TopNav />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
```

**Route Guards:**
```typescript
// src/guards/RequireAuth.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RequireAuth: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <Outlet />;
};

// src/guards/RequireOnboarded.tsx
export const RequireOnboarded: React.FC = () => {
  const { isOnboarded, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (!isOnboarded) return <Navigate to="/onboarding" />;
  
  return <Outlet />;
};

// src/guards/RequireAdmin.tsx
export const RequireAdmin: React.FC = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) return <Navigate to="/dashboard" />;
  
  return <Outlet />;
};
```

---

### Phase 5-10: Page Implementation

See full implementation plan for detailed code examples for:
- Dashboard Page (Week 3)
- Timeline Page (Week 3)
- Create Pages (Week 4)
- Profile Page (Week 4)
- Admin Pages (Week 5)
- Testing & Deployment (Week 6)

---

## Backend API Endpoints

### Auth
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout user

### Dashboard
- `GET /dashboard` - Get dashboard data
- `GET /users/me/stats` - Get user statistics

### Timeline
- `GET /timeline/me?limit=20&offset=0` - User timeline
- `GET /timeline/following?limit=20&offset=0` - Following timeline
- `GET /timeline/global?limit=20&offset=0` - Global timeline

### Productions
- `GET /cinema/productions` - List productions
- `POST /cinema/productions` - Create production
- `GET /cinema/productions/:id` - Get production details
- `PUT /cinema/productions/:id/status` - Update production status

### Shorts
- `GET /shorts` - List shorts
- `POST /shorts` - Create short
- `GET /shorts/:id` - Get short details
- `PUT /shorts/:id/status` - Update short status

### Profile
- `GET /users/:handle` - Get user profile
- `PUT /users/me` - Update current user profile
- `POST /users/:id/follow` - Follow user
- `DELETE /users/:id/follow` - Unfollow user

### Admin
- `GET /admin/dashboard` - Admin dashboard stats
- `GET /admin/users?page=1&limit=20` - List users
- `GET /admin/users/:id` - Get user details
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user
- `GET /admin/analytics` - System analytics
- `GET /admin/health` - System health

---

## Component Mapping: Mobile → Web

| Mobile Component | Web Equivalent | Priority |
|------------------|----------------|----------|
| NeoGlowButton | Button | Critical |
| Input | Input | Critical |
| NeoGlowCard | Card | Critical |
| Modal | Modal | High |
| Toast/ToastContext | Toast/ToastProvider | High |
| Avatar | Avatar | High |
| Tabs | Tabs | High |
| Skeleton | Skeleton | Medium |
| TimelineEvent | TimelineEvent | High |

| Mobile Screen | Web Page | Route | Priority |
|---------------|----------|-------|----------|
| LoginScreen | LoginPage | /login | Critical |
| SignupScreen | SignupPage | /signup | Critical |
| OnboardingScreen | OnboardingPage | /onboarding | Critical |
| HomeScreen | DashboardPage | /dashboard | Critical |
| TimelineScreen | TimelinePage | /timeline | High |
| CreateScreen | CreatePages | /productions/new, /shorts/new | High |
| ProfileScreen | ProfilePage | /profile/:handle | Medium |
| AdminScreen | AdminPages | /admin/* | Medium |

---

## Timeline & Estimates

| Phase | Duration | Priority | Dependencies |
|-------|----------|----------|--------------|
| Phase 1: Foundation | 3-4 days | Critical | None |
| Phase 2: Components | 5-7 days | Critical | Phase 1 |
| Phase 3: Auth & State | 3-4 days | Critical | Phase 2 |
| Phase 4: Routing & Layout | 2-3 days | Critical | Phase 3 |
| Phase 5: Dashboard | 3-4 days | High | Phase 4 |
| Phase 6: Timeline | 3-4 days | High | Phase 4 |
| Phase 7: Create Pages | 3-4 days | High | Phase 4 |
| Phase 8: Profile | 2-3 days | Medium | Phase 4 |
| Phase 9: Admin | 4-5 days | Medium | Phase 4 |
| Phase 10: Testing & Deploy | 3-4 days | High | All phases |
| **Total** | **30-40 days** | | |

---

## Success Criteria

### Functional Parity
✅ All mobile features available on web  
✅ Consistent data display between mobile and web  
✅ Same user flows and navigation patterns  

### Technical Quality
✅ TypeScript strict mode with no errors  
✅ ESLint passing with zero warnings  
✅ Component test coverage >70%  
✅ All pages responsive (mobile, tablet, desktop)  

### User Experience
✅ Neo Glow design system consistently applied  
✅ Loading states for all async operations  
✅ Error handling and recovery  
✅ Smooth animations and transitions  
✅ Keyboard navigation and ARIA labels  

### Backend Integration
✅ All PR #7 endpoints consumed correctly  
✅ No backend changes required  
✅ Proper JWT token handling  
✅ API error handling and retry logic  

---

## Next Steps

1. **Week 1**: Set up project foundation and create design system
2. **Week 2**: Build core components and auth system
3. **Week 3**: Implement Dashboard and Timeline pages
4. **Week 4**: Build Create flows and Profile page
5. **Week 5**: Implement Admin dashboard
6. **Week 6**: Testing, optimization, and deployment

---

## Notes

- **No Backend Changes**: This implementation uses only existing PR #7 endpoints
- **Mobile Parity**: Components and flows mirror mobile implementation
- **Progressive Enhancement**: Can be built and deployed incrementally
- **Scalable Architecture**: Easy to add new features and pages

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-12  
**Status:** Planning Phase
