import { BillingService } from './billing.service';
import { SubscriptionType } from '@prisma/client';

// Mock Prisma
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  payment: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  trip: {
    create: jest.fn(),
  },
  subscription: {
    create: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
  },
};

// Mock StripeClient
const mockStripeClient = {
  createPaymentIntent: jest.fn(),
  createCustomer: jest.fn(),
  createSubscription: jest.fn(),
  cancelSubscription: jest.fn(),
};

describe('BillingService', () => {
  let billingService: BillingService;

  beforeEach(() => {
    jest.clearAllMocks();
    billingService = new BillingService(mockPrisma as any);
    (billingService as any).stripeClient = mockStripeClient;
  });

  describe('purchaseTrips', () => {
    it('should purchase trips and update user balance', async () => {
      const userId = 'user_123';
      const quantity = 5;

      mockStripeClient.createPaymentIntent.mockResolvedValue({
        id: 'pi_123',
        clientSecret: 'secret_123',
      });

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        tripsRemaining: 0,
      });

      mockPrisma.payment.create.mockResolvedValue({
        id: 'payment_123',
        userId,
      });

      mockPrisma.trip.create.mockResolvedValue({
        id: 'trip_123',
        userId,
        quantity,
      });

      const result = await billingService.purchaseTrips(userId, quantity);

      expect(result.paymentIntentId).toBe('pi_123');
      expect(result.clientSecret).toBe('secret_123');
    });
  });

  describe('getTripBalance', () => {
    it('should return user trip balance', async () => {
      const userId = 'user_123';

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        tripsRemaining: 10,
      });

      const result = await billingService.getTripBalance(userId);

      expect(result).toBe(10);
    });
  });

  describe('consumeTrip', () => {
    it('should decrement trip balance for FREE users', async () => {
      const userId = 'user_123';

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        subscriptionType: SubscriptionType.FREE,
        tripsRemaining: 5,
      });

      mockPrisma.user.update.mockResolvedValue({
        id: userId,
        tripsRemaining: 4,
      });

      await billingService.consumeTrip(userId);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { tripsRemaining: { decrement: 1 } },
      });
    });

    it('should not decrement for PRO users', async () => {
      const userId = 'user_123';

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        subscriptionType: SubscriptionType.PRO,
        tripsRemaining: 0,
      });

      await billingService.consumeTrip(userId);

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });
});
