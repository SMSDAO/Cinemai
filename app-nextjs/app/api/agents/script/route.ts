import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkLikenessCompliance, logComplianceCheck } from '@/lib/policies/compliance';

// Force dynamic rendering (don't pre-render during build)
export const dynamic = 'force-dynamic';

// Script templates
const SCRIPT_TEMPLATES = {
  product_launch: {
    hook: "Introducing {product} - {value_prop}",
    structure: ["problem", "solution", "benefits", "cta"],
  },
  ugc_style: {
    hook: "You NEED to try {product}",
    structure: ["personal_intro", "experience", "results", "recommendation"],
  },
  testimonial: {
    hook: "Here's what I love about {product}",
    structure: ["background", "challenge", "solution", "results"],
  },
  tutorial: {
    hook: "Let me show you how to {action} with {product}",
    structure: ["intro", "steps", "tips", "summary"],
  },
};

interface ScriptGenerationRequest {
  product: string;
  audience: string;
  tone: string;
  duration: number;
  template?: string;
}

// Mock script generation (in production, use OpenAI API)
function generateScript(params: ScriptGenerationRequest) {
  const { product, audience, tone, duration, template = 'product_launch' } = params;
  
  const selectedTemplate = SCRIPT_TEMPLATES[template as keyof typeof SCRIPT_TEMPLATES] || SCRIPT_TEMPLATES.product_launch;
  
  // Generate script sections based on template and params
  const hook = selectedTemplate.hook
    .replace('{product}', product)
    .replace('{value_prop}', 'the solution you have been waiting for');
  
  const body = selectedTemplate.structure.map((section) => ({
    type: section,
    content: `[${tone} content about ${product} for ${audience}]`,
    duration: Math.floor(duration / selectedTemplate.structure.length),
  }));
  
  const cta = `Get started with ${product} today!`;
  
  return {
    hook,
    body,
    cta,
    metadata: {
      product,
      audience,
      tone,
      duration,
      template,
    },
  };
}

// POST /api/agents/script - Create a new script
export async function POST(request: NextRequest) {
  try {
    const body: ScriptGenerationRequest = await request.json();
    
    // Validate required fields
    if (!body.product || !body.audience || !body.tone || !body.duration) {
      return NextResponse.json(
        { error: 'Missing required fields: product, audience, tone, duration' },
        { status: 400 }
      );
    }
    
    // Check compliance with likeness policy
    const complianceCheck = checkLikenessCompliance(body.product);
    
    if (!complianceCheck.compliant) {
      // Log the blocked attempt
      await logComplianceCheck(null, body.product, complianceCheck);
      
      return NextResponse.json(
        { 
          error: complianceCheck.reason,
          suggestions: complianceCheck.suggestions
        },
        { status: 403 }
      );
    }
    
    // Generate script
    const scriptContent = generateScript(body);
    
    // In a real implementation, you would:
    // 1. Get the authenticated user ID from session
    // 2. Save to database
    // For now, we'll just return the generated script
    
    // Mock user ID (in production, get from NextAuth session)
    const userId = 'demo-user';
    
    // Save to database
    const script = await prisma.script.create({
      data: {
        userId,
        title: `${body.product} - ${body.template || 'Script'}`,
        content: scriptContent as any,
      },
    });
    
    return NextResponse.json({
      success: true,
      script: {
        id: script.id,
        title: script.title,
        content: script.content,
        createdAt: script.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate script', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/agents/script - List all scripts for user
export async function GET(request: NextRequest) {
  try {
    // Mock user ID (in production, get from NextAuth session)
    const userId = 'demo-user';
    
    const scripts = await prisma.script.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    
    return NextResponse.json({
      success: true,
      scripts: scripts.map(s => ({
        id: s.id,
        title: s.title,
        content: s.content,
        createdAt: s.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Script list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scripts', details: error.message },
      { status: 500 }
    );
  }
}
