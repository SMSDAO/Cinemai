# Developer Guide: Cinemai Pro Agents

## Overview

This guide covers development setup, code structure, deployment, and how to extend the Cinemai Pro Agents platform.

## Table of Contents

1. [Requirements](#requirements)
2. [Setup](#setup)
3. [Code Structure](#code-structure)
4. [Development](#development)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Extending the Platform](#extending-the-platform)
8. [API Reference](#api-reference)

---

## Requirements

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **PostgreSQL**: 14+ (Neon Postgres recommended)
- **Git**: Latest version

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SMSDAO/Cinemai.git
cd Cinemai/app-nextjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in the required values:

```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# APIs
OPENAI_API_KEY="sk-..."
TWITTER_API_KEY="..."
TWITTER_API_SECRET="..."
FARCASTER_API_KEY="..."
VIDEO_PROVIDER_API_KEY="..."
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with test data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Code Structure

```
app-nextjs/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── agents/              # AI agent endpoints
│   │   │   ├── script/          # Script Agent
│   │   │   ├── video/           # Video Agent
│   │   │   └── campaign/        # Campaign Agent
│   │   ├── auth/                # NextAuth endpoints
│   │   └── webhooks/            # Stripe webhooks
│   ├── dashboard/               # Dashboard pages
│   ├── scripts/                 # Script management
│   ├── videos/                  # Video management
│   ├── campaigns/               # Campaign management
│   ├── settings/                # User settings
│   ├── policy/                  # Policy pages
│   ├── guides/                  # User/Dev guides
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components
│   └── neo-glow/                # Neo Glow themed components
├── lib/                          # Utility functions
│   ├── policies/                # Policy enforcement
│   │   └── compliance.ts        # Likeness compliance checking
│   ├── agents/                  # AI agent logic
│   ├── providers/               # External API integrations
│   │   ├── openai.ts           # OpenAI integration
│   │   ├── video-provider.ts   # Video provider abstraction
│   │   ├── twitter.ts          # Twitter/X API
│   │   └── farcaster.ts        # Farcaster API
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Utility functions
├── prisma/                       # Database
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Migration files
│   └── seed.ts                  # Seed script
├── public/                       # Static assets
├── docs/                         # Documentation
│   ├── USER_GUIDE.md
│   ├── DEV_GUIDE.md
│   └── LIKENESS_POLICY.md
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── next.config.ts                # Next.js config
└── README.md                     # Project overview
```

---

## Development

### Running the Dev Server

```bash
npm run dev
```

- App runs on `http://localhost:3000`
- API routes available at `http://localhost:3000/api/*`
- Hot reload enabled

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Prisma Studio

View and edit database records:

```bash
npx prisma studio
```

Opens at `http://localhost:5555`

---

## Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Test Coverage

```bash
npm test -- --coverage
```

---

## Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Root Directory: `app-nextjs`

3. **Set Environment Variables**
   - Add all env vars from `.env.example` in Vercel dashboard
   - Use **production** values for:
     - `DATABASE_URL` (Neon production database)
     - `NEXTAUTH_URL` (your Vercel domain)
     - `STRIPE_SECRET_KEY` (production key)
     - etc.

4. **Deploy**
   - Push to `main` branch
   - Vercel auto-deploys

### Configure Neon Database

1. Create a Neon project at [neon.tech](https://neon.tech)
2. Copy the connection string
3. Add as `DATABASE_URL` in Vercel
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret
5. Add as `STRIPE_WEBHOOK_SECRET` in Vercel

### Other Platforms

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set DATABASE_URL="..."

# Deploy
railway up
```

#### Render

1. Create a new Web Service
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

---

## Extending the Platform

### Adding a New Agent

1. **Create Agent Logic**

```typescript
// lib/agents/my-agent.ts
export async function myAgent(input: MyInput): Promise<MyOutput> {
  // Agent logic here
  return output;
}
```

2. **Create API Route**

```typescript
// app/api/agents/my-agent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { myAgent } from '@/lib/agents/my-agent';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await myAgent(body);
  return NextResponse.json(result);
}
```

3. **Update Database Schema**

```prisma
// prisma/schema.prisma
model MyAgentOutput {
  id        String   @id @default(cuid())
  userId    String
  data      Json
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

4. **Run Migration**

```bash
npx prisma migrate dev --name add_my_agent
```

### Adding a New Provider

1. **Create Provider Module**

```typescript
// lib/providers/my-provider.ts
export class MyProvider {
  constructor(private apiKey: string) {}
  
  async doSomething(params: Params): Promise<Result> {
    // API call
  }
}
```

2. **Add Environment Variable**

```env
MY_PROVIDER_API_KEY="..."
```

3. **Use in Agents**

```typescript
import { MyProvider } from '@/lib/providers/my-provider';

const provider = new MyProvider(process.env.MY_PROVIDER_API_KEY!);
```

---

## API Reference

### Script Agent

**POST** `/api/agents/script`

Generate a video script.

**Request Body:**
```json
{
  "product": "AI writing assistant",
  "audience": "content creators",
  "tone": "friendly",
  "duration": 60,
  "template": "product_launch"
}
```

**Response:**
```json
{
  "id": "script_123",
  "title": "AI Writing Assistant Launch",
  "content": {
    "hook": "Tired of writer's block?",
    "body": [...],
    "cta": "Try it free today!"
  }
}
```

### Video Agent

**POST** `/api/agents/video`

Generate a video from a script.

**Request Body:**
```json
{
  "scriptId": "script_123",
  "avatarStyle": "professional",
  "language": "en",
  "aspectRatio": "16:9"
}
```

**Response:**
```json
{
  "id": "video_456",
  "status": "queued",
  "providerJobId": "job_789"
}
```

### Campaign Agent

**POST** `/api/agents/campaign`

Create a social media campaign.

**Request Body:**
```json
{
  "videoId": "video_456",
  "platforms": ["twitter", "farcaster"],
  "caption": "Check out our new AI tool!",
  "scheduleTime": "2026-02-15T10:00:00Z"
}
```

**Response:**
```json
{
  "id": "campaign_789",
  "status": "scheduled",
  "platforms": ["twitter", "farcaster"]
}
```

---

## Troubleshooting

### Build Errors

```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Database Connection Issues

- Check `DATABASE_URL` is correct
- Verify PostgreSQL is running
- Test connection:
  ```bash
  npx prisma db push
  ```

### Prisma Client Not Found

```bash
npx prisma generate
```

---

## Need Help?

- **Support**: support@cinemai.ai
- **Issues**: [GitHub Issues](https://github.com/SMSDAO/Cinemai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/SMSDAO/Cinemai/discussions)

---

**Last Updated**: February 2026
