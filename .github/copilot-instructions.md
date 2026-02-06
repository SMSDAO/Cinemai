# GitHub Copilot — Global Repo Instructions

You are GitHub Copilot for the **CinemAi Neo** repository.

Your job is to generate code, documentation, tests, and structures that strictly follow the system defined in **ARCHITECTURE.md**.  
This file is the **single source of truth** for the entire product.

---

## 🔥 PRODUCT SUMMARY

CinemAi Neo is a **mobile-first AI production studio** with three pillars:

### 🎬 Cinema
- 1 photo + script → cinematic video  
- Multi-scene  
- Voiceover + music  
- Styles  
- Production Packs  

### 🎞 Shorts
- Hook generator  
- Caption engine  
- Multi-format (9:16, 1:1, 16:9)  
- Brand kit  
- Variants  

### 📈 Growth
- Publish to TikTok, Instagram, YouTube, X  
- Schedule posts  
- Track analytics  
- Insights  

### 💳 Monetization
- Free tier  
- $1 Trips  
- $49/mo Pro  

---

## 🧠 CORE RULES FOR COPILOT

### 1. **Always follow `ARCHITECTURE.md`**
- Use the services, pipelines, agents, DB tables, and flows exactly as defined.
- Do not invent new patterns unless the user explicitly requests them.

### 2. **Respect the System Architecture**
- Clients → API Gateway → Microservices → Queues → Workers → AI Agents → Storage → DB → Oracle Mirror → Social APIs.

### 3. **Respect the Microservices**
- AUTH  
- USER  
- BILLING  
- CINEMA  
- SHORTS  
- GROWTH  
- BRAND KIT  
- ORACLE BRIDGE  

Each service has its own domain and must not leak responsibilities.

### 4. **Respect the Pipelines**

#### Cinema Pipeline
1. Ingest  
2. Script Understanding  
3. Scene Planning  
4. Visual Generation  
5. Audio Generation  
6. Assembly  
7. Rendering  
8. Delivery  

#### Shorts Pipeline
1. Idea → Hooks  
2. Hook Selection  
3. Variant Planning  
4. Caption Engine  
5. Rendering  
6. Delivery  

#### Growth Pipeline
1. Publish  
2. Schedule  
3. Metrics  
4. Insights  

### 5. **Respect the AI Agents**

**Cinema Agents:**
- Ingest  
- Script Understanding  
- Scene Planner  
- Visual Generator  
- Audio  
- Assembly  
- Render  

**Shorts Agents:**
- Hook Generator  
- Variant Planner  
- Caption Engine  
- Shorts Render  

**Growth Agents:**
- Growth Optimizer  
- Analytics  

Each agent has:
- System prompt  
- Task template  
- Inputs  
- Outputs  
- Validation rules  

### 6. **Respect the Database Schema**

Use the tables exactly as defined:
- users  
- productions  
- assets  
- shorts  
- short_variants  
- social_accounts  
- social_posts  
- social_metrics  
- brand_kits  
- trips  
- payments  
- subscriptions  

### 7. **Respect the API Surface**

**Auth:**
- `POST /auth/signup`
- `POST /auth/login`

**Cinema:**
- `POST /productions`
- `POST /productions/:id/run`

**Shorts:**
- `POST /shorts`
- `POST /shorts/:id/hooks`
- `POST /shorts/:id/variants`

**Growth:**
- `POST /social/posts`
- `GET /analytics/shorts`

### 8. **Respect the Mobile App Architecture**

React Native with Neo Glow UI:
- Home  
- Cinema  
- Shorts  
- Growth  
- Brand Kit  
- Billing  
- Account  
- Onboarding  

### 9. **Respect the UI Component Library**

Use the defined components:
- NeoGlowButton  
- NeoGlowCard  
- UploadBox  
- StylePicker  
- CaptionPreview  
- AnalyticsCharts  
- Modals  
- Navigation  

### 10. **Respect the Design Tokens**
- Colors  
- Typography  
- Spacing  
- Radii  
- Glow  
- Shadows  
- Motion  
- Accessibility  

### 11. **Respect the Folder Structure**

```
cinemai-neo/
  backend/
  mobile/
  agents/
  workers/
  infra/
  docs/
  scripts/
  config/
```

### 12. **Respect the Branding**

**Taglines:**
- Create with power.  
- Create with Neo.  
- Create cinema. Create shorts. Grow everywhere.  

**Voice:**
- Confident  
- Cinematic  
- Clear  
- No fluff  

### 13. **Respect the UX Flows**
- Cinema flow  
- Shorts flow  
- Growth flow  
- Billing flow  
- Brand kit flow  
- Onboarding  

### 14. **Respect the Marketing Layer**
- Website wireframe  
- Ad scripts  
- Email lifecycle  
- Push notifications  

---

## 🧩 HOW COPILOT SHOULD RESPOND

**When generating code:**
- Follow the architecture.
- Use the correct service.
- Use the correct DB tables.
- Use the correct API endpoints.
- Use the correct folder.
- Use the correct naming conventions.

**When generating UI:**
- Use Neo Glow components.
- Use design tokens.
- Follow UX flows.

**When generating backend logic:**
- Use queues, workers, and agents.
- Follow pipelines exactly.

**When generating docs:**
- Align with `ARCHITECTURE.md`.

**When unsure:**
- Default to the patterns defined in this architecture.

---

## 🎯 GOAL

Maintain **clarity**, **consistency**, **reproducibility**, and **architecture‑driven development** across the entire CinemAi Neo codebase.

This is the **official Copilot instruction set** for this repository.
