# ARCHITECTURE.md

**The Engineering Bible for CinemAi Neo**

This is the single source of truth for the entire CinemAi Neo system. All code, documentation, and architectural decisions must align with this document.

---

## 🔥 PRODUCT OVERVIEW

CinemAi Neo is a **mobile-first AI production studio** with three core pillars:

### 🎬 Cinema
Transform a single photo + script into multi-scene cinematic videos with:
- Multi-scene video generation
- AI-powered voiceover synthesis
- Background music integration
- Customizable cinematic styles
- Production Packs (templates)

### 🎞 Shorts
Create viral short-form content with:
- AI hook generator (multiple variants)
- Auto-caption engine with styling
- Multi-format export (9:16, 1:1, 16:9)
- Brand kit integration
- Variant generation for A/B testing

### 📈 Growth
Automate social media publishing and analytics:
- Publish to TikTok, Instagram, YouTube, X
- Schedule posts across platforms
- Track performance metrics
- AI-powered insights and recommendations

### 💳 Monetization
- **Free Tier**: Limited features
- **Trips**: $1 per production (pay-as-you-go)
- **Pro**: $49/month subscription with unlimited access

---

## 🏗️ SYSTEM ARCHITECTURE

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENTS                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  iOS App     │  │ Android App  │  │  Web Portal  │      │
│  │ React Native │  │ React Native │  │    React     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY                               │
│              (Load Balancer + Auth)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   MICROSERVICES                              │
│  ┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ AUTH │ │ USER │ │BILLING │ │ CINEMA │ │ SHORTS │       │
│  └──────┘ └──────┘ └────────┘ └────────┘ └────────┘       │
│  ┌────────┐ ┌──────────┐ ┌──────────────────────────────┐               │
│  │ GROWTH │ │BRAND KIT │ │ ORACLE BRIDGE (optional)     │               │
│  └────────┘ └──────────┘ └──────────────────────────────┘               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    REDIS QUEUES                              │
│  cinema.*, shorts.*, social.*                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKGROUND WORKERS                         │
│  Process queued jobs (rendering, generation, publishing)     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     AI AGENTS                                │
│  Cinema, Shorts, Growth agents with specialized logic        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA & STORAGE                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐                  │
│  │PostgreSQL│  │ S3/R2    │  │  Oracle (optional)   │                  │
│  │(Primary) │  │ (Assets) │  │  Enterprise Mirror   │                  │
│  └──────────┘  └──────────┘  └──────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 MICROSERVICES

### 1. AUTH Service
**Responsibility**: Authentication & authorization
- User signup/login
- JWT token management
- Session handling
- OAuth integration (Google, Apple)

**API Endpoints**:
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### 2. USER Service
**Responsibility**: User profile management
- Profile CRUD operations
- User preferences
- Avatar management

**API Endpoints**:
- `GET /users/me`
- `PUT /users/me`
- `DELETE /users/me`

### 3. BILLING Service
**Responsibility**: Payments & subscriptions
- Stripe integration
- Trip purchases ($1 each)
- Pro subscription management
- Payment history

**API Endpoints**:
- `POST /billing/trips/purchase`
- `POST /billing/subscriptions/create`
- `GET /billing/payments/history`

### 4. CINEMA Service
**Responsibility**: Cinema production workflows
- Production creation
- Scene planning
- Video generation orchestration

**API Endpoints**:
- `POST /cinema/productions`
- `POST /cinema/productions/:id/run`
- `GET /cinema/productions/:id`
- `GET /cinema/productions`

### 5. SHORTS Service
**Responsibility**: Short-form video generation
- Shorts creation
- Hook generation
- Variant management

**API Endpoints**:
- `POST /shorts`
- `POST /shorts/:id/hooks`
- `POST /shorts/:id/variants`
- `GET /shorts/:id`

### 6. GROWTH Service
**Responsibility**: Social media automation
- Multi-platform publishing
- Post scheduling
- Analytics aggregation

**API Endpoints**:
- `POST /social/posts`
- `GET /social/posts`
- `GET /analytics/shorts`
- `GET /analytics/productions`

### 7. BRAND KIT Service
**Responsibility**: Brand asset management
- Logo uploads
- Color palette management
- Font preferences
- Brand templates

**API Endpoints**:
- `POST /brandkit`
- `PUT /brandkit/:id`
- `GET /brandkit`

