/**
 * TimelineEvent Component
 * Displays a single timeline event with icon, avatar, and details
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../Avatar/Avatar';
import { colors, spacing, typography, radius, shadow } from '../../theme/tokens';
import { TimelineEvent as TimelineEventType, EventType } from '../../services/timeline.service';

interface TimelineEventProps {
  event: TimelineEventType;
  onPress?: (event: TimelineEventType) => void;
}

const getEventIcon = (type: EventType): string => {
  switch (type) {
    case 'PRODUCTION_CREATED':
      return '🎬';
    case 'PRODUCTION_COMPLETED':
      return '✅';
    case 'SHORT_CREATED':
      return '🎞';
    case 'SHORT_COMPLETED':
      return '✅';
    case 'POST_PUBLISHED':
      return '📱';
    case 'USER_FOLLOWED':
      return '👤';
    case 'CONTENT_LIKED':
      return '❤️';
    default:
      return '📌';
  }
};

const getEventColor = (type: EventType): string => {
  switch (type) {
    case 'PRODUCTION_CREATED':
      return colors.glow.primary; // Cyan
    case 'PRODUCTION_COMPLETED':
      return '#10B981'; // Green
    case 'SHORT_CREATED':
      return colors.glow.secondary; // Magenta
    case 'SHORT_COMPLETED':
      return '#10B981'; // Green
    case 'POST_PUBLISHED':
      return colors.glow.tertiary; // Purple
    case 'USER_FOLLOWED':
      return '#3B82F6'; // Blue
    case 'CONTENT_LIKED':
      return '#EC4899'; // Pink
    default:
      return colors.glow.primary;
  }
};

const getEventDescription = (event: TimelineEventType): string => {
  const userName = event.user?.name || event.metadata?.userName || 'Someone';
  const title = event.metadata?.title || '';

  switch (event.eventType) {
    case 'PRODUCTION_CREATED':
      return `created a production${title ? `: ${title}` : ''}`;
    case 'PRODUCTION_COMPLETED':
      return `completed a production${title ? `: ${title}` : ''}`;
    case 'SHORT_CREATED':
      return `created a short${title ? `: ${title}` : ''}`;
    case 'SHORT_COMPLETED':
      return `completed a short${title ? `: ${title}` : ''}`;
    case 'POST_PUBLISHED':
      return 'published a post';
    case 'USER_FOLLOWED':
      return 'followed a user';
    case 'CONTENT_LIKED':
      return 'liked content';
    default:
      return 'performed an action';
  }
};

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const TimelineEvent: React.FC<TimelineEventProps> = ({ event, onPress }) => {
  const icon = getEventIcon(event.eventType);
  const color = getEventColor(event.eventType);
  const description = getEventDescription(event);
  const timestamp = formatTimestamp(event.createdAt);
  const userName = event.user?.name || event.metadata?.userName || 'Unknown User';
  const userAvatar = event.user?.avatarUrl || event.metadata?.userAvatar;

  const handlePress = () => {
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      {/* Event Icon */}
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Header with Avatar */}
        <View style={styles.header}>
          <Avatar
            name={userName}
            source={userAvatar ? { uri: userAvatar } : undefined}
            size="sm"
          />
          <View style={styles.headerText}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bg.secondary,
    borderRadius: radius.lg,
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadow.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  headerText: {
    marginLeft: spacing[2],
    flex: 1,
  },
  userName: {
    color: colors.text.primary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold as any,
  },
  timestamp: {
    color: colors.text.muted,
    fontSize: typography.size.xs,
    marginTop: spacing[0],
  },
  description: {
    color: colors.text.secondary,
    fontSize: typography.size.sm,
    lineHeight: 20,
  },
});
