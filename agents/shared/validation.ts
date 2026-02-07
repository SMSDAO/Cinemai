/**
 * Input/output validation utilities for AI agents
 */

import { ValidationResult } from './types';

export class Validator {
  /**
   * Validate that required fields are present
   */
  static validateRequiredFields(
    data: any,
    requiredFields: string[]
  ): ValidationResult {
    const errors: string[] = [];

    for (const field of requiredFields) {
      if (!(field in data) || data[field] === undefined || data[field] === null) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate URL format
   */
  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate script text
   */
  static validateScript(script: string): ValidationResult {
    const errors: string[] = [];

    if (!script || typeof script !== 'string') {
      errors.push('Script must be a non-empty string');
    } else if (script.trim().length === 0) {
      errors.push('Script cannot be empty');
    } else if (script.length > 50000) {
      errors.push('Script exceeds maximum length of 50,000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate video format
   */
  static validateVideoFormat(
    format: string
  ): ValidationResult {
    const validFormats = ['9:16', '1:1', '16:9'];
    const errors: string[] = [];

    if (!validFormats.includes(format)) {
      errors.push(`Invalid format. Must be one of: ${validFormats.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate duration in seconds
   */
  static validateDuration(duration: number): ValidationResult {
    const errors: string[] = [];

    if (typeof duration !== 'number' || isNaN(duration)) {
      errors.push('Duration must be a valid number');
    } else if (duration <= 0) {
      errors.push('Duration must be greater than 0');
    } else if (duration > 3600) {
      errors.push('Duration cannot exceed 3600 seconds (1 hour)');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate social media platform
   */
  static validatePlatform(platform: string): ValidationResult {
    const validPlatforms = ['tiktok', 'instagram', 'youtube', 'x'];
    const errors: string[] = [];

    if (!validPlatforms.includes(platform)) {
      errors.push(`Invalid platform. Must be one of: ${validPlatforms.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
