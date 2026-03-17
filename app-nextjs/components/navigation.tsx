"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  Users,
  ShieldCheck,
  Code2,
  Settings,
  BookOpen,
  Film,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "Admin", href: "/admin", icon: ShieldCheck },
  { label: "Developer", href: "/developer", icon: Code2 },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Docs", href: "/docs", icon: BookOpen },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 h-14">
        {/* Logo */}
        <Link href="/" aria-label="CinemAi home" className="flex items-center gap-2 mr-6 flex-shrink-0">
          <Film className="h-5 w-5 text-primary" />
          <span className="font-bold text-gradient hidden sm:block">CinemAi</span>
        </Link>

        {/* Nav tabs – scrollable on mobile */}
        <div className="flex items-center gap-1 overflow-x-auto flex-1 scrollbar-none">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary/10 text-primary neo-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
