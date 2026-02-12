import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, radii } from '../../theme/tokens';

export interface Tab {
  key: string;
  label: string;
  icon?: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (key: string) => void;
  variant?: 'default' | 'segmented';
  style?: ViewStyle;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  style,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.key || '');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabPress = (key: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(key);
    }
    onChange?.(key);
  };

  if (variant === 'segmented') {
    return (
      <View style={[styles.segmentedContainer, style]}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.segmentedTab,
                isActive && styles.segmentedTabActive,
                tabs.length > 0 && { flex: 1 },
              ]}
              onPress={() => handleTabPress(tab.key)}
            >
              <Text
                style={[
                  styles.segmentedTabText,
                  isActive && styles.segmentedTabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => handleTabPress(tab.key)}
          >
            {tab.icon && <Text style={styles.tabIcon}>{tab.icon}</Text>}
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1C22',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
    position: 'relative',
  },
  tabActive: {
    // Active state handled by indicator
  },
  tabIcon: {
    marginRight: spacing[2],
    fontSize: typography.size.lg,
  },
  tabText: {
    color: colors.text.secondary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium,
  },
  tabTextActive: {
    color: colors.glow.primary,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.glow.primary,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: colors.bg.secondary,
    borderRadius: radii.full,
    padding: 4,
  },
  segmentedTab: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedTabActive: {
    backgroundColor: colors.glow.primary,
  },
  segmentedTabText: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  segmentedTabTextActive: {
    color: '#000',
    fontWeight: typography.weight.semibold,
  },
});

export default Tabs;
