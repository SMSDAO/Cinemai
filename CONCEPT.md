🚀 CinemAi Neo — Unified Master Specification (Complete System)

Below is the entire system, end‑to‑end, including:

• Product concept
• User flows
• Cinema mode
• Shorts mode
• Growth mode
• Pricing
• Database schema
• API endpoints
• AI pipelines
• JSON specs
• UI system
• Payments
• Oracle bridge
• Mobile app submission compliance
• Brand kit
• Everything from previous messages, merged cleanly


This is the full architecture.

---

1. 🎬 Product Concept (Final)

CinemAi Neo is a mobile-first AI production studio that lets users:

A. Cinema Mode

• Upload 1 photo + script → cinematic video
• Upload Production Packs (up to 10 folders: assets, code, contracts, images, audio, etc.) → full cinematic production


B. Shorts Mode

• Generate hook-first short videos from:• Ideas
• Long scripts
• Existing videos
• Past productions



C. Growth Mode

• Auto-generate:• Titles
• Captions
• Hashtags
• Thumbnails

• Auto-post to:• TikTok
• Instagram
• YouTube
• X

• Schedule posts
• Track analytics
• Recommend new hooks based on performance


D. Monetization

• Free tier
• $1 Trip (1 cinema production or 1 short bundle)
• $49/month Pro (unlimited drafts, 30–60 trips, growth tools, analytics, brand kit)


---

2. 📱 Mobile App UX (Final)

Home Screen

Three giant cards:

1. Cinema
2. Shorts
3. Growth


Cinema Flow

• Simple (photo + script)
• Pro (Production Pack)
• Style selection
• Cost preview
• Pay/use trip
• Render
• “Create Shorts from this”


Shorts Flow

• Idea → Hooks → Variants → Render
• Auto-captions, emojis, brand kit
• Multi-format (9:16, 1:1, 16:9)
• “Publish & Schedule”


Growth Flow

• Connect accounts
• Schedule posts
• View analytics
• Hook suggestions


---

3. 🧠 AI Pipelines (Final)

Cinema Pipeline

1. Ingest
2. Classify assets
3. Script understanding
4. Production Plan JSON
5. Asset generation
6. Assembly
7. Render
8. Delivery


Shorts Pipeline

1. Idea → Hook generation
2. Script generation
3. Visual plan
4. Caption engine
5. Variant generation
6. Render
7. Publish


Growth Pipeline

1. Title/caption/hashtag generation
2. Scheduling
3. Posting
4. Metrics harvesting
5. Performance scoring
6. Hook recommendations


---

4. 📦 Production Plan JSON (Final)

{
  "production_id": "uuid",
  "mode": "simple",
  "style": "neo_glow",
  "duration_seconds": 120,
  "resolution": { "width": 1920, "height": 1080, "fps": 30 },
  "script": {
    "raw_text": "Full script...",
    "language": "en",
    "scenes": [
      {
        "scene_id": "scene_1",
        "title": "Opening",
        "beats": [
          {
            "beat_id": "beat_1",
            "start_time": 0,
            "end_time": 5,
            "voiceover_text": "In a city of endless light...",
            "on_screen_text": "In a city of endless light..."
          }
        ]
      }
    ]
  },
  "visual_plan": {
    "global_style": "neo_glow",
    "scenes": [
      {
        "scene_id": "scene_1",
        "shots": [
          {
            "shot_id": "shot_1",
            "start_time": 0,
            "end_time": 5,
            "source": {
              "type": "user_image_or_generated",
              "generation_prompt": "Cyberpunk neon city..."
            },
            "camera": { "movement": "slow_push_in" }
          }
        ]
      }
    ]
  },
  "audio_plan": {
    "voice": {
      "voice_id": "neo_narrator_01",
      "lines": [
        { "beat_id": "beat_1", "text": "In a city of endless light..." }
      ]
    },
    "music": { "mood": "dark_synthwave" }
  }
}


---

5. 🎞️ Shorts Plan JSON (Final)

