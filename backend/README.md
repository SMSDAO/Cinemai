# Backend - CinemAi Neo API

NestJS-based backend API for the CinemAi Neo platform.

## 🏗️ Structure

- **`src/api/`** - REST API controllers
- **`src/services/`** - Business logic services
- **`src/models/`** - Data models and schemas
- **`src/queues/`** - Queue processors for async tasks
- **`src/utils/`** - Utility functions and clients
- **`src/middleware/`** - Express middleware
- **`src/guards/`** - NestJS guards for auth and validation
- **`src/interceptors/`** - NestJS interceptors
- **`prisma/`** - Database schema and migrations
- **`tests/`** - Unit and integration tests

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run migrations
npm run migrate

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis (for queues)
- Bull (queue management)
