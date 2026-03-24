import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { Users, Search, UserPlus, CheckCircle, Ban, Clock } from "lucide-react";

const users = [
  { name: "Alice Chen", email: "alice@example.com", role: "User", status: "active", plan: "Pro", joined: "Jan 12, 2026" },
  { name: "Bob Martins", email: "bob@example.com", role: "Developer", status: "active", plan: "Pro", joined: "Jan 18, 2026" },
  { name: "Carol Davis", email: "carol@example.com", role: "Admin", status: "active", plan: "Enterprise", joined: "Feb 1, 2026" },
  { name: "Dan Wilson", email: "dan@example.com", role: "User", status: "suspended", plan: "Free", joined: "Feb 14, 2026" },
  { name: "Eve Johnson", email: "eve@example.com", role: "Auditor", status: "active", plan: "Pro", joined: "Feb 22, 2026" },
  { name: "Frank Lee", email: "frank@example.com", role: "User", status: "active", plan: "Free", joined: "Mar 2, 2026" },
];

const roleColors: Record<string, string> = {
  Admin: "text-primary bg-primary/10",
  Developer: "text-secondary bg-secondary/10",
  User: "text-muted-foreground bg-muted",
  Auditor: "text-accent bg-accent/10",
};

const planColors: Record<string, string> = {
  Enterprise: "text-yellow-400 bg-yellow-400/10",
  Pro: "text-primary bg-primary/10",
  Free: "text-muted-foreground bg-muted",
};

export default function UsersPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Users</h1>
            </div>
            <p className="text-muted-foreground">Manage user accounts and roles</p>
          </div>
          <NeoGlowButton size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </NeoGlowButton>
        </div>

        {/* Search */}
        <NeoGlowCard glow={false} className="mb-6">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              type="search"
              placeholder="Search users by name or email..."
              className="flex-1 bg-transparent outline-none text-sm"
              aria-label="Search users"
            />
          </div>
        </NeoGlowCard>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Users", value: users.length },
            { label: "Active", value: users.filter((u) => u.status === "active").length },
            { label: "Suspended", value: users.filter((u) => u.status === "suspended").length },
            { label: "Pro+", value: users.filter((u) => u.plan !== "Free").length },
          ].map((s) => (
            <NeoGlowCard key={s.label} glow={false} className="p-4">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </NeoGlowCard>
          ))}
        </div>

        {/* Users Table */}
        <NeoGlowCard glow={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground text-left">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 px-4 hidden md:table-cell">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Plan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 pl-4 hidden lg:table-cell">Joined</th>
                  <th className="py-3 pl-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-b border-border/20 hover:bg-muted/20">
                    <td className="py-3 pr-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[user.role] ?? "text-muted-foreground bg-muted"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${planColors[user.plan] ?? "text-muted-foreground bg-muted"}`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.status === "active" ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs">
                          <Ban className="h-3 w-3" /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="py-3 pl-4 text-muted-foreground hidden lg:table-cell">
                      <span className="flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" /> {user.joined}
                      </span>
                    </td>
                    <td className="py-3 pl-4">
                      <NeoGlowButton variant="outline" size="sm" glow={false} className="text-xs">
                        Edit
                      </NeoGlowButton>
                    </td>
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
