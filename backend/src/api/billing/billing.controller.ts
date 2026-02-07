import { Controller, Post, Get, Body, Param, Req, Query } from '@nestjs/common';
import { BillingService } from '../../services/billing/billing.service';

/**
 * Billing API Controller
 * REST endpoints for payments and subscriptions
 * 
 * Endpoints:
 * - POST /billing/trips/purchase
 * - POST /billing/subscriptions/create
 * - GET /billing/payments/history
 */
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  /**
   * Purchase trips
   * POST /billing/trips/purchase
   */
  @Post('trips/purchase')
  async purchaseTrips(@Req() req: any, @Body() body: { quantity: number }) {
    const userId = req.user?.id;
    return this.billingService.purchaseTrips(userId, body.quantity);
  }

  /**
   * Create Pro subscription
   * POST /billing/subscriptions/create
   */
  @Post('subscriptions/create')
  async createSubscription(@Req() req: any) {
    const userId = req.user?.id;
    return this.billingService.createSubscription(userId);
  }

  /**
   * Cancel subscription
   * POST /billing/subscriptions/:id/cancel
   */
  @Post('subscriptions/:id/cancel')
  async cancelSubscription(@Param('id') subscriptionId: string) {
    await this.billingService.cancelSubscription(subscriptionId);
    return { message: 'Subscription canceled' };
  }

  /**
   * Get payment history
   * GET /billing/payments/history
   */
  @Get('payments/history')
  async getPaymentHistory(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user?.id;
    return this.billingService.getPaymentHistory(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  /**
   * Get current subscription
   * GET /billing/subscriptions/current
   */
  @Get('subscriptions/current')
  async getSubscription(@Req() req: any) {
    const userId = req.user?.id;
    return this.billingService.getSubscription(userId);
  }

  /**
   * Get trip balance
   * GET /billing/trips/balance
   */
  @Get('trips/balance')
  async getTripBalance(@Req() req: any) {
    const userId = req.user?.id;
    const balance = await this.billingService.getTripBalance(userId);
    return { balance };
  }
}