### 8. ORACLE BRIDGE Service (Optional)
**Responsibility**: Optional enterprise mirroring integration
- Data mirroring to Oracle database
- Sync operations
- Enterprise mirroring integration

---

## 🔄 PIPELINES

### Cinema Pipeline

```
1. INGEST
   ↓ (User uploads photo + script)
2. SCRIPT UNDERSTANDING
   ↓ (AI analyzes script, identifies scenes)
3. SCENE PLANNING
   ↓ (Break script into scenes, plan shots)
4. VISUAL GENERATION
   ↓ (Generate video for each scene)
5. AUDIO GENERATION
   ↓ (Voiceover synthesis + music)
6. ASSEMBLY
   ↓ (Combine scenes, audio, effects)
7. RENDERING
   ↓ (Final video encode)
8. DELIVERY
   ↓ (Upload to S3, notify user)
```

**Queue Names**:
- `cinema.ingest`
- `cinema.plan`
- `cinema.generate`
- `cinema.assemble`
- `cinema.render`

### Shorts Pipeline

```
1. IDEA → HOOKS
   ↓ (AI generates multiple hook variants)
2. HOOK SELECTION
   ↓ (User selects preferred hook)
3. VARIANT PLANNING
   ↓ (Plan different versions for A/B test)
4. CAPTION ENGINE
   ↓ (Generate styled captions)
5. RENDERING
   ↓ (Render video with captions)
6. DELIVERY
   ↓ (Upload, notify)
```

**Queue Names**:
- `shorts.hooks`
- `shorts.variants`
- `shorts.render`

### Growth Pipeline

```
1. PUBLISH
   ↓ (Upload to social platforms)
2. SCHEDULE
   ↓ (Queue posts for optimal times)
3. METRICS
   ↓ (Collect views, likes, shares)
4. INSIGHTS
   ↓ (AI analysis of performance)
```

**Queue Names**:
- `social.schedule`
- `social.publish`
- `social.metrics`

---

## 🤖 AI AGENTS

### Cinema Agents

1. **Ingest Agent**
   - Input: Photo + script
   - Output: Preprocessed assets
   - Tasks: Image analysis, script parsing

2. **Script Understanding Agent**
   - Input: Raw script text
   - Output: Scene breakdown
   - Tasks: NLP, scene detection, character identification

3. **Scene Planner Agent**
   - Input: Scene breakdown
   - Output: Shot list with timing
   - Tasks: Shot planning, pacing, cinematography rules

4. **Visual Generator Agent**
   - Input: Scene descriptions
   - Output: Video clips
   - Tasks: AI video generation (Runway, Pika, etc.)

5. **Audio Agent**
   - Input: Script + timing
   - Output: Voiceover + music
   - Tasks: TTS synthesis, music selection

6. **Assembly Agent**
   - Input: Video clips + audio
   - Output: Assembled timeline
   - Tasks: Video editing, transitions

7. **Render Agent**
   - Input: Timeline
   - Output: Final MP4
   - Tasks: Video encoding, compression

### Shorts Agents

1. **Hook Generator Agent**
   - Input: Topic/idea
   - Output: 5-10 hook variants
   - Tasks: Viral hook generation

2. **Variant Planner Agent**
   - Input: Selected hook
   - Output: Variant specifications
   - Tasks: A/B test planning

3. **Caption Engine Agent**
   - Input: Audio transcript
   - Output: Styled captions
   - Tasks: Word-level timing, styling

4. **Shorts Render Agent**
   - Input: Video + captions
   - Output: Final short video
   - Tasks: Rendering, multi-format export

### Growth Agents

1. **Growth Optimizer Agent**
   - Input: Content + platform
   - Output: Posting strategy
   - Tasks: Optimal timing, hashtags

2. **Analytics Agent**
   - Input: Performance metrics
   - Output: Insights report
   - Tasks: Pattern recognition, recommendations

---

## 💾 DATABASE SCHEMA

### Core Tables

