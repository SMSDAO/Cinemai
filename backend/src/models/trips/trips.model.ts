/**
 * Trip Model
 * Represents a trip purchase (pay-as-you-go)
 */
export interface Trip {
  id: string;
  userId: string;
  amount: number;
  quantity: number;
  paymentIntentId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

/**
 * Trip create input
 */
export interface CreateTripInput {
  userId: string;
  quantity: number;
  amount: number;
  paymentIntentId: string;
}
