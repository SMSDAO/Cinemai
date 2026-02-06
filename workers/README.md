# Workers - CinemAi Neo

Background workers for processing queues and async tasks.

## 🏗️ Structure

Workers are organized by domain and task type:
- **Cinema workers** - Handle cinema production pipeline tasks
- **Shorts workers** - Process shorts generation and rendering
- **Social workers** - Manage social media automation

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run all workers
npm start

# Run specific worker
npm run worker:cinema.ingest
```

## 📦 Tech Stack

- Bull / BullMQ (queue management)
- Redis (queue storage)
- TypeScript
- Node.js
