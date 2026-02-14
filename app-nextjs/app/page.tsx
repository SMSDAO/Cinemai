import Link from "next/link";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          <span className="text-gradient">AI Agents for Pro Video Campaigns</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Generate professional promo videos, orchestrate AI video generation with virtual presenters,
          and automate social media campaigns—all powered by intelligent AI agents.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <NeoGlowButton size="lg">Start Free</NeoGlowButton>
          </Link>
          <Link href="/pricing">
            <NeoGlowButton variant="outline" size="lg">View Pricing</NeoGlowButton>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <NeoGlowCard 
            title="1. Script"
            description="AI-powered script generation"
          >
            <p className="text-muted-foreground">
              Describe your product, target audience, and tone. Our Script Agent 
              generates professional scripts with hooks, body sections, and CTAs.
            </p>
          </NeoGlowCard>

          <NeoGlowCard 
            title="2. Video"
            description="Virtual presenter videos"
          >
            <p className="text-muted-foreground">
              Choose an avatar style and language. Our Video Agent orchestrates 
              AI video generation with virtual presenters bringing your script to life.
            </p>
          </NeoGlowCard>

          <NeoGlowCard 
            title="3. Campaign"
            description="Automated social posting"
          >
            <p className="text-muted-foreground">
              Schedule posts across Twitter/X and Farcaster. Our Campaign Agent 
              generates platform-specific captions and handles publishing.
            </p>
          </NeoGlowCard>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NeoGlowCard glow={false}>
            <h3 className="font-semibold mb-2">Multi-Agent Models</h3>
            <p className="text-sm text-muted-foreground">
              Script, Video, Campaign, and Analytics agents working together
            </p>
          </NeoGlowCard>

          <NeoGlowCard glow={false}>
            <h3 className="font-semibold mb-2">Social Sync</h3>
            <p className="text-sm text-muted-foreground">
              Connect Twitter/X and Farcaster for timeline sync and analytics
            </p>
          </NeoGlowCard>

          <NeoGlowCard glow={false}>
            <h3 className="font-semibold mb-2">Stripe Billing</h3>
            <p className="text-sm text-muted-foreground">
              Flexible plans with subscriptions and usage-based billing
            </p>
          </NeoGlowCard>

          <NeoGlowCard glow={false}>
            <h3 className="font-semibold mb-2">Policy Enforcement</h3>
            <p className="text-sm text-muted-foreground">
              Built-in guardrails for ethical AI and likeness compliance
            </p>
          </NeoGlowCard>
        </div>
      </section>

      {/* Video Examples */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Video Examples</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <NeoGlowCard>
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Product Launch</span>
            </div>
            <p className="text-sm text-muted-foreground">30s • Professional • Tech</p>
          </NeoGlowCard>

          <NeoGlowCard>
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">UGC Style</span>
            </div>
            <p className="text-sm text-muted-foreground">45s • Casual • Lifestyle</p>
          </NeoGlowCard>

          <NeoGlowCard>
            <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">Testimonial</span>
            </div>
            <p className="text-sm text-muted-foreground">60s • Authentic • Service</p>
          </NeoGlowCard>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <NeoGlowCard title="Free" glow={false}>
            <div className="mb-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ Limited scripts</li>
              <li>✓ No video generation</li>
              <li>✓ No auto-posting</li>
            </ul>
          </NeoGlowCard>

          <NeoGlowCard title="Pro" className="border-primary">
            <div className="mb-4">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ Unlimited scripts</li>
              <li>✓ 10 videos/month</li>
              <li>✓ Auto-posting</li>
              <li>✓ Analytics</li>
            </ul>
          </NeoGlowCard>

          <NeoGlowCard title="Scale" glow={false}>
            <div className="mb-4">
              <span className="text-3xl font-bold">$199</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ Everything in Pro</li>
              <li>✓ 50 videos/month</li>
              <li>✓ Priority processing</li>
              <li>✓ White-label options</li>
            </ul>
          </NeoGlowCard>
        </div>
        <div className="text-center mt-8">
          <Link href="/pricing">
            <NeoGlowButton>View Full Pricing</NeoGlowButton>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of creators using AI agents to scale their video campaigns
        </p>
        <Link href="/dashboard">
          <NeoGlowButton size="lg">Start Free</NeoGlowButton>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2026 Cinemai Pro Agents. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/policy/likeness" className="hover:text-primary">
                Likeness & Consent Policy
              </Link>
              <Link href="/guides/user" className="hover:text-primary">
                User Guide
              </Link>
              <Link href="/guides/dev" className="hover:text-primary">
                Dev Guide
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
