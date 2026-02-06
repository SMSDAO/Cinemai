1. Production plan JSON (your internal “movie build spec”)

This is what the AI pipeline produces after ingest + script understanding + planning.
Everything downstream (asset gen, assembly, render) reads from this.

{
  "production_id": "uuid",
  "mode": "simple", 
  "style": "neo_glow",
  "duration_seconds": 120,
  "resolution": {
    "width": 1920,
    "height": 1080,
    "fps": 30
  },
  "script": {
    "raw_text": "Full script here...",
    "language": "en",
    "scenes": [
      {
        "scene_id": "scene_1",
        "title": "Opening shot",
        "description": "Introduce main character in neon city.",
        "beats": [
          {
            "beat_id": "beat_1",
            "start_time": 0.0,
            "end_time": 5.0,
            "voiceover_text": "In a city of endless light...",
            "on_screen_text": "In a city of endless light...",
            "emotion": "mysterious"
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
            "start_time": 0.0,
            "end_time": 5.0,
            "source": {
              "type": "user_image_or_generated",
              "asset_id": "optional_asset_uuid",
              "generation_prompt": "Cyberpunk city, neon lights, main character silhouette..."
            },
            "camera": {
              "movement": "slow_push_in",
              "framing": "medium_shot"
            },
            "overlays": [
              {
                "type": "text",
                "text": "In a city of endless light...",
                "position": "bottom_center"
              }
            ]
          }
        ]
      }
    ]
  },
  "audio_plan": {
    "voice": {
      "voice_id": "neo_narrator_01",
      "language": "en",
      "lines": [
        {
          "beat_id": "beat_1",
          "text": "In a city of endless light..."
        }
      ]
    },
    "music": {
      "mood": "dark_synthwave",
      "tracks": [
        {
          "track_id": "bgm_1",
          "start_time": 0.0,
          "end_time": 120.0
        }
      ]
    },
    "sfx": []
  },
  "constraints": {
    "lock_script_timing": false,
    "max_runtime_seconds": 180
  }
}


Shorts can use a lighter version of this spec per variant.

---

2. Shorts plan JSON (per short variant)

{
  "short_id": "uuid",
  "variant_id": "uuid",
  "format": "9_16",
  "duration_seconds": 30,
  "hook": {
    "text": "You’re wasting your content like this...",
    "emphasis_words": ["wasting", "content"],
    "on_screen_style": "bold_caps"
  },
  "script": {
    "lines": [
      {
        "start_time": 0.0,
        "end_time": 4.0,
        "text": "You’re wasting your content like this...",
        "caption": "You’re wasting your content like this...",
        "emojis": ["⚠️", "📉"]
      }
    ]
  },
  "visual_plan": {
    "source": {
      "type": "talking_head_or_broll_or_generated",
      "asset_id": null,
      "generation_prompt": "Neo glow background, creator talking to camera..."
    },
    "captions_style": {
      "font_style": "bold",
      "primary_color": "#00F0FF",
      "highlight_color": "#FF2EF5"
    }
  },
  "audio_plan": {
    "voice": {
      "voice_id": "creator_voice_or_ai",
      "language": "en"
    },
    "music": {
      "mood": "upbeat",
      "duck_under_voice": true
    }
  },
  "publish_suggestions": {
    "title": "Stop wasting your content like this",
    "caption": "You’re posting once and praying. Here’s how to turn 1 idea into 20 pieces. #content #shorts",
    "hashtags": ["#content", "#shorts", "#growth"]
  }
}


---

3. API surface (v1, practical and complete)

Auth

• POST /auth/signup• Body: email, password (or OAuth token).
• Result: user, tokens.

• POST /auth/login• Body: email, password.
• Result: user, tokens.

• POST /auth/logout


---

Users & account

• GET /me• Returns user profile, plan, trips_balance.

• GET /me/billing• Plan, subscriptions, recent payments.



---

Trips & payments

• POST /trips/use• Body: { "production_id": "...", "type": "cinema" | "shorts_bundle" }
• Decrements trips, validates.

• POST /payments/create-intent• For Stripe/web.

• POST /iap/verify• For Apple/Google receipts.

• POST /webhooks/stripe
• POST /webhooks/iap


---

Productions (Cinema)

• POST /productions• Body: mode (simple/pro), title, style, script_text (optional).
• Result: production record.

• POST /productions/:id/assets• Upload files (photo, zip, etc.).
• Backend classifies into assets.

• POST /productions/:id/plan• Triggers AI planning → generates Production Plan JSON.
• Stores it.

• POST /productions/:id/run• Consumes a trip.
• Runs full pipeline → render.
• Updates status.

• GET /productions• List user productions.

• GET /productions/:id• Details, status, final_video_url.



---

Shorts

• POST /shorts• Body: source_type (idea, script, video, production), source_payload.
• Creates a shorts record.

• POST /shorts/:id/hooks• Generates multiple hook-first scripts.
• Result: list of candidate hooks.

• POST /shorts/:id/variants• Body: chosen hooks, formats.
• Generates Shorts Plan JSON per variant.

• POST /shorts/:id/run• Uses trip(s) if needed.
• Renders all selected variants.

• GET /shorts• List user shorts.

• GET /shorts/:id• Details, variants, status.



---

Social & growth

• POST /social/accounts• Connect platform (after OAuth).

• GET /social/accounts• List connected accounts.

• POST /social/posts• Body: short_variant_id, platform(s), title, caption, hashtags, scheduled_at.
• Creates social_posts entries.

• GET /social/posts• List scheduled/posted.

• GET /social/posts/:id• Status, metrics summary.

• POST /webhooks/social/:platform• For platform callbacks if needed.

• GET /analytics/shorts• Aggregated metrics per short/variant.



---

Brand kit

• GET /brand-kit
• POST /brand-kit• Body: primary_color, secondary_color, font_style, logo_asset_id, caption_style_json.



---

4. Pipelines as jobs (how backend actually runs it)

You can model each as queue jobs:

• cinema.ingest
• cinema.plan
• cinema.generate_assets
• cinema.assemble
• cinema.render
• shorts.generate_hooks
• shorts.plan_variants
• shorts.render_variants
• social.schedule_post
• social.publish_post
• social.fetch_metrics


Each job reads/writes from the DB + storage using the JSON specs above.

---

5. How this all ties back to your goals

• Operator-grade: Everything is spec-driven (Production Plan JSON, Shorts Plan JSON).
• User-simple: On mobile, it’s just “Cinema / Shorts / Growth” with clear flows.
• Monetizable: Trips + Pro, with a real reason to upgrade (scale + growth).
• Extensible: Oracle bridge, more agents, more styles, more platforms—without breaking the core.