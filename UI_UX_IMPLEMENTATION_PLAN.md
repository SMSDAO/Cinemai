# CinemAi Neo — Full UI/UX Implementation Plan

## Executive Summary

This document outlines the complete implementation plan for the CinemAi Neo frontend system as specified in the comprehensive checklist. The implementation is organized into phases to ensure systematic delivery of features while maintaining code quality and consistency with the Neo Glow design system.

## Current State (✅ Complete)

### Backend API
- ✅ All 13 controllers and 13 services registered
- ✅ User profiles with stats, timeline events, dashboard analytics
- ✅ Atomic transactions for data consistency
- ✅ Query parameter validation
- ✅ Cursor-based pagination in SyncService
- ✅ Composite database indexes
- ✅ 46/46 tests passing

### Mobile App Foundation
- ✅ React Native scaffolding
- ✅ Design tokens (Neo Glow theme)
- ✅ 7 core components (NeoGlowButton, NeoGlowCard, UploadBox, StylePicker, CaptionPreview, Timeline, AnalyticsCharts)
- ✅ 3 context providers (Auth, Theme, App)
- ✅ 7 API services
- ✅ Navigation structure
- ✅ 8 basic screens

---

## Phase 1: Global UI System Foundation (Week 1)

### 1.1 Design System Enhancement
**Priority: CRITICAL**
**Estimated: 2-3 days**

- [ ] Audit and validate all design tokens match `.github/ui-design-tokens.md`
- [ ] Create utility functions for applying tokens consistently
- [ ] Document component usage guidelines
- [ ] Create Storybook/design documentation (if applicable)

### 1.2 Global Components Library
**Priority: CRITICAL**
**Estimated: 3-4 days**

Missing components needed across the app:

**Input Components:**
- [ ] TextInput (single-line)
- [ ] TextArea (multi-line)
- [ ] Select/Dropdown
- [ ] FileInput (enhance existing UploadBox)
- [ ] Checkbox
- [ ] Radio buttons
- [ ] Toggle/Switch

**Feedback Components:**
- [ ] Modal (centered, full-screen variants)
- [ ] Toast/Snackbar notifications
- [ ] Alert/Banner
- [ ] Loading spinner
- [ ] Skeleton loader
- [ ] Progress bar
- [ ] Empty state

**Layout Components:**
- [ ] Container (max-width wrapper)
- [ ] Grid system
- [ ] Stack (vertical/horizontal spacing)
- [ ] Divider

**UI Elements:**
- [ ] Avatar (with fallback initials)
- [ ] Badge/Chip (enhance existing)
- [ ] Tabs component
- [ ] Segmented control
- [ ] Dropdown menu
- [ ] Tooltip
- [ ] Accordion/Collapsible

**Expected Output:**
- `mobile/src/components/Input/` directory with all input variants
- `mobile/src/components/Modal/Modal.tsx`
- `mobile/src/components/Toast/Toast.tsx` + ToastProvider context
- `mobile/src/components/Skeleton/Skeleton.tsx`
- `mobile/src/components/Avatar/Avatar.tsx`
- `mobile/src/components/Tabs/Tabs.tsx`
- All components with TypeScript types, tests, and examples

---

## Phase 2: Authentication & Onboarding (Week 1-2)

### 2.1 Login & Signup
**Priority: CRITICAL**
**Estimated: 2 days**

- [ ] Enhanced Login screen
  - [ ] Email + password form with validation
  - [ ] "Continue with Google" button (OAuth placeholder)
  - [ ] Error states with Toast notifications
  - [ ] "Forgot password" link
  - [ ] Loading states

- [ ] Signup screen (Free tier)
  - [ ] Name, email, password fields
  - [ ] Password strength indicator
  - [ ] Terms & Privacy checkbox
  - [ ] Auto-create user profile on backend
  - [ ] Redirect to onboarding

### 2.2 Onboarding Flow
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Welcome screen
- [ ] Username/handle selection
  - [ ] Real-time availability check
  - [ ] Handle validation (@username format)
