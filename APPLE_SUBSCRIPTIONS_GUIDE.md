# Apple Subscriptions Integration Guide

Complete step-by-step guide for implementing Apple In-App Purchases and Subscriptions in CinemAi Neo.

## Overview

CinemAi Neo offers:
- **Free Tier**: Limited features with trial system
- **Pro Subscription**: $49/month unlimited access
- **Trips**: $1 per video (one-time purchases)

---

## Prerequisites

1. **Apple Developer Account** ($99/year)
2. **App Store Connect** access
3. **Banking information** set up for payments
4. **Tax forms** completed

---

## Step 1: App Store Connect Setup

### 1.1 Create App ID
1. Go to [Apple Developer Portal](https://developer.apple.com)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Create new **App ID**:
   - Bundle ID: `com.cinemai.neo`
   - Enable **In-App Purchase** capability
   - Enable **Subscription Groups** capability

### 1.2 Create App in App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+ New App**
3. Fill in:
   - Platform: iOS
   - Name: CinemAi Neo
   - Bundle ID: com.cinemai.neo
   - SKU: CINEMAI_NEO_001

---

## Step 2: Configure In-App Purchases

### 2.1 Create Subscription Group
1. In App Store Connect → Your App → **Subscriptions**
2. Click **Create Subscription Group**
3. Group Name: **CinemAi Neo Pro**
4. Reference Name: `cinemai_pro_group`

### 2.2 Create Pro Subscription
1. Click **+ Create Subscription** in the group
2. Configure:
   - **Product ID**: `com.cinemai.neo.pro.monthly`
   - **Duration**: 1 month
   - **Price**: $49.99 USD
   - **Subscription Display Name**: CinemAi Neo Pro
   - **Description**: Unlimited AI video creation with Cinema, Shorts, and Growth tools

### 2.3 Add Subscription Prices
1. Select subscription → **Subscription Prices**
2. Add price for all relevant countries
3. Enable **Auto-Renewable**

### 2.4 Create Trip Purchase (Consumable)
1. Go to **In-App Purchases** tab
2. Click **+** → **Consumable**
3. Configure:
   - **Product ID**: `com.cinemai.neo.trip.single`
   - **Price**: $0.99 USD
   - **Display Name**: Single Video Trip
   - **Description**: Create one cinema production or short video

---

## Step 3: Install Required Libraries

```bash
cd mobile
npm install react-native-iap --save
npm install @react-native-async-storage/async-storage --save
cd ios
pod install
cd ..
```

---

## Step 4: iOS Configuration

### 4.1 Enable In-App Purchase Capability
1. Open Xcode project: `mobile/ios/CinemAiNeo.xcworkspace`
2. Select project → **Signing & Capabilities**
3. Click **+ Capability**
4. Add **In-App Purchase**

### 4.2 Update Info.plist
Add to `mobile/ios/CinemAiNeo/Info.plist`:
```xml
<key>SKAdNetworkItems</key>
<array>
    <dict>
        <key>SKAdNetworkIdentifier</key>
        <string>cstr6suwn9.skadnetwork</string>
    </dict>
</array>
```

---

## Step 5: Implementation Code

### 5.1 Create IAP Service

Create `mobile/src/services/iap.service.ts`:

```typescript
import * as RNIap from 'react-native-iap';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCT_IDS = {
  PRO_MONTHLY: 'com.cinemai.neo.pro.monthly',
  TRIP_SINGLE: 'com.cinemai.neo.trip.single',
};

class IAPService {
  private isInitialized = false;

  /**
   * Initialize IAP connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await RNIap.initConnection();
      
      if (Platform.OS === 'ios') {
        await RNIap.clearTransactionIOS();
      }
      
      this.isInitialized = true;
      console.log('IAP initialized successfully');
    } catch (error) {
      console.error('IAP initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get available products
   */
  async getProducts(): Promise<any[]> {
    try {
      const products = await RNIap.getProducts({
        skus: Object.values(PRODUCT_IDS),
      });
      return products;
    } catch (error) {
      console.error('Failed to get products:', error);
      return [];
    }
  }

  /**
   * Get available subscriptions
   */
  async getSubscriptions(): Promise<any[]> {
    try {
      const subscriptions = await RNIap.getSubscriptions({
        skus: [PRODUCT_IDS.PRO_MONTHLY],
      });
      return subscriptions;
    } catch (error) {
      console.error('Failed to get subscriptions:', error);
      return [];
    }
  }

  /**
   * Purchase Pro subscription
   */
  async purchaseProSubscription(): Promise<boolean> {
    try {
      const purchase = await RNIap.requestSubscription({
        sku: PRODUCT_IDS.PRO_MONTHLY,
      });

      if (purchase) {
        await this.verifyPurchase(purchase);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Subscription purchase failed:', error);
      throw error;
    }
  }

  /**
   * Purchase single trip
   */
  async purchaseTrip(): Promise<boolean> {
    try {
      const purchase = await RNIap.requestPurchase({
        sku: PRODUCT_IDS.TRIP_SINGLE,
      });

      if (purchase) {
        await this.verifyPurchase(purchase);
        await RNIap.finishTransaction({ purchase });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Trip purchase failed:', error);
      throw error;
    }
  }

  /**
   * Verify purchase with backend
   */
  private async verifyPurchase(purchase: any): Promise<void> {
    try {
      const receipt = purchase.transactionReceipt;
      
      // Send to backend for verification
      const response = await fetch('https://api.cinemai.network/billing/verify-apple-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          receipt,
          productId: purchase.productId,
          transactionId: purchase.transactionId,
        }),
      });

      const result = await response.json();
      
      if (!result.valid) {
        throw new Error('Purchase verification failed');
      }

      console.log('Purchase verified successfully');
    } catch (error) {
      console.error('Purchase verification failed:', error);
      throw error;
    }
  }

  /**
   * Restore previous purchases
   */
  async restorePurchases(): Promise<void> {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      
      for (const purchase of purchases) {
        await this.verifyPurchase(purchase);
      }
      
      console.log('Purchases restored successfully');
    } catch (error) {
      console.error('Failed to restore purchases:', error);
      throw error;
    }
  }

  /**
   * Check subscription status
   */
  async checkSubscriptionStatus(): Promise<boolean> {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      const proSubscription = purchases.find(
        p => p.productId === PRODUCT_IDS.PRO_MONTHLY
      );
      
      return !!proSubscription;
    } catch (error) {
      console.error('Failed to check subscription:', error);
      return false;
    }
  }

  /**
   * Cleanup
   */
  async cleanup(): Promise<void> {
    try {
      await RNIap.endConnection();
      this.isInitialized = false;
    } catch (error) {
      console.error('IAP cleanup failed:', error);
    }
  }
}

export const iapService = new IAPService();
```

### 5.2 Create Subscription Screen

Create `mobile/src/screens/Billing/SubscriptionScreen.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { iapService } from '../../services/iap.service';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';

export const SubscriptionScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    initializeIAP();
  }, []);

  const initializeIAP = async () => {
    try {
      await iapService.initialize();
      const subscriptions = await iapService.getSubscriptions();
      setSubscription(subscriptions[0]);
      
      const status = await iapService.checkSubscriptionStatus();
      setIsPro(status);
    } catch (error) {
      console.error('Failed to initialize IAP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const success = await iapService.purchaseProSubscription();
      if (success) {
        setIsPro(true);
        alert('Welcome to CinemAi Neo Pro!');
      }
    } catch (error) {
      alert('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setLoading(true);
    try {
      await iapService.restorePurchases();
      const status = await iapService.checkSubscriptionStatus();
      setIsPro(status);
      alert('Purchases restored successfully');
    } catch (error) {
      alert('Failed to restore purchases');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00F0FF" />
      </View>
    );
  }

  if (isPro) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🎉 You're Pro!</Text>
        <Text style={styles.description}>
          Enjoy unlimited access to Cinema, Shorts, and Growth tools.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Pro</Text>
      
      <View style={styles.priceCard}>
        <Text style={styles.price}>{subscription?.localizedPrice || '$49.99'}</Text>
        <Text style={styles.period}>per month</Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.feature}>✨ Unlimited Cinema productions</Text>
        <Text style={styles.feature}>🎞️ Unlimited Shorts generation</Text>
        <Text style={styles.feature}>📈 Advanced Growth analytics</Text>
        <Text style={styles.feature}>🎨 Premium styles and effects</Text>
        <Text style={styles.feature}>⚡ Priority processing</Text>
      </View>

      <NeoGlowButton
        title="Subscribe Now"
        onPress={handleSubscribe}
        variant="primary"
        style={styles.button}
      />

      <TouchableOpacity onPress={handleRestore}>
        <Text style={styles.restore}>Restore Purchases</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Auto-renews monthly. Cancel anytime in App Store settings.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05060A',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#8A8F98',
    textAlign: 'center',
    marginBottom: 32,
  },
  priceCard: {
    backgroundColor: '#0A0C12',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#00F0FF',
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00F0FF',
  },
  period: {
    fontSize: 16,
    color: '#8A8F98',
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  button: {
    marginBottom: 16,
  },
  restore: {
    fontSize: 14,
    color: '#00F0FF',
    textAlign: 'center',
    marginBottom: 16,
  },
  terms: {
    fontSize: 12,
    color: '#8A8F98',
    textAlign: 'center',
  },
});
```

---

## Step 6: Backend Integration

### 6.1 Create Apple IAP Verification Endpoint

Add to `backend/src/api/billing/billing.controller.ts`:

```typescript
@Post('verify-apple-purchase')
@UseGuards(AuthGuard)
async verifyApplePurchase(
  @Request() req,
  @Body() body: { receipt: string; productId: string; transactionId: string }
): Promise<any> {
  return this.billingService.verifyApplePurchase(
    req.user.id,
    body.receipt,
    body.productId,
    body.transactionId
  );
}
```

### 6.2 Implement Verification Service

Add to `backend/src/services/billing/billing.service.ts`:

```typescript
async verifyApplePurchase(
  userId: string,
  receipt: string,
  productId: string,
  transactionId: string
): Promise<{ valid: boolean }> {
  try {
    // Verify with Apple's servers
    const appleResponse = await this.verifyWithApple(receipt);
    
    if (!appleResponse.valid) {
      return { valid: false };
    }
    
    // Handle based on product type
    if (productId.includes('pro.monthly')) {
      // Update user to Pro subscription
      await this.prisma.user.update({
        where: { id: userId },
        data: { subscriptionType: 'PRO' },
      });
      
      // Create subscription record
      await this.prisma.subscription.create({
        data: {
          userId,
          plan: 'PRO',
          amount: 49.99,
          stripeSubscriptionId: transactionId,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    } else if (productId.includes('trip')) {
      // Add trip to user
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          tripsRemaining: { increment: 1 },
        },
      });
      
      // Create payment record
      await this.prisma.payment.create({
        data: {
          userId,
          amount: 0.99,
          type: 'TRIP',
          stripePaymentId: transactionId,
          status: 'SUCCEEDED',
        },
      });
    }
    
    return { valid: true };
  } catch (error) {
    this.logger.error('Apple purchase verification failed:', error);
    return { valid: false };
  }
}

private async verifyWithApple(receipt: string): Promise<{ valid: boolean }> {
  const isProduction = process.env.NODE_ENV === 'production';
  const url = isProduction
    ? 'https://buy.itunes.apple.com/verifyReceipt'
    : 'https://sandbox.itunes.apple.com/verifyReceipt';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'receipt-data': receipt,
      password: process.env.APPLE_SHARED_SECRET,
    }),
  });
  
  const data = await response.json();
  return { valid: data.status === 0 };
}
```

---

## Step 7: Testing

### 7.1 Create Sandbox Tester
1. Go to App Store Connect → **Users and Access**
2. Click **Sandbox Testers** → **+**
3. Create test Apple ID (e.g., `test@cinemai.com`)

### 7.2 Test in Simulator
```bash
# Run iOS app
cd mobile
npm run ios

# Use sandbox tester credentials when prompted to purchase
```

### 7.3 Test Subscription
1. Launch app
2. Navigate to Billing/Subscription screen
3. Click "Subscribe Now"
4. Sign in with sandbox tester account
5. Complete test purchase (free in sandbox)

---

## Step 8: Submission Checklist

- [ ] All IAP products created in App Store Connect
- [ ] Subscription pricing set for all countries
- [ ] IAP capability enabled in Xcode
- [ ] Backend verification endpoint implemented
- [ ] Receipt validation working
- [ ] Restore purchases tested
- [ ] Sandbox testing completed
- [ ] Privacy policy includes subscription terms
- [ ] Terms of service mention auto-renewal
- [ ] Screenshots show subscription features

---

## Environment Variables

Add to `.env`:

```bash
# Apple IAP
APPLE_SHARED_SECRET=your_shared_secret_from_app_store_connect
APPLE_TEAM_ID=YOUR_TEAM_ID
```

---

## Support & Resources

- [Apple IAP Documentation](https://developer.apple.com/in-app-purchase/)
- [react-native-iap](https://github.com/dooboolab-community/react-native-iap)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Receipt Validation](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt)

---

## Common Issues

### Issue: "Cannot connect to iTunes Store"
**Solution**: Ensure you're signed in with sandbox tester account, not your real Apple ID.

### Issue: Products not loading
**Solution**: 
1. Check product IDs match exactly
2. Verify IAP capability enabled
3. Wait 24 hours after creating products in App Store Connect

### Issue: Receipt validation fails
**Solution**: Use sandbox URL for testing, production URL for live app.

---

## Subscription Management

Users can manage subscriptions via:
- iOS Settings → Apple ID → Subscriptions
- App Store → Account → Subscriptions

Cancellation does not require app update - handled by Apple automatically.
