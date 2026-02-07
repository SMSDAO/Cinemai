/**
 * Billing Service
 * Handles trips purchase and subscriptions
 */

import api from './api';

export interface Trip {
  id: string;
  user_id: string;
  amount: number;
  quantity: number;
  payment_intent_id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'pro';
  amount: number;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

export interface PurchaseTripsData {
  quantity: number;
}

export const billingService = {
  /**
   * Purchase trips
   */
  async purchaseTrips(data: PurchaseTripsData): Promise<Trip> {
    const response = await api.post<Trip>('/billing/trips', data);
    return response.data;
  },

  /**
   * Subscribe to Pro plan
   */
  async subscribeToPro(): Promise<Subscription> {
    const response = await api.post<Subscription>('/billing/subscribe', {
      plan: 'pro',
    });
    return response.data;
  },

  /**
   * Cancel subscription
   */
  async cancelSubscription(): Promise<void> {
    await api.post('/billing/cancel');
  },

  /**
   * Get current subscription
   */
  async getSubscription(): Promise<Subscription | null> {
    const response = await api.get<Subscription | null>('/billing/subscription');
    return response.data;
  },

  /**
   * Get trips history
   */
  async getTripsHistory(): Promise<Trip[]> {
    const response = await api.get<Trip[]>('/billing/trips');
    return response.data;
  },
};
