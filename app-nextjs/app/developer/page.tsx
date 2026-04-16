import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import {
  Code2,
  Activity,
  Terminal,
  GitBranch,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  RefreshCw,
  BarChart3,
  Layers,
  FileText,
} from "lucide-react";

const apiMetrics = [
  { label: "Requests / min", value: "284", trend: "+8%", icon: Activity, color: "text-primary" },
  { label: "Error Rate", value: "0.4%", trend: "-0.1%", icon: AlertCircle, color: "text-red-400" },
  { label: "P95 Latency", value: "420ms", trend: "-12ms", icon: Zap, color: "text-yellow-400" },
  { label: "Rate Limit Hits", value: "12", trend: "today", icon: Globe, color: "text-accent" },
];

const recentLogs = [
  { level: "INFO", message: "Agent script job completed successfully", service: "script-agent", time: "0:00:01" },
  { level: "INFO", message: "New user session created", service: "auth", time: "0:00:04" },
  { level: "WARN", message: "Rate limit approaching for user_8923", service: "gateway", time: "0:00:12" },
  { level: "ERROR", message: "Video generation timeout after 30s", service: "video-agent", time: "0:00:31" },
  { level: "INFO", message: "Campaign published to 3 platforms", service: "campaign-agent", time: "0:01:02" },
  { level: "INFO", message: "Prisma migration check passed", service: "database", time: "0:02:15" },
  { level: "DEBUG", message: "Cache hit ratio: 78.4%", service: "cache", time: "0:02:40" },
];

const deployments = [
  { env: "Production", branch: "main", status: "success", commit: "8b1ab82", deployed: "12 min ago" },
  { env: "Staging", branch: "develop", status: "success", commit: "a3c5f91", deployed: "1 hr ago" },
  { env: "Preview", branch: "feature/admin", status: "building", commit: "e9d2b44", deployed: "In progress" },
];

const featureFlags = [
  { name: "beta_shorts", enabled: true, description: "Shorts generation (beta)" },
  { name: "neo_dashboard", enabled: true, description: "Neo Glow dashboard UI" },
  { name: "social_publish", enabled: false, description: "Social media publishing" },
  { name: "analytics_v2", enabled: false, description: "Advanced analytics engine" },
];

const logLevelColors: Record<string, string> = {
  INFO: "text-primary",
  WARN: "text-yellow-400",
  ERROR: "text-red-400",
  DEBUG: "text-muted-foreground",
};

export default function DeveloperDashboard() {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Developer Dashboard</h1>
            </div>
            <p className="text-muted-foreground">API monitoring, logs, and deployment diagnostics</p>
          </div>
          <div className="flex gap-3">
            <NeoGlowButton variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </NeoGlowButton>
            <NeoGlowButton size="sm">
              <Terminal className="h-4 w-4 mr-2" />
              Console
            </NeoGlowButton>
          </div>
        </div>

        {/* API Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {apiMetrics.map((m) => (
            <NeoGlowCard key={m.label} glow={false} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <m.icon className={`h-5 w-5 ${m.color}`} />
                <span className="text-xs text-muted-foreground">{m.trend}</span>
              </div>
              <p className="text-2xl font-bold font-mono">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </NeoGlowCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Live Logs */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Live Logs</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">streaming</span>
              </div>
            </div>
            <div className="bg-black/60 rounded-lg p-3 font-mono text-xs space-y-1.5 max-h-72 overflow-y-auto">
              {recentLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-muted-foreground flex-shrink-0">[{log.time}]</span>
                  <span className={`flex-shrink-0 font-bold ${logLevelColors[log.level] ?? "text-foreground"}`}>
                    {log.level.padEnd(5)}
                  </span>
                  <span className="text-accent flex-shrink-0">[{log.service}]</span>
                  <span className="text-foreground/80 break-all">{log.message}</span>
                </div>
              ))}
            </div>
          </NeoGlowCard>

          {/* Deployments */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Deployments</h2>
            </div>
            <div className="space-y-3">
              {deployments.map((d) => (
                <div key={d.env} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  {d.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  ) : d.status === "building" ? (
                    <RefreshCw className="h-5 w-5 text-yellow-400 animate-spin flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{d.env}</span>
                      <span className="font-mono text-xs text-muted-foreground">{d.branch}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">commit: {d.commit}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="h-3 w-3" />
                    {d.deployed}
                  </div>
                </div>
              ))}
            </div>
          </NeoGlowCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Feature Flags */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Feature Flags</h2>
            </div>
            <div className="space-y-3">
              {featureFlags.map((flag) => (
                <div key={flag.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-mono text-sm font-medium">{flag.name}</p>
                    <p className="text-xs text-muted-foreground">{flag.description}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      flag.enabled
                        ? "bg-green-400/10 text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {flag.enabled ? "ON" : "OFF"}
                  </div>
                </div>
              ))}
            </div>
          </NeoGlowCard>

          {/* API Endpoint Tester */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">API Tester</h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <select
                  className="bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm font-mono"
                  aria-label="HTTP method"
                  defaultValue="GET"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
                <input
                  type="text"
                  defaultValue="/api/health"
                  className="flex-1 bg-muted/50 border border-border/50 rounded-md px-3 py-2 text-sm font-mono"
                  aria-label="API endpoint"
                />
              </div>
              <NeoGlowButton size="sm" className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Send Request
              </NeoGlowButton>
              <div className="bg-black/60 rounded-lg p-3 font-mono text-xs min-h-24">
                <span className="text-green-400">200 OK</span>
                <pre className="text-foreground/70 mt-1">{JSON.stringify({ status: "ok", uptime: 99.9 }, null, 2)}</pre>
              </div>
            </div>
          </NeoGlowCard>
        </div>

        {/* Rate Limit Quota */}
        <NeoGlowCard glow={false}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Rate Limit Quota Usage</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Script API", used: 284, limit: 500 },
              { name: "Video API", used: 124, limit: 200 },
              { name: "Campaign API", used: 64, limit: 100 },
            ].map((quota) => {
              const pct = Math.round((quota.used / quota.limit) * 100);
              return (
                <div key={quota.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{quota.name}</span>
                    <span className="font-mono text-muted-foreground">
                      {quota.used}/{quota.limit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${pct > 80 ? "bg-red-400" : pct > 60 ? "bg-yellow-400" : "bg-primary neo-glow"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pct}% used</p>
                </div>
              );
            })}
          </div>
        </NeoGlowCard>

        {/* Environment Config */}
        <NeoGlowCard glow={false}>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Environment Configuration</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { key: "NODE_ENV", value: "production" },
              { key: "DATABASE_URL", value: "postgresql://***" },
              { key: "NEXTAUTH_URL", value: "https://cinemai.ai" },
              { key: "OPENAI_API_KEY", value: "sk-***" },
              { key: "STRIPE_SECRET_KEY", value: "sk_live_***" },
              { key: "AWS_REGION", value: "us-east-1" },
            ].map((env) => (
              <div key={env.key} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                <span className="font-mono text-xs text-accent flex-shrink-0">{env.key}</span>
                <span className="font-mono text-xs text-muted-foreground ml-auto">{env.value}</span>
              </div>
            ))}
          </div>
        </NeoGlowCard>
      </div>
    </div>
  );
}