- [ ] Avatar upload
  - [ ] Photo picker integration
  - [ ] Crop/resize functionality
  - [ ] Default avatar generation (initials)
- [ ] Interest selection (optional)
  - [ ] Multi-select chips
  - [ ] Categories: Cinema, Shorts, Marketing, etc.
- [ ] Completion screen with CTA to dashboard

**Expected Output:**
- `mobile/src/screens/Auth/LoginScreen.tsx` (enhanced)
- `mobile/src/screens/Auth/SignupScreen.tsx` (new)
- `mobile/src/screens/Onboarding/WelcomeScreen.tsx` (new)
- `mobile/src/screens/Onboarding/HandleScreen.tsx` (new)
- `mobile/src/screens/Onboarding/AvatarScreen.tsx` (new)
- `mobile/src/screens/Onboarding/InterestsScreen.tsx` (new)
- Navigation flow in `mobile/src/navigation/AuthNavigator.tsx`

---

## Phase 3: Enhanced Dashboard (Week 2)

### 3.1 Dashboard Header
**Priority: HIGH**
**Estimated: 1 day**

- [ ] User avatar with dropdown menu
- [ ] Points/XP summary display
- [ ] Notifications bell icon (count badge)
- [ ] Quick actions:
  - [ ] "Create Production" button
  - [ ] "Create Short" button

### 3.2 Dashboard Content
**Priority: HIGH**
**Estimated: 2-3 days**

- [ ] Stats cards section
  - [ ] Productions count
  - [ ] Shorts count
  - [ ] Likes received
  - [ ] Followers count
  
- [ ] Recent productions list
  - [ ] Thumbnail, title, status
  - [ ] Navigate to detail on tap

- [ ] Recent shorts list
  - [ ] Thumbnail, title, status
  - [ ] Navigate to detail on tap

- [ ] Timeline preview (last 5 events)
  - [ ] "View all" link to Timeline screen

- [ ] Widgets
  - [ ] XP/points progress bar
  - [ ] Quest progress (mock for now)
  - [ ] Sync status indicator

**Expected Output:**
- Enhanced `mobile/src/screens/Home/HomeScreen.tsx`
- `mobile/src/components/StatsCard/StatsCard.tsx`
- `mobile/src/components/ProductionCard/ProductionCard.tsx`
- `mobile/src/components/ShortCard/ShortCard.tsx`
- `mobile/src/components/TimelinePreview/TimelinePreview.tsx`
- `mobile/src/hooks/useDashboard.ts`

---

## Phase 4: Timeline System (Week 2-3)

### 4.1 Timeline Views
**Priority: HIGH**
**Estimated: 3 days**

