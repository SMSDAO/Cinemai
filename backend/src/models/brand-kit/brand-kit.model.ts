/**
 * Brand Kit Model
 * Represents a brand kit for content styling
 */
export interface BrandKit {
  id: string;
  userId: string;
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  createdAt: Date;
}

/**
 * Brand kit create input
 */
export interface CreateBrandKitInput {
  userId: string;
  name: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}

/**
 * Brand kit update input
 */
export interface UpdateBrandKitInput {
  name?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
}
