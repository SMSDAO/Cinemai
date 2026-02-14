# Getting Started - CinemAi Neo

Welcome to CinemAi Neo! This guide will help you set up your development environment.

## 🎯 Prerequisites

- Node.js >= 20
- npm >= 10
- Docker (optional, for containerized development)
- PostgreSQL
- Redis

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SMSDAO/Cinemai.git
cd Cinemai
```

### 2. Bootstrap the Project

```bash
./scripts/bootstrap.sh
```

This will install all dependencies for backend, mobile, agents, and workers.

### 3. Set Up Environment Variables

Copy the example configuration:

```bash
cp config/secrets.example.json config/secrets.json
```

Edit `config/secrets.json` with your actual credentials.

### 4. Run Migrations

```bash
./scripts/migrate.sh
```

### 5. Seed the Database

```bash
./scripts/seed.sh
```

### 6. Start Development Servers

```bash
# Backend
cd backend && npm run dev

# Mobile (in a new terminal)
cd mobile && npm start
```

## 📚 Next Steps

- Read the [Architecture Overview](../architecture/overview.md)
- Explore the [API Reference](../api/reference.md)
- Check out the [Mobile Setup Guide](../mobile/setup.md)

## 🆘 Getting Help

If you encounter any issues, please check our documentation or reach out to the team.
