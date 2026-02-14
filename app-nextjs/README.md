# Cinemai Pro Agents

**AI Agents for Pro Video Campaigns**

Generate professional promo video scripts, orchestrate AI video generation with virtual presenters, and automate social media campaigns—all powered by intelligent AI agents.

## 🌟 Features

- **Script Agent**: AI-powered script generation with templates (Product Launch, UGC Style, Testimonial, Tutorial)
- **Video Agent**: Virtual presenter video generation with customizable avatars and languages
- **Campaign Agent**: Automated social media posting to Twitter/X and Farcaster
- **Social Sync**: Connect social accounts and view timeline of posts
- **Stripe Billing**: Flexible plans with subscriptions and usage-based billing
- **Policy Enforcement**: Built-in guardrails for ethical AI and likeness compliance

## 🚀 Quick Start

### Prerequisites

- **Node.js 20.x or higher**
- **npm 10.x or higher**
- **PostgreSQL database** (Neon Postgres recommended)
- **Stripe account** for billing
- **OpenAI API key** for script generation

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/SMSDAO/Cinemai.git
cd Cinemai/app-nextjs
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: Neon Postgres connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 in dev)
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `OPENAI_API_KEY`: OpenAI API key
- `TWITTER_API_KEY`, `TWITTER_API_SECRET`: Twitter API credentials
- `FARCASTER_API_KEY`: Farcaster API key
- `VIDEO_PROVIDER_API_KEY`: Video provider API key

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📚 Documentation

- **[User Guide](./docs/USER_GUIDE.md)**: How to use the platform
- **[Dev Guide](./docs/DEV_GUIDE.md)**: Development and deployment guide
- **[Likeness & Consent Policy](./docs/LIKENESS_POLICY.md)**: Ethical AI usage policy

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with Neo Glow theme
- **UI Components**: Shadcn UI
- **Database**: PostgreSQL via Prisma
- **Authentication**: NextAuth
- **Payments**: Stripe
- **AI**: OpenAI API
- **Deployment**: Vercel

## 📦 Project Structure

```
app-nextjs/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── scripts/           # Script management
│   ├── videos/            # Video management
│   ├── campaigns/         # Campaign management
│   ├── settings/          # User settings
│   ├── policy/            # Policy pages
│   └── guides/            # User and dev guides
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── neo-glow/         # Neo Glow themed components
├── lib/                   # Utility functions
│   ├── policies/         # Compliance and policy enforcement
│   └── prisma.ts         # Prisma client
├── prisma/               # Database schema
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🔒 Security & Compliance

This platform enforces strict rules around likeness rights and consent:

- ❌ **DO NOT** impersonate real people without explicit consent
- ❌ **DO NOT** use the likeness of public figures without documented rights
- ✅ **DO** use clearly fictional or stylized avatars
- ✅ **DO** include clear disclosure for AI-generated content
- ✅ **DO** accept the Likeness & Consent Policy before using avatar features

All avatar generation requests are logged for audit purposes. Violations of these policies may result in account suspension.

## 💳 Pricing

- **Free**: Limited scripts, no video generation, no auto-posting
- **Pro** ($49/month): Unlimited scripts, 10 videos/month, auto-posting, analytics
- **Scale** ($199/month): Everything in Pro, 50 videos/month, priority processing, white-label

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy

```bash
# Or deploy via CLI
npx vercel
```

### Other Platforms

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for instructions on deploying to:
- Railway
- Render
- AWS
- DigitalOcean

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting PRs.

## 📄 License

See [LICENSE](../LICENSE) for more information.

## 🔗 Links

- [Live Demo](https://cinemai-pro-agents.vercel.app) (coming soon)
- [Documentation](./docs/)
- [Support](https://github.com/SMSDAO/Cinemai/issues)

---

**Built with ❤️ by the CinemAi team**