- [ ] User timeline screen (own events)
- [ ] Following timeline screen (followed users' events)
- [ ] Global timeline screen (all public events)
- [ ] Tab navigation between views

### 4.2 Timeline Event Cards
**Priority: HIGH**
**Estimated: 2 days**

Event types to support:
- [ ] PRODUCTION_CREATED (🎬 icon)
- [ ] PRODUCTION_COMPLETED (✅ icon)
- [ ] SHORT_CREATED (🎞️ icon)
- [ ] SHORT_COMPLETED (✅ icon)
- [ ] POST_PUBLISHED (📢 icon)
- [ ] USER_FOLLOWED (👥 icon)
- [ ] CONTENT_LIKED (❤️ icon)

Each card displays:
- [ ] User avatar
- [ ] User name & handle
- [ ] Event timestamp (relative: "2h ago")
- [ ] Event action text
- [ ] Content preview (if applicable)
- [ ] Action buttons (like, share)

### 4.3 Timeline Features
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Pull-to-refresh
- [ ] Infinite scroll / Load more pagination
- [ ] Loading states (skeleton cards)
- [ ] Empty states ("No events yet")
- [ ] Error handling

**Expected Output:**
- `mobile/src/screens/Timeline/TimelineScreen.tsx`
- `mobile/src/components/TimelineEvent/TimelineEventCard.tsx`
- `mobile/src/hooks/useTimeline.ts`
- `mobile/src/services/timeline.service.ts`

---

## Phase 5: Productions Workflow (Week 3)

### 5.1 Create Production
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Enhanced form with validation
- [ ] Title input (required)
- [ ] Script textarea (required, with character count)
- [ ] Style selector (chips with previews)
- [ ] Photo upload (with preview)
- [ ] Submit button with loading state
- [ ] Success toast → navigate to production detail
- [ ] Error handling

### 5.2 Production List
**Priority: HIGH**
**Estimated: 1 day**

- [ ] List view with cards
- [ ] Status badges:
  - [ ] PENDING (yellow)
  - [ ] PROCESSING (blue, animated)
  - [ ] COMPLETED (green)
  - [ ] FAILED (red)
- [ ] Thumbnail preview
- [ ] Duration display
- [ ] Created date
- [ ] Search/filter UI
- [ ] Sort options

### 5.3 Production Detail
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Video player (React Native Video)
- [ ] Production metadata (title, duration, created date)
- [ ] Timeline events for this production
- [ ] Share button
  - [ ] Copy link
  - [ ] Share to social media (native share)
- [ ] Delete button (with confirmation modal)
- [ ] Edit button (if status = PENDING)

**Expected Output:**
- Enhanced `mobile/src/screens/Cinema/Simple/CinemaSimpleScreen.tsx`
- `mobile/src/screens/Cinema/ProductionListScreen.tsx` (new)
- `mobile/src/screens/Cinema/ProductionDetailScreen.tsx` (new)
- `mobile/src/components/VideoPlayer/VideoPlayer.tsx`
- `mobile/src/components/StatusBadge/StatusBadge.tsx`

---

## Phase 6: Shorts Workflow (Week 3)

### 6.1 Create Short
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Form with validation
- [ ] Title input
- [ ] Idea textarea
- [ ] Format selector (9:16, 1:1, 16:9) with visual icons
- [ ] Submit button
- [ ] Loading state
- [ ] Success → navigate to short detail

### 6.2 Shorts List & Detail
**Priority: HIGH**
**Estimated: 2 days**

- [ ] List view (similar to productions)
- [ ] Status badges
- [ ] Thumbnail grid
- [ ] Detail screen with video player
- [ ] Share functionality
- [ ] Delete functionality

**Expected Output:**
- Enhanced `mobile/src/screens/Shorts/ShortsScreen.tsx`
- `mobile/src/screens/Shorts/ShortListScreen.tsx`
- `mobile/src/screens/Shorts/ShortDetailScreen.tsx`
- `mobile/src/components/FormatPicker/FormatPicker.tsx`

---

## Phase 7: Sync System UI (Week 3-4)

### 7.1 Sync Status Component
**Priority: MEDIUM**
**Estimated: 1 day**

- [ ] Sync indicator (Idle, Syncing, Error states)
- [ ] Last sync timestamp display
- [ ] Manual sync button
- [ ] Auto-sync toggle
- [ ] Animations for syncing state

### 7.2 Sync Logs (Optional)
**Priority: LOW**
**Estimated: 1 day**

- [ ] View sync history
- [ ] Error logs
- [ ] Expandable details

**Expected Output:**
- `mobile/src/components/SyncStatus/SyncStatus.tsx`
- `mobile/src/screens/Sync/SyncLogsScreen.tsx` (optional)
- `mobile/src/hooks/useSync.ts`

---

## Phase 8: User Profile (Week 4)

### 8.1 Profile Header
**Priority: HIGH**
**Estimated: 1 day**

- [ ] Large avatar
- [ ] Name & @handle
- [ ] Bio
- [ ] Stats row (followers, following, productions, shorts)
- [ ] Edit profile button (for own profile)
- [ ] Follow/Unfollow button (for other users)

### 8.2 Profile Tabs
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Timeline tab (user's events)
- [ ] Productions tab (list view)
- [ ] Shorts tab (grid view)
- [ ] Likes tab (liked content)

### 8.3 Follow System
**Priority: MEDIUM**
**Estimated: 1 day**

- [ ] Followers list screen
- [ ] Following list screen
- [ ] Search users
- [ ] Follow/unfollow actions

**Expected Output:**
- `mobile/src/screens/Profile/ProfileScreen.tsx`
- `mobile/src/screens/Profile/FollowersScreen.tsx`
- `mobile/src/screens/Profile/FollowingScreen.tsx`
- `mobile/src/hooks/useProfile.ts`
- `mobile/src/services/follow.service.ts`

---

## Phase 9: Admin Dashboard (Week 4)

### 9.1 Admin Home
**Priority: MEDIUM**
**Estimated: 1 day**

- [ ] System stats cards (users, productions, shorts)
- [ ] Health indicators (API status, DB status, Queue status)
- [ ] Recent activity feed

### 9.2 User Management
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] User list with pagination
- [ ] Search users
- [ ] View user detail
- [ ] Ban/unban user
- [ ] Role management

### 9.3 Content Moderation
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Productions list (all users)
- [ ] Shorts list (all users)
- [ ] Flagged content queue
- [ ] Delete content action
- [ ] Review/approve workflow

### 9.4 System Logs
**Priority: LOW**
**Estimated: 1 day**

- [ ] Sync logs viewer
- [ ] Error logs viewer
- [ ] Filter and search
- [ ] Export functionality

**Expected Output:**
- Enhanced `mobile/src/screens/Admin/AdminScreen.tsx`
- `mobile/src/screens/Admin/UserManagementScreen.tsx`
- `mobile/src/screens/Admin/ContentModerationScreen.tsx`
- `mobile/src/screens/Admin/SystemLogsScreen.tsx`

---

## Phase 10: Settings & Menus (Week 4-5)

### 10.1 User Menu
**Priority: HIGH**
**Estimated: 1 day**

- [ ] Profile link
- [ ] Dashboard link
- [ ] Settings link
- [ ] Admin (conditional, if admin role)
- [ ] Logout
- [ ] Dark mode toggle (if supporting light mode)

### 10.2 Settings Screens
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Profile settings
  - [ ] Edit name, handle, bio
  - [ ] Change avatar
  - [ ] Save button
- [ ] Account settings
  - [ ] Email management
  - [ ] Password change
  - [ ] Two-factor auth (future)
- [ ] Notification settings
  - [ ] Email notifications toggles
  - [ ] Push notifications toggles
  - [ ] Frequency settings
- [ ] Billing (redirect to BillingScreen)
- [ ] Danger zone
  - [ ] Delete account
  - [ ] Confirmation modal

**Expected Output:**
- `mobile/src/screens/Settings/SettingsScreen.tsx`
- `mobile/src/screens/Settings/ProfileSettingsScreen.tsx`
- `mobile/src/screens/Settings/AccountSettingsScreen.tsx`
- `mobile/src/screens/Settings/NotificationSettingsScreen.tsx`

---

## Phase 11: Landing Page (Web) (Week 5)

**Note:** This requires a separate web app or Next.js project.

### 11.1 Setup
**Priority: MEDIUM**
**Estimated: 1 day**

- [ ] Create Next.js app or web subdirectory
- [ ] Configure Tailwind CSS with Neo Glow tokens
- [ ] Setup routing

### 11.2 Hero Section with 3D AuraFX
**Priority: MEDIUM**
**Estimated: 2-3 days**

- [ ] 3D animated scene (Three.js or Spline)
- [ ] "Create Cinematic AI Content" headline
- [ ] CTA buttons: "Start Free", "Login"
- [ ] Animated gradient background

### 11.3 Features & Pricing
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Feature grid (Productions, Shorts, Timeline, Sync)
- [ ] Pricing preview cards
- [ ] Footer with links (Docs, Terms, Privacy)

**Expected Output:**
- `web/` or `landing/` directory (new Next.js app)
- `web/pages/index.tsx` (hero)
- `web/components/Hero3D.tsx`
- `web/components/FeatureGrid.tsx`
- `web/components/PricingCards.tsx`

---

## Phase 12: Mobile Optimizations (Week 5)

### 12.1 Responsive Behavior
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Cards stack vertically on mobile
- [ ] Sidebar collapses to bottom nav
- [ ] Modals become full-screen on small screens
- [ ] Font sizes scale appropriately
- [ ] Touch targets meet 44px minimum

### 12.2 Mobile-Specific Features
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Swipeable panels (for tabs, drawers)
- [ ] Pull-to-refresh on lists
- [ ] Collapsible sections (accordion-style)
- [ ] Bottom sheet modals
- [ ] Haptic feedback

**Expected Output:**
- Enhanced responsive styles across all screens
- `mobile/src/components/BottomSheet/BottomSheet.tsx`
- `mobile/src/components/SwipePanel/SwipePanel.tsx`

---

## Phase 13: Accessibility (Week 5-6)

### 13.1 Keyboard Navigation
**Priority: HIGH**
**Estimated: 1 day**

- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Skip to content link
- [ ] Keyboard shortcuts documented

### 13.2 Screen Reader Support
**Priority: HIGH**
**Estimated: 2 days**

- [ ] ARIA labels on all interactive elements
- [ ] ARIA roles appropriate
- [ ] ARIA live regions for dynamic content
- [ ] Image alt text
- [ ] Form labels explicit

### 13.3 Visual Accessibility
**Priority: MEDIUM**
**Estimated: 1 day**

- [ ] High contrast mode toggle
- [ ] Reduced motion mode
- [ ] Font scaling support
- [ ] Color contrast meets WCAG AA (4.5:1)

**Expected Output:**
- Accessibility audit report
- `mobile/src/hooks/useAccessibility.ts`
- `mobile/src/context/AccessibilityContext.tsx`

---

## Phase 14: Performance Optimization (Week 6)

### 14.1 Code Splitting & Lazy Loading
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Lazy load screens with React.lazy
- [ ] Lazy load heavy components (video player, charts)
- [ ] Dynamic imports for routes
- [ ] Prefetch critical routes

### 14.2 Asset Optimization
**Priority: HIGH**
**Estimated: 1 day**

- [ ] Image compression pipeline
- [ ] WebP/AVIF format support
- [ ] Responsive images (srcset)
- [ ] Lazy loading images below fold
- [ ] Video streaming optimization (HLS/DASH)

### 14.3 Data & State Management
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Implement SWR or React Query for data fetching
- [ ] Cache user data in AsyncStorage
- [ ] Optimistic UI updates
- [ ] Background sync for offline support
- [ ] Request deduplication

**Expected Output:**
- `mobile/src/utils/lazyLoad.ts`
- `mobile/src/hooks/useOptimizedImage.ts`
- Enhanced data fetching in hooks with caching

---

## Phase 15: Testing & QA (Week 6)

### 15.1 Unit Testing
**Priority: HIGH**
**Estimated: 2 days**

- [ ] Test all utility functions
- [ ] Test all hooks
- [ ] Test component rendering
- [ ] Test state management

### 15.2 Integration Testing
**Priority: MEDIUM**
**Estimated: 2 days**

- [ ] Test user flows (signup → onboarding → dashboard)
- [ ] Test creation workflows (production, short)
- [ ] Test navigation flows
- [ ] Test API integrations

### 15.3 E2E Testing (Optional)
**Priority: LOW**
**Estimated: 3 days**

- [ ] Detox or Maestro setup
- [ ] Critical path tests
- [ ] Smoke tests for each screen

---

## Implementation Notes

### Tech Stack
- **Mobile**: React Native, TypeScript
- **State**: Context API + Custom hooks
- **Navigation**: React Navigation
- **UI**: Custom components with Neo Glow design tokens
- **API**: Axios with TypeScript types
- **Testing**: Jest, React Native Testing Library
- **Performance**: React.memo, useMemo, useCallback

### Development Standards
1. **TypeScript**: Strict mode enabled, all code typed
2. **ESLint**: Enforced on commit
3. **Prettier**: Auto-format on save
4. **Git Flow**: Feature branches, PR reviews
5. **Testing**: Minimum 70% coverage goal
6. **Documentation**: JSDoc comments on public APIs
7. **Accessibility**: WCAG AA compliance

### Dependencies to Add
```json
{
  "react-native-video": "^6.0.0",
  "react-native-image-picker": "^7.0.0",
  "react-native-share": "^10.0.0",
  "@react-native-async-storage/async-storage": "^1.21.0",
  "react-native-reanimated": "^3.6.0",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-svg": "^14.0.0",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/native-stack": "^6.9.17",
  "@react-navigation/drawer": "^6.6.6",
  "swr": "^2.2.4" // or @tanstack/react-query
}
```

---

## Success Metrics

### Phase 1-2 (Weeks 1-2)
- [ ] All global components available and tested
- [ ] Auth flows complete with onboarding
- [ ] User can sign up and complete onboarding

### Phase 3-4 (Weeks 2-3)
- [ ] Dashboard fully functional
- [ ] Timeline shows live events
- [ ] User can view activity feeds

### Phase 5-6 (Week 3)
- [ ] User can create productions and shorts
- [ ] User can view, share, delete content
- [ ] Status updates reflect backend state

### Phase 7-9 (Week 4)
- [ ] Sync system operational
- [ ] User profiles complete
- [ ] Admin dashboard functional

### Phase 10-14 (Weeks 4-6)
- [ ] Settings and menus complete
- [ ] Mobile optimizations applied
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met

### Final Acceptance (Week 6)
- [ ] All 15 sections complete
- [ ] All checklist items checked
- [ ] Test coverage >70%
- [ ] Performance (Lighthouse >90)
- [ ] Accessibility (WAVE 0 errors)
- [ ] Cross-platform tested (iOS, Android)

---

## Risk Mitigation

### Technical Risks
1. **3D Landing Page**: Complex, may need external designer
   - **Mitigation**: Use Spline.design or prebuilt Three.js templates
2. **Video Playback**: Performance on older devices
   - **Mitigation**: Adaptive streaming, fallback to thumbnails
3. **Real-time Sync**: Battery drain concerns
   - **Mitigation**: Polling intervals, background sync limits

### Timeline Risks
1. **Scope Creep**: Feature requests during development
   - **Mitigation**: Strict adherence to checklist, change control
2. **Dependencies**: Waiting on backend APIs
   - **Mitigation**: Mock data, parallel development
3. **Testing Time**: Comprehensive QA takes longer than expected
   - **Mitigation**: Continuous testing, automated tests

---

## Conclusion

This implementation plan provides a structured, phase-by-phase approach to building the complete CinemAi Neo UI/UX system. By following this plan, the team can deliver a production-ready, accessible, performant mobile and web application that fully utilizes the Neo Glow design system and backend APIs.

**Total Estimated Timeline**: 6 weeks (with 2-3 developers)
**Total Estimated Files**: ~150-200 new/modified files
**Total Estimated LOC**: ~15,000-20,000 lines

---

## Next Steps

1. **Approve this plan** and prioritize phases
2. **Set up project tracking** (Jira, Linear, GitHub Projects)
3. **Assign developers** to phases
4. **Begin Phase 1** with design system and components
5. **Daily standups** to track progress
6. **Weekly demos** to stakeholders
7. **Continuous deployment** to staging environment
8. **Beta testing** after Phase 10
9. **Production release** after Phase 15

Let's build something amazing! 🚀
