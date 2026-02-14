import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface NeoGlowButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  glow?: boolean;
  asChild?: boolean;
}

export function NeoGlowButton({ 
  children, 
  variant = "default", 
  size = "default",
  glow = true,
  className,
  asChild,
  ...props 
}: NeoGlowButtonProps) {
  const baseClasses = "font-semibold transition-all duration-300";
  
  const glowClasses = glow ? "neo-glow hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]" : "";

  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      className={cn(
        baseClasses,
        glow && glowClasses,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
