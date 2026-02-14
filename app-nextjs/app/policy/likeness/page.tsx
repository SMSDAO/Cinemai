import Link from "next/link";
import { NeoGlowButton } from "@/components/neo-glow/neo-glow-button";
import { Badge } from "@/components/ui/badge";

export default function LikenessPolicyPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Likeness & Consent Policy</span>
          </h1>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Effective Date: February 2026</span>
            <span>•</span>
            <span>Version 1.0</span>
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-secondary/10 border-2 border-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Badge className="bg-secondary">Important</Badge>
            Please Read Carefully
          </h2>
          <p className="text-muted-foreground">
            By using avatar features on this platform, you agree to comply with this policy.
            Violations may result in account suspension or termination.
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-muted-foreground mb-4">
            Cinemai Pro Agents is committed to the ethical and legal use of AI-generated content.
            This policy outlines the rules and requirements for using virtual presenters, avatars,
            and AI-generated voices on our platform.
          </p>
        </section>

        {/* Core Principles */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Core Principles</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. No Impersonation Without Consent</h3>
              <p className="text-muted-foreground mb-2">
                You <strong>MUST NOT</strong> use the platform to impersonate real people without
                their explicit, documented consent. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Creating videos that claim to feature a real person who did not participate</li>
                <li>Using AI to mimic the voice, face, or mannerisms of a real person</li>
                <li>Generating content that misleads viewers about real person endorsements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">2. Use Fictional or Stylized Avatars</h3>
              <p className="text-muted-foreground">
                You <strong>MUST</strong> use clearly fictional characters, stylized avatars, or
                generic representations that do not claim to be real people.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3. No Public Figures Without Rights</h3>
              <p className="text-muted-foreground mb-2">
                You <strong>MUST NOT</strong> use the likeness of public figures unless you have:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Explicit, documented rights and licenses from the individual</li>
                <li>Written authorization from their legal representatives</li>
                <li>Created clearly labeled parody or satire (complying with applicable laws)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">4. Clear AI Disclosure</h3>
              <p className="text-muted-foreground">
                All AI-generated content must include clear disclosure and not mislead viewers
                about the nature of the content.
              </p>
            </div>
          </div>
        </section>

        {/* What You Can Do */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What You Can Do</h2>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>Create videos with fictional avatars</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>Use your own likeness (with your consent)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>Create original characters</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary text-xl">✓</span>
              <span>Educational and informational content with appropriate avatars</span>
            </div>
          </div>
        </section>

        {/* What You Cannot Do */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What You Cannot Do</h2>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-destructive text-xl">✗</span>
              <span>Impersonate celebrities or public figures</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-destructive text-xl">✗</span>
              <span>Create deepfakes of real people without permission</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-destructive text-xl">✗</span>
              <span>Create misleading endorsements</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-destructive text-xl">✗</span>
              <span>Generate deceptive political content</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-destructive text-xl">✗</span>
              <span>Use avatars to harass or defame others</span>
            </div>
          </div>
        </section>

        {/* Enforcement */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Enforcement & Compliance</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Automated Checks</h3>
              <p className="text-muted-foreground">
                Our platform uses automated systems to detect and block attempts to impersonate
                real people or violate this policy. If your request is blocked, you'll receive
                an error message with suggestions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Audit Logging</h3>
              <p className="text-muted-foreground">
                All avatar generation requests are logged for audit purposes, including user ID,
                prompt details, timestamp, and compliance check results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Violations</h3>
              <p className="text-muted-foreground mb-2">
                Violations of this policy may result in:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                <li><strong>Warning:</strong> First offense - account flagged</li>
                <li><strong>Suspension:</strong> Second offense - temporary account suspension</li>
                <li><strong>Termination:</strong> Severe or repeated violations - permanent ban</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Legal Considerations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Legal Considerations</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong>Right of Publicity:</strong> Using someone's likeness without permission may
              violate their right of publicity, which protects individuals from unauthorized
              commercial use of their identity.
            </p>
            <p>
              <strong>Defamation:</strong> Creating false or misleading content about real people
              may constitute defamation and expose you to legal liability.
            </p>
            <p>
              <strong>Intellectual Property:</strong> Using copyrighted material (including likenesses
              of fictional characters owned by others) may violate copyright or trademark laws.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about this policy, contact us at:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li><strong>Email:</strong> policy@cinemai.ai</li>
            <li><strong>Support:</strong> support@cinemai.ai</li>
            <li><strong>Legal:</strong> legal@cinemai.ai</li>
          </ul>
        </section>

        {/* Acceptance Button */}
        <div className="border-t border-border pt-8">
          <div className="bg-card p-6 rounded-lg border text-center">
            <h3 className="text-xl font-bold mb-4">Policy Acknowledgment</h3>
            <p className="text-muted-foreground mb-6">
              By clicking "I Accept" below, you acknowledge that you have read, understood,
              and agree to comply with this Likeness & Consent Policy.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <NeoGlowButton size="lg">I Accept</NeoGlowButton>
              </Link>
              <Link href="/">
                <NeoGlowButton variant="outline" size="lg">Go Back</NeoGlowButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
