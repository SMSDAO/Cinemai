# CinemAi Neo

Welcome to **CinemAi Neo** - the next generation AI-powered cinema and content creation platform.

## 🏗️ Monorepo Structure

This is a monorepo containing all services, applications, and infrastructure for the CinemAi Neo platform:

### 📦 Core Directories

- **`backend/`** - NestJS backend API with services, models, queues, and utilities
- **`mobile/`** - React Native mobile application for iOS and Android
- **`agents/`** - AI agents for cinema, shorts, and growth automation
- **`workers/`** - Background workers for processing queues and tasks
- **`infra/`** - Infrastructure as code (Docker, Kubernetes, Terraform)
- **`docs/`** - Architecture documentation, API specs, and guides
- **`scripts/`** - Utility scripts for bootstrapping, deployment, and maintenance
- **`config/`** - Environment-specific configuration files

## 🚀 Getting Started

```bash
# Bootstrap all services
./scripts/bootstrap.sh

# Run migrations
./scripts/migrate.sh

# Seed database
./scripts/seed.sh
```

## 📚 Documentation

See the [`docs/`](./docs/) directory for detailed documentation on:
- Architecture and system design
- API specifications
- Mobile app development
- Onboarding guides

## 🛠️ Development

Each module has its own README with specific setup instructions:
- [Backend Documentation](./backend/README.md)
- [Mobile Documentation](./mobile/README.md)
- [AI Agents Documentation](./agents/README.md)

## 📄 License

See [LICENSE](./LICENSE) for more information.