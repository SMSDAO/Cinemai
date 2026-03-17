import { NeoGlowCard } from "@/components/neo-glow/neo-glow-card";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { BookOpen, ExternalLink, FileText, Code2, Rocket, Shield } from "lucide-react";
import Link from "next/link";

const docLinks = [
  {
    title: "Architecture",
    description: "Full system architecture, microservices, and pipeline documentation.",
    href: "https://github.com/SMSDAO/Cinemai/blob/main/ARCHITECTURE.md",
    icon: Rocket,
    color: "text-primary",
    external: true,
  },
  {
    title: "Deployment Guide",
    description: "Step-by-step Vercel deployment instructions and environment setup.",
    href: "https://github.com/SMSDAO/Cinemai/blob/main/DEPLOYMENT.md",
    icon: Rocket,
    color: "text-secondary",
    external: true,
  },
  {
    title: "API Reference",
    description: "REST API endpoints, authentication, and request/response examples.",
    href: "https://github.com/SMSDAO/Cinemai/tree/main/docs/api",
    icon: Code2,
    color: "text-accent",
    external: true,
  },
  {
    title: "Mobile Build Guide",
    description: "iOS and Android build setup for the CinemAi mobile application.",
    href: "https://github.com/SMSDAO/Cinemai/blob/main/MOBILE_BUILD_GUIDE.md",
    icon: FileText,
    color: "text-yellow-400",
    external: true,
  },
  {
    title: "Security & Privacy",
    description: "Security hardening, RBAC roles, and privacy policy documentation.",
    href: "/policy/likeness",
    icon: Shield,
    color: "text-green-400",
    external: false,
  },
  {
    title: "Setup Guide",
    description: "Local development setup, environment variables, and prerequisites.",
    href: "https://github.com/SMSDAO/Cinemai/blob/main/SETUP.md",
    icon: FileText,
    color: "text-primary",
    external: true,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Documentation</h1>
            <p className="text-muted-foreground">Guides, references, and resources for CinemAi</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {docLinks.map((doc) => (
            <Link key={doc.title} href={doc.href} target={doc.external ? "_blank" : undefined} rel={doc.external ? "noopener noreferrer" : undefined}>
              <NeoGlowCard className="cursor-pointer hover:scale-[1.02] transition-transform h-full">
                <div className="flex items-start gap-3">
                  <doc.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${doc.color}`} />
                  <div>
                    <h3 className="font-semibold mb-1">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                </div>
              </NeoGlowCard>
            </Link>
          ))}
        </div>

        {/* External Resources */}
        <NeoGlowCard glow={false}>
          <h2 className="text-lg font-semibold mb-4">External Resources</h2>
          <div className="space-y-3">
            {[
              { label: "GitHub Repository", href: "https://github.com/SMSDAO/Cinemai" },
              { label: "Vercel Deployment", href: "https://vercel.com/dashboard" },
              { label: "Stripe Dashboard", href: "https://dashboard.stripe.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                {link.label}
              </a>
            ))}
          </div>
        </NeoGlowCard>

        {/* API Quick Reference */}
        <NeoGlowCard glow={false} className="mt-6">
          <h2 className="text-lg font-semibold mb-4">API Quick Reference</h2>
          <div className="space-y-2">
            {[
              { method: "GET", path: "/api/health", desc: "Health check" },
              { method: "GET", path: "/api/metrics", desc: "System metrics" },
              { method: "POST", path: "/api/agents/script", desc: "Generate video script" },
              { method: "POST", path: "/api/agents/video", desc: "Generate video" },
              { method: "POST", path: "/api/agents/campaign", desc: "Launch campaign" },
            ].map((ep) => (
              <div key={ep.path} className="flex items-center gap-3 p-2 rounded bg-muted/30 font-mono text-xs">
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    ep.method === "GET" ? "bg-green-400/10 text-green-400" : "bg-primary/10 text-primary"
                  }`}
                >
                  {ep.method}
                </span>
                <span className="text-accent">{ep.path}</span>
                <span className="text-muted-foreground ml-auto">{ep.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <NeoGlowButton variant="outline" size="sm" asChild>
              <Link href="/developer">
                <Code2 className="h-4 w-4 mr-2" />
                Open API Tester
              </Link>
            </NeoGlowButton>
          </div>
        </NeoGlowCard>
      </div>
    </div>
  );
}
