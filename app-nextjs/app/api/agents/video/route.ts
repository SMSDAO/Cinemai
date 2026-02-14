import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface VideoGenerationRequest {
  scriptId: string;
  avatarStyle: string;
  language: string;
  aspectRatio: string;
}

// Mock video provider integration
async function createVideoJob(params: VideoGenerationRequest) {
  // In production, integrate with actual video provider API
  // For now, return a mock job ID
  return {
    providerJobId: `job_${Date.now()}`,
    status: 'queued',
    estimatedTime: 600, // 10 minutes
  };
}

// POST /api/agents/video - Create a new video
export async function POST(request: NextRequest) {
  try {
    const body: VideoGenerationRequest = await request.json();
    
    // Validate required fields
    if (!body.scriptId || !body.avatarStyle || !body.language || !body.aspectRatio) {
      return NextResponse.json(
        { error: 'Missing required fields: scriptId, avatarStyle, language, aspectRatio' },
        { status: 400 }
      );
    }
    
    // Mock user ID (in production, get from NextAuth session)
    const userId = 'demo-user';
    
    // Verify script exists and belongs to user
    const script = await prisma.script.findFirst({
      where: {
        id: body.scriptId,
        userId,
      },
    });
    
    if (!script) {
      return NextResponse.json(
        { error: 'Script not found or access denied' },
        { status: 404 }
      );
    }
    
    // Create video job with provider
    const job = await createVideoJob(body);
    
    // Save to database
    const video = await prisma.video.create({
      data: {
        userId,
        scriptId: body.scriptId,
        providerJobId: job.providerJobId,
        status: 'queued',
      },
    });
    
    return NextResponse.json({
      success: true,
      video: {
        id: video.id,
        scriptId: video.scriptId,
        status: video.status,
        providerJobId: video.providerJobId,
        estimatedTime: job.estimatedTime,
        createdAt: video.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: 'Failed to create video', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/agents/video - List all videos for user
export async function GET(request: NextRequest) {
  try {
    // Mock user ID (in production, get from NextAuth session)
    const userId = 'demo-user';
    
    const videos = await prisma.video.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        script: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      take: 50,
    });
    
    return NextResponse.json({
      success: true,
      videos: videos.map(v => ({
        id: v.id,
        scriptId: v.scriptId,
        scriptTitle: v.script?.title,
        status: v.status,
        url: v.url,
        thumbnailUrl: v.thumbnailUrl,
        createdAt: v.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Video list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos', details: error.message },
      { status: 500 }
    );
  }
}
