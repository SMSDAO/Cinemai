import Stripe from 'stripe';

/**
 * Stripe Client Utility
 * Handles payments and subscriptions via Stripe
 */

/**
 * Stripe Client for payment processing
 */
export class StripeClient {
  private stripe: Stripe | null = null;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.STRIPE_SECRET_KEY || '';
    if (this.apiKey && this.apiKey !== '') {
      this.stripe = new Stripe(this.apiKey, {
        apiVersion: '2026-01-28.clover',
      });
    }
  }

  /**
   * Check if Stripe is configured
   */
  private ensureStripe(): Stripe {
    if (!this.stripe) {
      throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY environment variable.');
    }
    return this.stripe;
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<any> {
    if (!this.stripe) {
      // Return mock for development
      return {
        id: 'pi_mock_' + Date.now(),
        clientSecret: 'pi_mock_secret_' + Date.now(),
        amount,
        currency,
        status: 'succeeded',
      };
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
    };
  }

  /**
   * Create a subscription
   */
  async createSubscription(customerId: string, priceId: string): Promise<any> {
    if (!this.stripe) {
      // Return mock for development
      return {
        id: 'sub_mock_' + Date.now(),
        customerId,
        priceId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
    }

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });

    return {
      id: subscription.id,
      customerId: subscription.customer as string,
      priceId,
      status: subscription.status,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
    };
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    if (!this.stripe) {
      return; // Mock: do nothing
    }
    await this.stripe.subscriptions.cancel(subscriptionId);
  }

  /**
   * Create a customer
   */
  async createCustomer(email: string, name?: string): Promise<any> {
    if (!this.stripe) {
      // Return mock for development
      return {
        id: 'cus_mock_' + Date.now(),
        email,
        name,
      };
    }

    const customer = await this.stripe.customers.create({
      email,
      name,
    });

    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
    };
  }

  /**
   * Get customer
   */
  async getCustomer(customerId: string): Promise<any> {
    if (!this.stripe) {
      return {
        id: customerId,
      };
    }

    const customer = await this.stripe.customers.retrieve(customerId);
    if (customer.deleted) {
      throw new Error('Customer has been deleted');
    }

    return {
      id: customer.id,
      email: (customer as any).email || undefined,
      name: (customer as any).name || undefined,
    };
  }

  /**
   * List payment history
   */
  async listPayments(customerId: string, limit: number = 20): Promise<any[]> {
    if (!this.stripe) {
      return [];
    }

    const paymentIntents = await this.stripe.paymentIntents.list({
      customer: customerId,
      limit,
    });

    return paymentIntents.data.map((pi) => ({
      id: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      status: pi.status,
      created: new Date(pi.created * 1000),
    }));
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.stripe) {
      return true; // Mock: always valid in dev
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET not configured');
    }

    try {
      this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get subscription
   */
  async getSubscription(subscriptionId: string): Promise<any> {
    if (!this.stripe) {
      return {
        id: subscriptionId,
        status: 'active',
      };
    }

    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    return {
      id: subscription.id,
      status: subscription.status,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    };
  }
}

/**
 * Create Stripe client instance
 */
export function createStripeClient(): StripeClient {
  return new StripeClient();
}
