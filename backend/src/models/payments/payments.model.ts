/**
 * Payment Model
 * Represents a payment transaction
 */
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'trip' | 'subscription';
  stripePaymentId: string;
  status: 'pending' | 'succeeded' | 'failed';
  createdAt: Date;
}

/**
 * Payment create input
 */
export interface CreatePaymentInput {
  userId: string;
  amount: number;
  currency: string;
  type: 'trip' | 'subscription';
  stripePaymentId: string;
}
