/**
 * Subscription Model
 * Represents a Pro subscription
 */
export interface Subscription {
  id: string;
  userId: string;
  plan: 'pro';
  amount: number;
  stripeSubscriptionId: string;
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
}

/**
 * Subscription create input
 */
export interface CreateSubscriptionInput {
  userId: string;
  plan: 'pro';
  amount: number;
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}

/**
 * Subscription update input
 */
export interface UpdateSubscriptionInput {
  status?: 'active' | 'canceled' | 'past_due';
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
}
