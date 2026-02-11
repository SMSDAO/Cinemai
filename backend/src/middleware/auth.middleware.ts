import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Auth Middleware
 * Validates JWT tokens and attaches user to request
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // TODO: Implement JWT validation
    // 1. Extract token from Authorization header
    // 2. Verify JWT token
    // 3. Attach user to request object
    // 4. Call next()

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      // TODO: Verify token and decode user
      // For now, attach a mock user
      (req as any).user = {
        id: 'user_id',
        email: 'user@example.com',
      };
    }

    next();
  }
}
