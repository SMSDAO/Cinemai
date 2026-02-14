import Link from "next/link";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your activity overview.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/scripts/new">
            <NeoGlowCard className="cursor-pointer hover:scale-105 transition-transform">
              <h3 className="font-semibold mb-2">Create Script</h3>
              <p className="text-sm text-muted-foreground">Generate a new video script with AI</p>
            </NeoGlowCard>
          </Link>

          <Link href="/videos/new">
            <NeoGlowCard className="cursor-pointer hover:scale-105 transition-transform">
              <h3 className="font-semibold mb-2">Generate Video</h3>
              <p className="text-sm text-muted-foreground">Create video from your scripts</p>
            </NeoGlowCard>
          </Link>

          <Link href="/campaigns/new">
            <NeoGlowCard className="cursor-pointer hover:scale-105 transition-transform">
              <h3 className="font-semibold mb-2">Launch Campaign</h3>
              <p className="text-sm text-muted-foreground">Publish to social media</p>
            </NeoGlowCard>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <NeoGlowCard glow={false}>
            <h4 className="text-sm text-muted-foreground mb-1">Scripts</h4>
            <p className="text-3xl font-bold">12</p>
          </NeoGlowCard>

          <NeoGlowCard glow={false}>
            <h4 className="text-sm text-muted-foreground mb-1">Videos</h4>
            <p className="text-3xl font-bold">5</p>
          </NeoGlowCard>

          <NeoGlowCard glow={false}>
            <h4 className="text-sm text-muted-foreground mb-1">Campaigns</h4>
            <p className="text-3xl font-bold">8</p>
          </NeoGlowCard>

          <NeoGlowCard glow={false}>
            <h4 className="text-sm text-muted-foreground mb-1">Total Reach</h4>
            <p className="text-3xl font-bold">2.4K</p>
          </NeoGlowCard>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Scripts</h2>
            <div className="space-y-4">
              <NeoGlowCard glow={false}>
                <h3 className="font-semibold">Product Launch - AI Writing Tool</h3>
                <p className="text-sm text-muted-foreground">Created 2 hours ago</p>
                <div className="mt-2">
                  <Link href="/scripts/1">
                    <NeoGlowButton variant="outline" size="sm">View</NeoGlowButton>
                  </Link>
                </div>
              </NeoGlowCard>

              <NeoGlowCard glow={false}>
                <h3 className="font-semibold">UGC Style - SaaS Review</h3>
                <p className="text-sm text-muted-foreground">Created 1 day ago</p>
                <div className="mt-2">
                  <Link href="/scripts/2">
                    <NeoGlowButton variant="outline" size="sm">View</NeoGlowButton>
                  </Link>
                </div>
              </NeoGlowCard>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Videos</h2>
            <div className="space-y-4">
              <NeoGlowCard glow={false}>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 bg-muted rounded flex items-center justify-center text-sm">
                    Video
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Product Launch Video</h3>
                    <p className="text-sm text-muted-foreground">Status: Ready</p>
                  </div>
                </div>
                <div className="mt-2">
                  <Link href="/videos/1">
                    <NeoGlowButton variant="outline" size="sm">View</NeoGlowButton>
                  </Link>
                </div>
              </NeoGlowCard>

              <NeoGlowCard glow={false}>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 bg-muted rounded flex items-center justify-center text-sm">
                    Video
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">UGC Review Video</h3>
                    <p className="text-sm text-muted-foreground">Status: Processing</p>
                  </div>
                </div>
                <div className="mt-2">
                  <NeoGlowButton variant="outline" size="sm" disabled>Processing...</NeoGlowButton>
                </div>
              </NeoGlowCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
