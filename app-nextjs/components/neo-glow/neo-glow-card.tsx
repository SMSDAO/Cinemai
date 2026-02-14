import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NeoGlowCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export function NeoGlowCard({ 
  children, 
  title, 
  description, 
  footer, 
  glow = true,
  className 
}: NeoGlowCardProps) {
  return (
    <ShadcnCard 
      className={cn(
        "border-border/50 backdrop-blur-sm",
        glow && "hover:neo-glow transition-all duration-300",
        className
      )}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  );
}
