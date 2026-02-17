import { Injectable, NestMiddleware, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RateLimitMiddleware.name);
  private readonly store: RateLimitStore = {};
  
  // Rate limit configuration
  private readonly limits = {
    // General API requests
    general: { requests: 100, windowMs: 60 * 1000 }, // 100 req/min
    
    // Auth endpoints (more restrictive)
    auth: { requests: 5, windowMs: 60 * 1000 }, // 5 req/min
    
    // Production creation (most restrictive)
    production: { requests: 10, windowMs: 60 * 60 * 1000 }, // 10 req/hour
    
    // Shorts creation
    shorts: { requests: 20, windowMs: 60 * 60 * 1000 }, // 20 req/hour
  };

  use(req: Request, res: Response, next: NextFunction) {
    const ip = this.getClientIp(req);
    const endpoint = this.getEndpointCategory(req.path, req.method);
    const limit = this.limits[endpoint] || this.limits.general;
    
    const key = `${ip}:${endpoint}`;
    const now = Date.now();
    
    // Initialize or get existing rate limit data
    if (!this.store[key] || now > this.store[key].resetTime) {
      this.store[key] = {
        count: 0,
        resetTime: now + limit.windowMs,
      };
    }
    
    // Increment request count
    this.store[key].count++;
    
    // Set rate limit headers
    const remaining = Math.max(0, limit.requests - this.store[key].count);
    const resetTime = Math.ceil(this.store[key].resetTime / 1000);
    
    res.setHeader('X-RateLimit-Limit', limit.requests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', resetTime.toString());
    
    // Check if rate limit exceeded
    if (this.store[key].count > limit.requests) {
      const retryAfter = Math.ceil((this.store[key].resetTime - now) / 1000);
      
      this.logger.warn(`Rate limit exceeded for ${ip} on ${endpoint} endpoint`);
      
      // Set Retry-After header before throwing
      res.setHeader('Retry-After', retryAfter.toString());
      
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Too many requests, please try again later',
          retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    
    // Opportunistic cleanup of expired entries (every ~100 requests)
    if (Math.random() < 0.01) {
      this.cleanupOldEntries();
    }
    
    next();
  }
  
  /**
   * Get client IP address
   */
  private getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      'unknown'
    );
  }
  
  /**
   * Determine endpoint category for rate limiting
   * 
   * We scope restrictive categories to specific write-heavy endpoints:
   * - Auth: POST /auth/signup, POST /auth/login
   * - Cinema: POST /productions, POST /productions/:id/run
   * - Shorts: POST /shorts, POST /shorts/:id/hooks, POST /shorts/:id/variants
   *
   * All other endpoints fall under the more permissive "general" bucket.
   */
  private getEndpointCategory(path: string, method: string): 'auth' | 'production' | 'shorts' | 'general' {
    // Only apply restrictive limits to POST/PUT/PATCH methods
    if (method !== 'POST' && method !== 'PUT' && method !== 'PATCH') {
      return 'general';
    }

    // Auth endpoints (POST only)
    if (path === '/auth/signup' || path === '/auth/login') {
      return 'auth';
    }

    // Cinema production creation/run endpoints (POST only)
    if (path === '/productions') {
      return 'production';
    }
    if (/^\/productions\/[^/]+\/run$/.test(path)) {
      return 'production';
    }

    // Shorts creation/derivative endpoints (POST only)
    if (path === '/shorts') {
      return 'shorts';
    }
    if (/^\/shorts\/[^/]+\/(hooks|variants)$/.test(path)) {
      return 'shorts';
    }

    // Everything else uses the general bucket
    return 'general';
  }
  
  /**
   * Clean up old entries (should be called periodically)
   */
  cleanupOldEntries(): void {
    const now = Date.now();
    let cleaned = 0;
    
    for (const key in this.store) {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      this.logger.log(`Cleaned up ${cleaned} expired rate limit entries`);
    }
  }
}