#### users
```sql
id: UUID PRIMARY KEY
email: VARCHAR(255) UNIQUE NOT NULL
name: VARCHAR(255)
avatar_url: TEXT
subscription_type: ENUM('free', 'pro')
trips_remaining: INTEGER DEFAULT 0
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### productions (Cinema)
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
title: VARCHAR(255)
script: TEXT
photo_url: TEXT
style: VARCHAR(100)
status: ENUM('pending', 'processing', 'completed', 'failed')
output_url: TEXT
duration: INTEGER
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### assets
```sql
id: UUID PRIMARY KEY
production_id: UUID FOREIGN KEY
type: ENUM('image', 'video', 'audio')
url: TEXT
metadata: JSONB
created_at: TIMESTAMP
```

#### shorts
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
title: VARCHAR(255)
idea: TEXT
selected_hook: TEXT
status: ENUM('pending', 'processing', 'completed', 'failed')
output_url: TEXT
format: ENUM('9:16', '1:1', '16:9')
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### short_variants
```sql
id: UUID PRIMARY KEY
short_id: UUID FOREIGN KEY
variant_number: INTEGER
caption_style: VARCHAR(100)
output_url: TEXT
created_at: TIMESTAMP
```

#### social_accounts
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
platform: ENUM('tiktok', 'instagram', 'youtube', 'x')
account_name: VARCHAR(255)
access_token: TEXT ENCRYPTED
refresh_token: TEXT ENCRYPTED
created_at: TIMESTAMP
```

#### social_posts
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
social_account_id: UUID FOREIGN KEY
content_id: UUID (production or short)
content_type: ENUM('production', 'short')
platform_post_id: VARCHAR(255)
scheduled_at: TIMESTAMP
published_at: TIMESTAMP
status: ENUM('scheduled', 'published', 'failed')
```

#### social_metrics
```sql
id: UUID PRIMARY KEY
social_post_id: UUID FOREIGN KEY
views: INTEGER
likes: INTEGER
shares: INTEGER
comments: INTEGER
engagement_rate: DECIMAL(5,2)
collected_at: TIMESTAMP
```

#### brand_kits
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
name: VARCHAR(255)
logo_url: TEXT
primary_color: VARCHAR(7)
secondary_color: VARCHAR(7)
font_family: VARCHAR(100)
created_at: TIMESTAMP
```

#### trips
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
amount: DECIMAL(10,2)
quantity: INTEGER
payment_intent_id: VARCHAR(255)
status: ENUM('pending', 'completed', 'failed')
created_at: TIMESTAMP
```

#### payments
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
amount: DECIMAL(10,2)
currency: VARCHAR(3)
type: ENUM('trip', 'subscription')
stripe_payment_id: VARCHAR(255)
status: ENUM('pending', 'succeeded', 'failed')
created_at: TIMESTAMP
```

#### subscriptions
```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY
plan: ENUM('pro')
amount: DECIMAL(10,2)
stripe_subscription_id: VARCHAR(255)
status: ENUM('active', 'canceled', 'past_due')
current_period_start: TIMESTAMP
current_period_end: TIMESTAMP
created_at: TIMESTAMP
```

---

## 📁 FOLDER STRUCTURE

