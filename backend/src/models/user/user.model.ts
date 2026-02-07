/**
 * User Model
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  subscriptionType: 'free' | 'pro';
  tripsRemaining: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User create input
 */
export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

/**
 * User update input
 */
export interface UpdateUserInput {
  name?: string;
  avatarUrl?: string;
}
