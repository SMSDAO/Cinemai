# User Profiles, Dashboards, Timeline, and Sync Features

## Overview

This implementation adds comprehensive user profile management, activity tracking, dashboard analytics, and real-time synchronization to the Cinemai Neo backend.

## Features

### 1. User Profiles
- Extended user model with `handle`, `bio`, and `stats` (JSON)
- Profile update endpoints for managing user information
- User statistics aggregation (productions, shorts, followers, following)

### 2. Social Graph
- Follow/Unfollow functionality via `Follow` model
- Like system via `Like` model
- Social connections tracked in database

### 3. Timeline Events
- Automatic timeline event creation for user activities
- Event types: `PRODUCTION_CREATED`, `PRODUCTION_COMPLETED`, `SHORT_CREATED`, `SHORT_COMPLETED`, `POST_PUBLISHED`, `USER_FOLLOWED`, `CONTENT_LIKED`
- Three timeline views: user timeline, following timeline, global timeline

### 4. Dashboard
- Comprehensive dashboard aggregating user data
- Recent productions and shorts
- User statistics and metrics
- Activity feed integration
- Social media analytics (views, likes, shares, comments)

### 5. Sync Service
- Near-real-time sync using polling mechanism
- Session-based sync tracking
- Delta updates since last sync
- Poll endpoint to check for changes

### 6. Admin Panel
- User management (list, view, update, delete)
- System health monitoring
- Analytics (DAU, MAU, revenue, content creation)
- Comprehensive dashboard for administrators

## API Endpoints

### User Profile
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile (name, handle, bio, avatarUrl)
- `GET /users/me/stats` - Get user statistics
- `DELETE /users/me` - Delete user account

### Timeline
- `GET /timeline/me?limit=20&offset=0` - Get user's own timeline
- `GET /timeline/following?limit=20&offset=0` - Get activity from followed users
- `GET /timeline/global?limit=20&offset=0` - Get global timeline

### Dashboard
- `GET /dashboard` - Get comprehensive dashboard data
- `GET /dashboard/analytics` - Get analytics summary

### Sync
- `POST /sync/init` - Initialize sync session
- `GET /sync/updates?since=<ISO8601>` - Get updates since timestamp
- `GET /sync/poll` - Poll for changes
- `GET /sync/status` - Get sync status

### Admin (Requires Admin Role)
- `GET /admin` - Get admin dashboard
- `GET /admin/users?page=1&limit=20` - List users with pagination
- `GET /admin/users/:id` - Get user details
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user
- `GET /admin/analytics` - Get system analytics
- `GET /admin/health` - Get system health

## Database Schema Changes

### User Model Extensions
```prisma
model User {
  handle            String?          @unique
  bio               String?          @db.Text
  stats             Json?
  followers         Follow[]         @relation("UserFollowers")
  following         Follow[]         @relation("UserFollowing")
  likes             Like[]
  timelineEvents    TimelineEvent[]
  streamSessions    StreamSession[]
}
```

### New Models

#### Follow
```prisma
model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
  createdAt   DateTime @default(now())
  
  follower    User     @relation("UserFollowers")
  following   User     @relation("UserFollowing")
  
  @@unique([followerId, followingId])
}
```

#### Like
```prisma
model Like {
  id          String   @id @default(cuid())
  userId      String
  contentId   String
  contentType String
  createdAt   DateTime @default(now())
  
  user        User
  
  @@unique([userId, contentId, contentType])
}
```

#### TimelineEvent
```prisma
model TimelineEvent {
  id          String    @id @default(cuid())
  userId      String
  eventType   EventType
  contentId   String?
  contentType String?
  metadata    Json?
  createdAt   DateTime  @default(now())
  
  user        User
}
```

#### StreamSession
```prisma
model StreamSession {
  id          String   @id @default(cuid())
  userId      String
  lastSyncAt  DateTime @default(now())
  metadata    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User
}
```

## End-to-End Flow Example

### Production Creation → Timeline Event

1. User creates a production via `POST /productions`
2. `CinemaService.createProduction()` creates the production record
3. Service automatically creates a `PRODUCTION_CREATED` timeline event
4. Timeline event appears in user's timeline and global feed
5. When production completes, `PRODUCTION_COMPLETED` event is created
6. Dashboard updates automatically with new production count
7. Sync service detects changes and notifies connected clients

### Short Creation → Timeline Event

1. User creates a short via `POST /shorts`
2. `ShortsService.createShort()` creates the short record
3. Service automatically creates a `SHORT_CREATED` timeline event
4. Timeline event appears in user's timeline
5. When short completes, `SHORT_COMPLETED` event is created
6. Dashboard analytics update with new metrics

## Testing

All services have comprehensive unit tests:
- `timeline.service.spec.ts` - 4 tests
- `dashboard.service.spec.ts` - 2 tests
- `sync.service.spec.ts` - 4 tests
- `admin.service.spec.ts` - 7 tests
- `user.service.spec.ts` - 4 tests (including new getUserStats)

Total: 46 tests passing

Run tests with:
```bash
npm test
```

## Architecture Notes

- All new services follow NestJS dependency injection pattern
- PrismaService is used for all database operations
- Timeline events are created transactionally within the same database operation
- Sync service uses polling mechanism (can be upgraded to WebSockets later)
- Admin endpoints should be protected with admin role guard (TODO)

## Future Enhancements

1. Add WebSocket support for real-time sync instead of polling
2. Implement follow/unfollow API endpoints
3. Implement like/unlike API endpoints
4. Add notification system based on timeline events
5. Add admin authentication and role guards
6. Add pagination cursors for timeline feeds
7. Add timeline event filtering by event type
8. Add user search functionality
9. Add privacy settings for user profiles
10. Add timeline event deletion/moderation
