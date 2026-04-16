import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import {
  Users,
  Activity,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Settings,
  Database,
  Lock,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  Server,
  Cpu,
  HardDrive,
} from "lucide-react";

const systemStats = [
  { label: "Active Users", value: "1,284", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Content Items", value: "8,432", change: "+5%", icon: Database, color: "text-secondary" },
  { label: "Server Health", value: "99.9%", change: "uptime", icon: Server, color: "text-green-400" },
  { label: "API Requests", value: "42.1K", change: "today", icon: Activity, color: "text-accent" },
];

const recentUsers = [
  { name: "Alice Chen", email: "alice@example.com", role: "User", status: "active", joined: "2 hrs ago" },
  { name: "Bob Martins", email: "bob@example.com", role: "Developer", status: "active", joined: "5 hrs ago" },
  { name: "Carol Davis", email: "carol@example.com", role: "Admin", status: "active", joined: "1 day ago" },
  { name: "Dan Wilson", email: "dan@example.com", role: "User", status: "suspended", joined: "3 days ago" },
  { name: "Eve Johnson", email: "eve@example.com", role: "Auditor", status: "active", joined: "1 week ago" },
];

const apiStats = [
  { endpoint: "POST /api/agents/script", calls: 2840, errors: 12, latency: "320ms" },
  { endpoint: "POST /api/agents/video", calls: 1240, errors: 5, latency: "1.2s" },
  { endpoint: "GET /api/health", calls: 18200, errors: 0, latency: "8ms" },
  { endpoint: "POST /api/agents/campaign", calls: 640, errors: 3, latency: "540ms" },
];

const auditLogs = [
  { action: "User role updated", user: "admin@cinemai.ai", target: "bob@example.com", time: "2 min ago", type: "warning" },
  { action: "Content item deleted", user: "admin@cinemai.ai", target: "video_892", time: "15 min ago", type: "danger" },
  { action: "Feature flag toggled", user: "admin@cinemai.ai", target: "beta_shorts", time: "1 hr ago", type: "info" },
  { action: "User suspended", user: "admin@cinemai.ai", target: "dan@example.com", time: "3 hrs ago", type: "danger" },
  { action: "New subscription created", user: "system", target: "alice@example.com", time: "4 hrs ago", type: "success" },
];

const roleColors: Record<string, string> = {
  Admin: "text-primary bg-primary/10",
  Developer: "text-secondary bg-secondary/10",
  User: "text-muted-foreground bg-muted",
  Auditor: "text-accent bg-accent/10",
};

const auditTypeColors: Record<string, string> = {
  warning: "text-yellow-400",
  danger: "text-red-400",
  info: "text-primary",
  success: "text-green-400",
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">System overview and enterprise controls</p>
          </div>
          <div className="flex gap-3">
            <NeoGlowButton variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </NeoGlowButton>
            <NeoGlowButton size="sm">
              <Lock className="h-4 w-4 mr-2" />
              Security Audit
            </NeoGlowButton>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systemStats.map((stat) => (
            <NeoGlowCard key={stat.label} glow={false} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </NeoGlowCard>
          ))}
        </div>

        {/* Server Health */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">CPU Usage</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <span className="text-primary font-mono">34%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full neo-glow" style={{ width: "34%" }} />
              </div>
            </div>
          </NeoGlowCard>
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-secondary" />
              <h3 className="font-semibold">Memory Usage</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <span className="text-secondary font-mono">62%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full neo-glow-magenta" style={{ width: "62%" }} />
              </div>
            </div>
          </NeoGlowCard>
          <NeoGlowCard glow={false}>
            <div className="flex items-center gap-2 mb-4">
              <HardDrive className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Storage Usage</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current</span>
                <span className="text-accent font-mono">48%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full neo-glow-purple" style={{ width: "48%" }} />
              </div>
            </div>
          </NeoGlowCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* User Management */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">User Management</h2>
              </div>
              <NeoGlowButton variant="outline" size="sm" glow={false}>
                View All
              </NeoGlowButton>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[user.role] ?? "text-muted-foreground bg-muted"}`}
                    >
                      {user.role}
                    </span>
                    {user.status === "active" ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Ban className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </NeoGlowCard>

          {/* Audit Logs */}
          <NeoGlowCard glow={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Audit Logs</h2>
              </div>
              <NeoGlowButton variant="outline" size="sm" glow={false}>
                Full Log
              </NeoGlowButton>
            </div>
            <div className="space-y-3">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <AlertTriangle
                    className={`h-4 w-4 mt-0.5 flex-shrink-0 ${auditTypeColors[log.type] ?? "text-muted-foreground"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.user} → {log.target}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="h-3 w-3" />
                    {log.time}
                  </div>
                </div>
              ))}
            </div>
          </NeoGlowCard>
        </div>

        {/* API Monitoring */}
        <NeoGlowCard glow={false}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">API Monitoring</h2>
            </div>
            <span className="text-xs text-muted-foreground">Last 24 hours</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="text-left py-2 pr-4">Endpoint</th>
                  <th className="text-right py-2 px-4">Calls</th>
                  <th className="text-right py-2 px-4">Errors</th>
                  <th className="text-right py-2 pl-4">Avg Latency</th>
                </tr>
              </thead>
              <tbody>
                {apiStats.map((row) => (
                  <tr key={row.endpoint} className="border-b border-border/20 hover:bg-muted/20">
                    <td className="py-2 pr-4 font-mono text-xs text-primary">{row.endpoint}</td>
                    <td className="text-right py-2 px-4">{row.calls.toLocaleString()}</td>
                    <td className={`text-right py-2 px-4 ${row.errors > 0 ? "text-red-400" : "text-green-400"}`}>
                      {row.errors}
                    </td>
                    <td className="text-right py-2 pl-4 font-mono">{row.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NeoGlowCard>
      </div>
    </div>
  );
}
