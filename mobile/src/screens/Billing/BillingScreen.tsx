/**
 * Billing Screen
 * Purchase trips and manage Pro subscription
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NeoGlowButton } from '../../components/NeoGlowButton/NeoGlowButton';
import { NeoGlowCard } from '../../components/NeoGlowCard/NeoGlowCard';
import { useAuth } from '../../hooks/useAuth';
import { colors, spacing, typography, radii } from '../../theme/tokens';

const TRIP_PACKAGES = [
  { id: '1', quantity: 1, price: 1, label: 'Single Trip' },
  { id: '5', quantity: 5, price: 4.5, label: '5 Trips', discount: '10% off' },
  { id: '10', quantity: 10, price: 8, label: '10 Trips', discount: '20% off' },
  { id: '25', quantity: 25, price: 18.75, label: '25 Trips', discount: '25% off' },
];

export const BillingScreen = () => {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePurchaseTrips = async () => {
    if (!selectedPackage) {
      Alert.alert('Error', 'Please select a package');
      return;
    }

    Alert.alert('Purchase', 'Payment would be processed here');
  };

  const handleSubscribeToPro = async () => {
    Alert.alert('Subscribe to Pro', 'Subscribe for $49/month and get unlimited access?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Subscribe', onPress: () => Alert.alert('Success', 'Subscribed to Pro!') },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Billing</Text>
      <Text style={styles.subtitle}>Trips and subscriptions</Text>

      {/* Current Status */}
      <NeoGlowCard style={styles.card}>
        <Text style={styles.cardTitle}>Current Status</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Plan</Text>
            <Text style={[styles.statusValue, { color: colors.glow.primary }]}>
              {user?.subscription_type === 'pro' ? 'Pro' : 'Free'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Trips Left</Text>
            <Text style={[styles.statusValue, { color: colors.glow.secondary }]}>
              {user?.trips_remaining || 0}
            </Text>
          </View>
        </View>
      </NeoGlowCard>

      {/* Pro Subscription */}
      {user?.subscription_type !== 'pro' && (
        <NeoGlowCard style={styles.card} glowColor={colors.glow.tertiary}>
          <Text style={styles.cardTitle}>⭐ Pro Subscription</Text>
          <Text style={styles.proPrice}>$49/month</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>✓ Unlimited Productions</Text>
            <Text style={styles.feature}>✓ All Cinematic Styles</Text>
            <Text style={styles.feature}>✓ Priority Processing</Text>
            <Text style={styles.feature}>✓ Advanced Analytics</Text>
            <Text style={styles.feature}>✓ No Watermarks</Text>
          </View>
          <NeoGlowButton title="Subscribe to Pro" onPress={handleSubscribeToPro} />
        </NeoGlowCard>
      )}

      {/* Trip Packages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Purchase Trips</Text>
        <Text style={styles.sectionHint}>Pay as you go - $1 per production</Text>
        <View style={styles.packagesGrid}>
          {TRIP_PACKAGES.map((pkg) => (
            <TouchableOpacity
              key={pkg.id}
              style={[styles.packageCard, selectedPackage === pkg.id && styles.packageCardSelected]}
              onPress={() => setSelectedPackage(pkg.id)}
            >
              {pkg.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{pkg.discount}</Text>
                </View>
              )}
              <Text style={styles.packageLabel}>{pkg.label}</Text>
              <Text style={styles.packageQuantity}>{pkg.quantity} trips</Text>
              <Text style={styles.packagePrice}>${pkg.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <NeoGlowButton
          title="Purchase Trips"
          onPress={handlePurchaseTrips}
          disabled={!selectedPackage}
          variant="secondary"
        />
      </View>

      {/* Payment History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment History</Text>
        <NeoGlowCard style={styles.historyCard}>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Jan 15, 2026</Text>
            <Text style={styles.historyDescription}>10 Trips</Text>
            <Text style={styles.historyAmount}>$8.00</Text>
          </View>
        </NeoGlowCard>
        <NeoGlowCard style={styles.historyCard}>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Jan 1, 2026</Text>
            <Text style={styles.historyDescription}>5 Trips</Text>
            <Text style={styles.historyAmount}>$4.50</Text>
          </View>
        </NeoGlowCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  content: {
    padding: spacing[5],
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.size.display,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[2],
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    marginBottom: spacing[6],
  },
  card: {
    marginBottom: spacing[5],
  },
  cardTitle: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[4],
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginBottom: spacing[1],
  },
  statusValue: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
  },
  proPrice: {
    color: colors.glow.tertiary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[4],
  },
  featureList: {
    marginBottom: spacing[5],
  },
  feature: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    marginBottom: spacing[2],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
    marginBottom: spacing[2],
  },
  sectionHint: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    marginBottom: spacing[4],
  },
  packagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing[2],
    marginBottom: spacing[4],
  },
  packageCard: {
    backgroundColor: colors.bg.secondary,
    borderWidth: 1,
    borderColor: colors.glow.primary,
    borderRadius: radii.md,
    padding: spacing[4],
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: spacing[3],
    alignItems: 'center',
    position: 'relative',
  },
  packageCardSelected: {
    borderColor: colors.glow.primary,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  discountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.semantic.success,
    borderRadius: radii.full,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  discountText: {
    color: colors.text.primary,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold as any,
  },
  packageLabel: {
    color: colors.text.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold as any,
    marginBottom: spacing[1],
  },
  packageQuantity: {
    color: colors.text.secondary,
    fontSize: typography.size.xs,
    marginBottom: spacing[2],
  },
  packagePrice: {
    color: colors.glow.primary,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold as any,
  },
  historyCard: {
    marginBottom: spacing[3],
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDate: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
  },
  historyDescription: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    flex: 1,
    marginLeft: spacing[3],
  },
  historyAmount: {
    color: colors.glow.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
  },
});
