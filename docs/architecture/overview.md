# Architecture Overview - CinemAi Neo

## 🏗️ System Architecture

CinemAi Neo is built as a microservices-based architecture with the following components:

### Core Services

1. **Backend API** - NestJS-based REST API
   - Handles all business logic
   - Manages authentication and authorization
   - Coordinates with workers and agents

2. **AI Agents** - Autonomous AI workers
   - Cinema production automation
   - Shorts generation and optimization
   - Growth and marketing automation

3. **Background Workers** - Queue-based task processors
   - Async processing of heavy workloads
   - Video rendering and encoding
   - Social media publishing

4. **Mobile App** - React Native application
   - iOS and Android support
   - Real-time updates
   - Offline capabilities

### Data Flow

```
Mobile App → Backend API → Queues → Workers → AI Agents
                ↓
            Database
                ↓
            S3 Storage
```

### Technology Stack

- **Backend**: NestJS, TypeScript, Prisma, PostgreSQL
- **Mobile**: React Native, TypeScript
- **AI**: LangChain, OpenAI
- **Infrastructure**: Docker, Kubernetes, Terraform
- **Queue**: Redis, Bull

## 📦 Deployment

Services are containerized and deployed on Kubernetes with horizontal scaling capabilities.
