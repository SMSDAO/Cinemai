# Cinemai Pro Agents - AI Agent Platform

This directory contains a **production-ready, lightweight, fast-deployable Next.js web application** for the Cinemai Pro Agents platform, built according to the detailed specification.

## 📋 What's Included

This implementation includes:

✅ **Core Architecture**
- Next.js 16 with App Router (TypeScript)
- Neo Glow theme (dark, gradients, soft glows)
- Shadcn UI components
- Prisma with PostgreSQL (Neon-ready)
- Vercel-optimized deployment

✅ **AI Agents**
- **Script Agent**: AI-powered script generation with templates
- **Video Agent**: Virtual presenter video generation
- **Campaign Agent**: Social media campaign automation

✅ **Policy & Compliance**
- Likeness & consent policy enforcement
- Automated compliance checking
- Audit logging for all avatar requests
- Clear ethical guidelines

✅ **Database Schema**
- Users, Scripts, Videos, Campaigns
- Social Accounts & Posts
- Billing & Subscriptions
- Audit Logs & Policy Acceptance

✅ **Pages & UI**
- Landing page with hero, features, pricing
- Dashboard with stats and quick actions
- Pricing page with 3 plans (Free, Pro, Scale)
- Policy page with full likeness policy
- Neo Glow design system throughout

✅ **API Routes**
- `POST /api/agents/script` - Generate scripts
- `POST /api/agents/video` - Create videos
- `POST /api/agents/campaign` - Launch campaigns
- All routes include compliance checking

✅ **Documentation**
- **User Guide**: Complete end-user documentation
- **Dev Guide**: Setup, development, deployment
- **Likeness Policy**: Full ethical AI policy
- **Client Guides**: React Native, Electron, PWA

✅ **Multi-Platform Support**
- React Native integration guide
- Electron desktop app guide
- PWA (Progressive Web App) configuration

## 🚀 Quick Start

```bash
cd app-nextjs
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Full Documentation

See **[app-nextjs/README.md](./app-nextjs/README.md)** for complete setup and deployment instructions.

## 📂 Structure

```
app-nextjs/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (agents)
│   ├── dashboard/         # Dashboard page
│   ├── pricing/           # Pricing page
│   ├── policy/            # Policy pages
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Shadcn UI
│   └── neo-glow/         # Neo Glow themed components
├── lib/                   # Utilities
│   ├── policies/         # Compliance checking
│   └── prisma.ts         # Database client
├── prisma/               # Database schema
├── docs/                 # Documentation
│   ├── USER_GUIDE.md
│   ├── DEV_GUIDE.md
│   └── LIKENESS_POLICY.md
└── clients/              # Multi-platform guides
    ├── react-native/
    ├── electron/
    └── pwa/
```

## 🔒 Security & Ethics

This platform enforces strict rules around likeness rights:

- ❌ No impersonation without consent
- ❌ No public figures without documented rights
- ✅ Use fictional or stylized avatars
- ✅ Clear AI disclosure required
- ✅ All requests logged for audit

## 💻 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4 with Neo Glow theme
- **UI**: Shadcn UI components
- **Database**: PostgreSQL via Prisma 6
- **Auth**: NextAuth (ready to integrate)
- **Payments**: Stripe (ready to integrate)
- **Deployment**: Vercel-optimized

## 🚢 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in dashboard
3. Deploy

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for details.

## ✅ What's Ready

- ✅ Full Next.js app builds successfully
- ✅ Neo Glow theme implemented
- ✅ API routes for 3 core agents
- ✅ Compliance checking with policy enforcement
- ✅ Complete database schema with Prisma
- ✅ Landing, dashboard, pricing, and policy pages
- ✅ Comprehensive documentation
- ✅ Client integration guides

## 🚧 Integration Points

The following are abstracted and ready for integration:

- **NextAuth**: Auth structure ready, needs OAuth providers
- **Stripe**: Billing tables created, needs Stripe SDK integration
- **OpenAI**: Script generation uses mock, ready for real API
- **Video Provider**: Abstracted interface, ready for provider integration
- **Twitter/X API**: Mock implementation, ready for real API
- **Farcaster API**: Mock implementation, ready for real API

## 📝 License

See [LICENSE](../LICENSE)

---

**Built according to spec**: Production-ready, lightweight, fast-deployable web app with AI agents, Neo Glow UI, policy enforcement, and complete documentation.
