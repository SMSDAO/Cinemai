/**
 * Short Variant Model
 * Represents a variant of a short for A/B testing
 */
export interface ShortVariant {
  id: string;
  shortId: string;
  variantNumber: number;
  captionStyle: string;
  outputUrl?: string;
  createdAt: Date;
}

/**
 * Short variant create input
 */
export interface CreateShortVariantInput {
  shortId: string;
  variantNumber: number;
  captionStyle: string;
}
