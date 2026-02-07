/**
 * Logger Utility
 * Centralized logging for the application
 */

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    console.log(`[INFO] [${this.context}] ${message}`, data || '');
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error | any): void {
    console.error(`[ERROR] [${this.context}] ${message}`, error || '');
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    console.warn(`[WARN] [${this.context}] ${message}`, data || '');
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] [${this.context}] ${message}`, data || '');
    }
  }

  /**
   * Create child logger with new context
   */
  child(context: string): Logger {
    return new Logger(`${this.context}:${context}`);
  }
}

/**
 * Create a new logger instance
 */
export function createLogger(context: string): Logger {
  return new Logger(context);
}
