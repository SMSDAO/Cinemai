# AI Agents - CinemAi Neo

AI agents for automating cinema production, shorts generation, and growth strategies.

## 🏗️ Structure

```
agents/
├── cinema/              # Cinema production agents
│   ├── cinema.agent.ts           # Main orchestrator
│   ├── ingest.agent.ts           # Photo analysis & script parsing
│   ├── script-understanding.agent.ts  # NLP & scene detection
│   ├── scene-planner.agent.ts    # Shot planning & cinematography
│   ├── visual-generator.agent.ts # AI video generation
│   ├── audio.agent.ts            # TTS & music selection
│   ├── assembly.agent.ts         # Video editing & transitions
│   └── render.agent.ts           # Video encoding & compression
│
├── shorts/              # Shorts generation agents
│   ├── shorts.agent.ts           # Main orchestrator
│   ├── hook-generator.agent.ts   # Viral hook generation
│   ├── variant-planner.agent.ts  # A/B test planning
│   ├── caption-engine.agent.ts   # Word-level timing & styling
│   └── shorts-render.agent.ts    # Multi-format rendering
│
├── growth/              # Growth & analytics agents
│   ├── growth.agent.ts           # Main orchestrator
│   ├── growth-optimizer.agent.ts # Optimal timing & hashtags
│   └── analytics.agent.ts        # Pattern recognition & insights
│
└── shared/              # Shared utilities
    ├── base-agent.ts             # Base agent class
    ├── prompt-templates.ts       # Reusable prompts
    ├── validation.ts             # Input/output validation
    └── types.ts                  # Shared type definitions
```

## 🤖 Agent Types

### Cinema Agents

**Pipeline Flow**: Ingest → Script Understanding → Scene Planning → Visual Generation → Audio Generation → Assembly → Rendering → Delivery

1. **Ingest Agent**: Analyzes photos and parses scripts
2. **Script Understanding Agent**: NLP analysis, scene detection, character identification
3. **Scene Planner Agent**: Creates detailed shot lists with cinematography rules
4. **Visual Generator Agent**: Generates video clips using AI (Runway, Pika)
5. **Audio Agent**: TTS voiceover synthesis and music selection
6. **Assembly Agent**: Combines clips, audio, and effects into timeline
7. **Render Agent**: Final video encoding and compression

### Shorts Agents

**Pipeline Flow**: Idea → Hooks → Hook Selection → Variant Planning → Caption Engine → Rendering → Delivery

1. **Hook Generator Agent**: Generates 5-10 viral hook variants
2. **Variant Planner Agent**: Plans A/B test variants with different styles
3. **Caption Engine Agent**: Word-level timing and styling for captions
4. **Shorts Render Agent**: Multi-format rendering (9:16, 1:1, 16:9)

### Growth Agents

**Pipeline Flow**: Publish → Schedule → Metrics → Insights

1. **Growth Optimizer Agent**: Determines optimal posting times and hashtag strategies
2. **Analytics Agent**: Pattern recognition and actionable recommendations

## 🚀 Usage Examples

### Cinema Production

```typescript
import { CinemaAgent } from './cinema/cinema.agent';

const cinemaAgent = new CinemaAgent();

const result = await cinemaAgent.executeFullPipeline({
  photoUrl: 's3://photos/user123/photo.jpg',
  script: 'A young woman walks through a bustling city...',
  style: 'cinematic',
  productionId: 'prod_123',
});

console.log('Video URL:', result.videoUrl);
```

### Shorts Generation

```typescript
import { ShortsAgent } from './shorts/shorts.agent';

const shortsAgent = new ShortsAgent();

const result = await shortsAgent.executeFullPipeline({
  topic: 'AI productivity hacks',
  videoUrl: 's3://videos/base.mp4',
  audioUrl: 's3://audio/voiceover.mp3',
  format: '9:16',
  targetPlatforms: ['tiktok', 'instagram'],
  shortId: 'short_123',
});

console.log('Hooks:', result.hooks);
console.log('Output:', result.outputUrl);
```

### Growth Optimization

```typescript
import { GrowthAgent } from './growth/growth.agent';

const growthAgent = new GrowthAgent();

// Optimize publishing
const strategy = await growthAgent.optimizePublishing({
  contentType: 'short',
  contentId: 'short_123',
  platforms: ['tiktok', 'instagram', 'youtube'],
  targetAudience: 'entrepreneurs',
});

console.log('Best platform:', strategy.data.bestPlatform);

// Analyze performance
const analytics = await growthAgent.analyzePerformance({
  userId: 'user_123',
  platforms: ['tiktok', 'instagram'],
});

console.log('Insights:', analytics.data.insights);
```

## 🧩 Architecture

All agents extend the `BaseAgent` class which provides:
- Standard `process()` method interface
- Input validation
- Error handling
- Logging
- AI model call abstraction
- Execution time tracking

### Agent Interface

```typescript
interface AgentInput {
  [key: string]: any;
}

interface AgentOutput {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    processingTime?: number;
    modelUsed?: string;
    tokensUsed?: number;
  };
}

abstract class BaseAgent {
  abstract process(input: AgentInput): Promise<AgentOutput>;
  protected abstract validateInput(input: AgentInput): void;
}
```

## 🔧 Configuration

Agents use placeholder implementations for AI model calls. To integrate with real AI services:

1. Update `BaseAgent.callAIModel()` to integrate with OpenAI, Anthropic, etc.
2. Update video generation calls to integrate with Runway, Pika Labs, etc.
3. Update TTS calls to integrate with ElevenLabs, OpenAI TTS, etc.
4. Add API keys to environment variables

## 🧪 Testing

```bash
# Run all tests
npm test

# Test specific agent
npm test cinema.agent

# Test with coverage
npm test -- --coverage
```

## 📊 Monitoring

All agents include logging and execution tracking:
- Input validation results
- Processing steps
- Execution time
- Error details
- Token usage (when integrated)

## 🔐 Security

- Input validation on all agents
- No secrets in code (use environment variables)
- Rate limiting on AI model calls
- Resource usage monitoring

## 📝 Notes

- Agents are designed to be stateless
- All processing is asynchronous
- Agents can be called independently or as part of pipelines
- Mock implementations are used for AI calls (ready for integration)

## 🎯 Next Steps

1. Integrate real AI services (OpenAI, Runway, ElevenLabs)
2. Add comprehensive unit tests
3. Implement retry logic for failed operations
4. Add metrics and monitoring
5. Optimize token usage and costs

---

**Last Updated**: 2026-02-06  
**Version**: 1.0.0  
**Status**: Scaffolding Complete ✅