```
cinemai-neo/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── api/            # REST controllers
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── billing/
│   │   │   ├── productions/
│   │   │   ├── assets/
│   │   │   ├── shorts/
│   │   │   ├── growth/
│   │   │   ├── brandkit/
│   │   │   ├── social/
│   │   │   └── oracle-bridge/
│   │   ├── services/       # Business logic
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── billing/
│   │   │   ├── cinema/
│   │   │   ├── shorts/
│   │   │   ├── growth/
│   │   │   ├── brandkit/
│   │   │   ├── social/
│   │   │   └── oracle-sync/
│   │   ├── models/         # Data models
│   │   ├── queues/         # Queue processors
│   │   ├── utils/          # Utilities
│   │   ├── middleware/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── app-nextjs/              # Next.js web application (primary web interface)
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   ├── prisma/             # Database schema for web app
│   ├── public/             # Static assets
│   ├── package.json
│   └── next.config.ts
│
├── web/                     # Minimal legacy web implementation (optional)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── mobile/                  # React Native app
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Home/
│   │   │   ├── Cinema/
│   │   │   │   ├── Simple/
│   │   │   │   └── Pro/
│   │   │   ├── Shorts/
│   │   │   ├── Growth/
│   │   │   ├── BrandKit/
│   │   │   ├── Billing/
│   │   │   └── Account/
│   │   ├── components/
│   │   │   ├── NeoGlowButton/
│   │   │   ├── NeoGlowCard/
│   │   │   ├── UploadBox/
│   │   │   ├── StylePicker/
│   │   │   ├── Timeline/
│   │   │   ├── CaptionPreview/
│   │   │   └── AnalyticsCharts/
│   │   ├── navigation/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── services/
│   │   ├── theme/
│   │   │   ├── tokens.ts
│   │   │   └── tokens.json
│   │   ├── assets/
│   │   └── App.tsx
│   ├── android/
│   ├── ios/
│   ├── package.json
│   └── metro.config.js
│
├── agents/                  # AI agents
│   ├── cinema/
│   ├── shorts/
│   ├── growth/
│   └── shared/
│
├── workers/                 # Background workers
│   ├── cinema-ingest.worker.ts
│   ├── cinema-plan.worker.ts
│   ├── cinema-generate.worker.ts
│   ├── cinema-render.worker.ts
│   ├── shorts-render.worker.ts
│   ├── social-publish.worker.ts
│   └── social-metrics.worker.ts
│
├── infra/                   # Infrastructure
│   ├── docker/
│   ├── k8s/
│   ├── terraform/
│   └── ci-cd/
│
├── docs/                    # Documentation
│   ├── architecture/
│   ├── api/
│   ├── mobile/
│   └── onboarding/
│
├── scripts/                 # Automation scripts
│   ├── bootstrap.sh
│   ├── migrate.sh
│   ├── seed.sh
│   ├── deploy.sh
│   └── sync-oracle.sh
│
├── config/                  # Configuration
│   ├── default.json
│   ├── development.json
│   ├── staging.json
│   ├── production.json
│   └── secrets.example.json
│
├── public/                  # Static landing page assets
│
├── .github/
│   ├── copilot-instructions.md
│   └── ui-design-tokens.md
│
├── ARCHITECTURE.md          # This file
├── README.md
└── .gitignore
```

---

## 🎨 UI/UX SYSTEM

### Neo Glow Design System

See `.github/ui-design-tokens.md` for complete specifications.

**Key Principles**:
- Dark theme with cinematic depth (#05060A, #0A0C12)
- Cyan primary glow (#00F0FF)
- Magenta secondary glow (#FF2EF5)
- Purple tertiary (#6B4CFF)
- 4-point spacing grid
- Smooth animations with glow effects
- Accessibility-first (WCAG AA)

### Mobile App Screens

1. **Home**: Dashboard with recent productions
2. **Cinema Simple**: Quick photo + script upload
3. **Cinema Pro**: Advanced controls, style selection
4. **Shorts**: Hook generation, variant management
5. **Growth**: Social calendar, analytics
6. **Brand Kit**: Logo, colors, fonts
7. **Billing**: Trips purchase, Pro subscription
8. **Account**: Profile settings, preferences

---

## 🔐 SECURITY

### Authentication
- JWT tokens (access + refresh)
- Secure token storage
- OAuth 2.0 for social logins

### Data Protection
- Encryption at rest (database)
- Encryption in transit (TLS 1.3)
- Secrets management (environment variables)
- PII anonymization for analytics

### API Security
- Rate limiting
- CORS configuration
- Input validation
- SQL injection protection

---

## 🚀 DEPLOYMENT

### Environments
- **Development**: Local + staging servers
- **Staging**: Pre-production testing
- **Production**: Live system

### Infrastructure
- **Compute**: Kubernetes cluster
- **Database**: PostgreSQL (managed)
- **Queue**: Redis (managed)
- **Storage**: S3 / Cloudflare R2
- **CDN**: Cloudflare
- **Monitoring**: Datadog / Sentry

---

## 📊 METRICS & MONITORING

### Key Metrics
- Production completion time
- Shorts generation time
- Queue processing latency
- API response times
- Error rates
- User engagement

### Alerting
- Failed productions
- Queue backlog
- High error rates
- Infrastructure issues

---

## 🎯 DEVELOPMENT WORKFLOW

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Naming conventions: `*.service.ts`, `*.controller.ts`, `*.agent.ts`, `*.worker.ts`

### Testing
- Unit tests (Jest)
- Integration tests
- E2E tests (Detox for mobile)
- >80% code coverage

### Git Workflow
- Feature branches
- Pull requests with reviews
- CI/CD automation
- Semantic versioning

---

## 📝 NOTES

- This document is the single source of truth
- All code must align with this architecture
- Changes to architecture require team approval
- Keep this document updated with system evolution

**Last Updated**: 2026-02-06
**Version**: 1.0.0
