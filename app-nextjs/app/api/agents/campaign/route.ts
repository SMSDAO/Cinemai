import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface CampaignCreationRequest {
  videoId: string;
  platforms: string[]; // ['twitter', 'farcaster']
  caption?: string;
  scheduleTime?: string; // ISO 8601 date string
}

// Mock caption generation
function generateCaption(videoTitle: string, platform: string): string {
  const captions = {
    twitter: `🎬 Check out our latest video: "${videoTitle}"\n\n#AI #VideoMarketing #PromoVideo`,
    farcaster: `New video alert! 🚀\n\n"${videoTitle}"\n\nCreated with AI agents - what do you think?`,
  };
  
  return captions[platform as keyof typeof captions] || `Check out: ${videoTitle}`;
}

// Mock social posting (in production, integrate with Twitter/Farcaster APIs)
async function schedulePost(platform: string, caption: string, videoUrl: string, scheduleTime?: Date) {
  // In production, use actual social media APIs
  return {
    platform,
    scheduled: !!scheduleTime,
    scheduledFor: scheduleTime,
    status: scheduleTime ? 'scheduled' : 'published',
  };
}

// POST /api/agents/campaign - Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const body: CampaignCreationRequest = await request.json();
    
    // Validate required fields
    if (!body.videoId || !body.platforms || body.platforms.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: videoId, platforms' },
        { status: 400 }
      );
    }
    
    // Validate platforms
    const validPlatforms = ['twitter', 'farcaster'];
    const invalidPlatforms = body.platforms.filter(p => !validPlatforms.includes(p));
    if (invalidPlatforms.length > 0) {
      return NextResponse.json(
        { error: `Invalid platforms: ${invalidPlatforms.join(', ')}. Valid: ${validPlatforms.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Mock user ID (in production, get from NextAuth session)
    const userId = 'demo-user';
    
    // Verify video exists and belongs to user
    const video = await prisma.video.findFirst({
      where: {
        id: body.videoId,
        userId,
      },
      include: {
        script: true,
      },
    });
    
    if (!video) {
      return NextResponse.json(
        { error: 'Video not found or access denied' },
        { status: 404 }
      );
    }
    
    // Check video is ready
    if (video.status !== 'ready') {
      return NextResponse.json(
        { error: `Video is not ready (status: ${video.status})` },
        { status: 400 }
      );
    }
    
    // Generate or use provided caption
    const caption = body.caption || generateCaption(
      video.script?.title || 'Untitled',
      body.platforms[0]
    );
    
    // Parse schedule time if provided
    const scheduleTime = body.scheduleTime ? new Date(body.scheduleTime) : null;
    
    // Validate schedule time is in the future
    if (scheduleTime && scheduleTime <= new Date()) {
      return NextResponse.json(
        { error: 'Schedule time must be in the future' },
        { status: 400 }
      );
    }
    
    // Create campaign in database
    const campaign = await prisma.campaign.create({
      data: {
        userId,
        videoId: body.videoId,
        platforms: body.platforms as any,
        scheduleTime,
        status: scheduleTime ? 'scheduled' : 'draft',
        logs: [] as any,
      },
    });
    
    // Schedule posts on each platform
    const postResults = await Promise.all(
      body.platforms.map(platform =>
        schedulePost(platform, caption, video.url || '', scheduleTime || undefined)
      )
    );
    
    // Update campaign with results
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: {
        logs: postResults as any,
        status: scheduleTime ? 'scheduled' : 'published',
      },
    });
    
    return NextResponse.json({
      success: true,
      campaign: {
        id: campaign.id,
        videoId: campaign.videoId,
        platforms: campaign.platforms,
        scheduleTime: campaign.scheduleTime,
        status: scheduleTime ? 'scheduled' : 'published',
        caption,
        results: postResults,
        createdAt: campaign.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Campaign creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/agents/campaign - List all campaigns for user
export async function GET(request: NextRequest) {
  try {
    // Mock user ID (in production, get from NextAuth session)
    const userId = 'demo-user';
    
    const campaigns = await prisma.campaign.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        video: {
          select: {
            id: true,
            thumbnailUrl: true,
            script: {
              select: {
                title: true,
              },
            },
          },
        },
      },
      take: 50,
    });
    
    return NextResponse.json({
      success: true,
      campaigns: campaigns.map(c => ({
        id: c.id,
        videoId: c.videoId,
        videoTitle: c.video.script?.title,
        thumbnailUrl: c.video.thumbnailUrl,
        platforms: c.platforms,
        scheduleTime: c.scheduleTime,
        status: c.status,
        logs: c.logs,
        createdAt: c.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('Campaign list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns', details: error.message },
      { status: 500 }
    );
  }
}
