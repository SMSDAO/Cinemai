import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { Settings, User, Bell, Lock, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="display-name" className="text-sm text-muted-foreground mb-1 block">Display Name</label>
                <input
                  id="display-name"
                  type="text"
                  defaultValue="Alice Chen"
                  className="w-full bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-muted-foreground mb-1 block">Email</label>
                <input
                  id="email"
                  type="email"
                  defaultValue="alice@example.com"
                  className="w-full bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <NeoGlowButton size="sm">Save Changes</NeoGlowButton>
            </div>
          </NeoGlowCard>

          {/* Notifications */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "New releases & features", defaultChecked: true },
                { label: "Account activity alerts", defaultChecked: true },
                { label: "Weekly digest email", defaultChecked: false },
                { label: "Marketing communications", defaultChecked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={item.defaultChecked} className="rounded" />
                  <span className="text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          </NeoGlowCard>

          {/* Security */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="text-sm text-muted-foreground mb-1 block">Current Password</label>
                <input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="text-sm text-muted-foreground mb-1 block">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <NeoGlowButton size="sm" variant="outline">Update Password</NeoGlowButton>
            </div>
          </NeoGlowCard>

          {/* Appearance */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Appearance</h2>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 p-3 rounded-lg bg-black border-2 border-primary text-sm font-medium text-center neo-glow">
                Dark (Neo Glow)
              </button>
              <button className="flex-1 p-3 rounded-lg bg-white border-2 border-border/50 text-black text-sm font-medium text-center">
                Light
              </button>
            </div>
          </NeoGlowCard>

          {/* Language */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Language & Region</h2>
            </div>
            <select
              className="w-full bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm"
              defaultValue="en-US"
              aria-label="Language"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="ja-JP">Japanese</option>
            </select>
          </NeoGlowCard>
        </div>
      </div>
    </div>
  );
}