{
  "short_id": "uuid",
  "variant_id": "uuid",
  "format": "9_16",
  "duration_seconds": 30,
  "hook": {
    "text": "You’re wasting your content like this...",
    "emphasis_words": ["wasting", "content"]
  },
  "script": {
    "lines": [
      {
        "start_time": 0,
        "end_time": 4,
        "text": "You’re wasting your content like this...",
        "caption": "You’re wasting your content like this...",
        "emojis": ["⚠️", "📉"]
      }
    ]
  },
  "visual_plan": {
    "source": {
      "type": "talking_head_or_generated",
      "generation_prompt": "Neo glow background..."
    }
  },
  "audio_plan": {
    "voice": { "voice_id": "creator_voice_or_ai" },
    "music": { "mood": "upbeat" }
  },
  "publish_suggestions": {
    "title": "Stop wasting your content",
    "caption": "Turn 1 idea into 20 pieces. #content #shorts",
    "hashtags": ["#content", "#shorts"]
  }
}


---

6. 🗄️ Database Schema (Final)

Users

• id
• email
• plan
• trips_balance


Productions

• id
• user_id
• mode
• status
• style
• final_video_url


Assets

• id
• production_id
• type
• role
• storage_url


Shorts

• id
• user_id
• production_id (nullable)
• source_type
• status


Short Variants

• id
• short_id
• hook_text
• caption_text
• hashtags
• format
• video_url
• performance_score


Social Accounts

• id
• user_id
• platform
• tokens


Social Posts

• id
• short_variant_id
• platform
• status
• scheduled_at
• posted_at


Social Metrics

• id
• social_post_id
• views
• likes
• comments
• shares
• watch_time_seconds


Brand Kits

• id
• user_id
• primary_color
• font_style
• logo_asset_id


Trips / Payments / Subscriptions

(As previously defined)

---

7. 🌐 API Endpoints (Final)

Auth

• POST /auth/signup
• POST /auth/login
• POST /auth/logout


User

• GET /me
• GET /me/billing


Trips

• POST /trips/use


Payments

• POST /payments/create-intent
• POST /iap/verify
• Webhooks


Cinema

• POST /productions
• POST /productions/:id/assets
• POST /productions/:id/plan
• POST /productions/:id/run
• GET /productions
• GET /productions/:id


Shorts

• POST /shorts
• POST /shorts/:id/hooks
• POST /shorts/:id/variants
• POST /shorts/:id/run
• GET /shorts
• GET /shorts/:id


Growth

• POST /social/accounts
• GET /social/accounts
• POST /social/posts
• GET /social/posts
• GET /social/posts/:id
• GET /analytics/shorts


Brand Kit

• GET /brand-kit
• POST /brand-kit


---

8. 🎨 Neo Glow UI System (Final)

Colors

• Background: #05060A
• Primary: Electric Cyan #00F0FF
• Secondary: Magenta #FF2EF5


Components

• Glow buttons
• Rounded cards
• Soft neon shadows
• Timeline with glowing segments


---

9. 💳 Payments (Final)

In-App

• Apple IAP
• Google Play Billing


Web

• Stripe
• Crypto via Coinbase Commerce / BitPay


Trips

• 1 Trip = 1 cinema production or 1 short bundle


Pro

• $49/month
• Unlimited drafts
• 30–60 trips
• Growth tools
• Brand kit
• Analytics


---

10. 🏛️ Oracle Bridge (Optional Enterprise Mirroring Integration)

Primary DB: Postgres

Optional Bridge Service:

• When configured, mirrors:
  • Users
  • Productions
  • Shorts
  • Metrics

• Into Oracle XE / Free Tier
• For enterprise reporting or external analytics consumers
• Not required for standard operation


---

11. 📤 App Store / Play Store Compliance (Final)

• Clear privacy policy
• Data deletion
• No external payments for digital goods inside app
• NSFW filters
• User responsibility for uploads


---

12. 🎯 This is the complete system

This unified blueprint covers the full CinemAi Neo platform:

• Your Production Pack concept
• Your Trips + Pro model
• Your Neo Glow UI
• Optional Oracle enterprise mirroring integration
• Your mobile-first UX
• Your cinematic pipeline
• Your shorts pipeline
• Your growth engine


…all merged into one unified, production-ready blueprint.