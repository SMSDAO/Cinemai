import Link from "next/link";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Pricing Plans</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include access to our AI agents.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Free Plan */}
          <NeoGlowCard glow={false}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Free</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">Perfect for trying out the platform</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">5 scripts per month</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">No video generation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">No auto-posting</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Basic analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Community support</span>
              </li>
            </ul>

            <NeoGlowButton variant="outline" className="w-full">
              Current Plan
            </NeoGlowButton>
          </NeoGlowCard>

          {/* Pro Plan */}
          <NeoGlowCard className="border-primary relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
              Most Popular
            </Badge>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Pro</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For serious content creators</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Unlimited scripts</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">10 videos per month</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Auto-posting to all platforms</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Custom avatars</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Brand kit</span>
              </li>
            </ul>

            <NeoGlowButton className="w-full">
              Upgrade to Pro
            </NeoGlowButton>
          </NeoGlowCard>

          {/* Scale Plan */}
          <NeoGlowCard glow={false}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Scale</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For agencies and teams</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Everything in Pro</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">50 videos per month</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Priority processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">White-label options</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Team collaboration</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">API access</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-sm">Dedicated support</span>
              </li>
            </ul>

            <NeoGlowButton variant="outline" className="w-full">
              Contact Sales
            </NeoGlowButton>
          </NeoGlowCard>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <NeoGlowCard glow={false}>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately,
                and we'll prorate the charges.
              </p>
            </NeoGlowCard>

            <NeoGlowCard glow={false}>
              <h3 className="font-semibold mb-2">What happens if I exceed my video limit?</h3>
              <p className="text-sm text-muted-foreground">
                You can purchase additional videos at $5 each, or upgrade to a higher plan
                for more monthly videos.
              </p>
            </NeoGlowCard>

            <NeoGlowCard glow={false}>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">
                The Free plan allows you to explore the platform with limited features.
                Pro and Scale plans come with a 14-day money-back guarantee.
              </p>
            </NeoGlowCard>

            <NeoGlowCard glow={false}>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards via Stripe, including Visa, Mastercard,
                American Express, and Discover.
              </p>
            </NeoGlowCard>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have more questions? <Link href="/guides/user" className="text-primary hover:underline">Read our User Guide</Link>
          </p>
          <Link href="/dashboard">
            <NeoGlowButton size="lg">Get Started</NeoGlowButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
