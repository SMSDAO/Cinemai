import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StripeClient } from '../../utils/stripe-client/stripe-client';
import {
  PaymentStatus,
  PaymentType,
  TripStatus,
  SubscriptionStatus,
  SubscriptionPlan,
  SubscriptionType,
} from '@prisma/client';

/**
 * Billing Service
 * Handles payments and subscriptions
 * - Stripe integration
 * - Trip purchases ($1 each)
 * - Pro subscription management
 * - Payment history
 */
@Injectable()
export class BillingService {
  private stripeClient: StripeClient;

  constructor(private prisma: PrismaService) {
    this.stripeClient = new StripeClient();
  }

  /**
   * Purchase trips (pay-as-you-go)
   */
  async purchaseTrips(userId: string, quantity: number): Promise<any> {
    const amount = quantity * 1.0; // $1 per trip
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await this.stripeClient.createPaymentIntent(amountInCents, 'usd');

    const payment = await this.prisma.payment.create({
      data: {
        userId,
        amount,
        currency: 'usd',
        type: PaymentType.TRIP,
        stripePaymentId: paymentIntent.id,
        status:
          paymentIntent.status === 'succeeded' ? PaymentStatus.SUCCEEDED : PaymentStatus.PENDING,
        description: `Purchase ${quantity} trip(s)`,
      },
    });

    const trip = await this.prisma.trip.create({
      data: {
        userId,
        amount,
        quantity,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status === 'succeeded' ? TripStatus.COMPLETED : TripStatus.PENDING,
      },
    });

    if (paymentIntent.status === 'succeeded') {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          tripsRemaining: {
            increment: quantity,
          },
        },
      });
    }

    return {
      id: trip.id,
      userId,
      quantity,
      amount,
      status: trip.status,
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.clientSecret,
    };
  }

  /**
   * Create Pro subscription
   */
  async createSubscription(userId: string): Promise<any> {
    const amount = 49.0;
    const priceId = process.env.STRIPE_PRO_PRICE_ID || 'price_pro';

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // TODO: Store Stripe customer ID on User model for production
    // For now, using email as identifier (Stripe client creates customer if needed)
    const customerEmail = user.email;
    const subscriptionData = await this.stripeClient.createSubscription(customerEmail, priceId);

    const subscription = await this.prisma.subscription.create({
      data: {
        userId,
        stripeSubscriptionId: subscriptionData.id,
        status:
          subscriptionData.status === 'active'
            ? SubscriptionStatus.ACTIVE
            : SubscriptionStatus.UNPAID,
        plan: SubscriptionPlan.PRO,
        amount,
        currentPeriodStart: subscriptionData.currentPeriodStart,
        currentPeriodEnd: subscriptionData.currentPeriodEnd,
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: { subscriptionType: SubscriptionType.PRO },
    });

    await this.prisma.payment.create({
      data: {
        userId,
        amount,
        currency: 'usd',
        type: PaymentType.SUBSCRIPTION,
        stripePaymentId: subscriptionData.id,
        status: PaymentStatus.SUCCEEDED,
        description: 'Pro subscription - Monthly',
      },
    });

    return {
      id: subscription.id,
      userId,
      plan: 'pro',
      amount,
      status: subscription.status,
      stripeSubscriptionId: subscription.stripeSubscriptionId,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
    };
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    await this.stripeClient.cancelSubscription(subscription.stripeSubscriptionId);

    await this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: SubscriptionStatus.CANCELED,
        cancelAtPeriodEnd: true,
      },
    });

    await this.prisma.user.update({
      where: { id: subscription.userId },
      data: { subscriptionType: SubscriptionType.FREE },
    });
  }

  /**
   * Get payment history
   */
  async getPaymentHistory(userId: string, page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.payment.count({ where: { userId } }),
    ]);

    return {
      payments,
      total,
      page,
      limit,
    };
  }

  /**
   * Get subscription details
   */
  async getSubscription(userId: string): Promise<any> {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PAST_DUE] },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!subscription) {
      return null;
    }

    return {
      id: subscription.id,
      userId: subscription.userId,
      plan: subscription.plan,
      status: subscription.status,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
    };
  }

  /**
   * Handle Stripe webhook
   */
  async handleWebhook(event: any): Promise<void> {
    // TODO: Handle Stripe webhook events with proper verification
    // - payment_intent.succeeded
    // - subscription.updated
    // - subscription.deleted
  }

  /**
   * Get user's trip balance
   */
  async getTripBalance(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { tripsRemaining: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.tripsRemaining;
  }

  /**
   * Consume a trip
   */
  async consumeTrip(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { tripsRemaining: true, subscriptionType: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.subscriptionType === SubscriptionType.PRO) {
      return true;
    }

    if (user.tripsRemaining <= 0) {
      return false;
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        tripsRemaining: {
          decrement: 1,
        },
      },
    });

    return true;
  }
}
