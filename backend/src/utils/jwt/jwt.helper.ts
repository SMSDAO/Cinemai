import { sign, verify, decode } from 'jsonwebtoken';

/**
 * JWT Helper Utility
 * Handles JWT token generation and validation
 */

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Generate JWT token
 */
export function signToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  // Note: TypeScript has issues with StringValue type from ms package
  // Using 'as any' to bypass type checking for expiresIn
  return sign(payload, secret, { expiresIn: expiresIn as any });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
    const decoded = verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Decode token without verification (useful for expired tokens)
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
