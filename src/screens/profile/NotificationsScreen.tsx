import { StyleSheet, Text } from "react-native";

import { AppScreen } from "@/components/layout/AppScreen";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useNotifications } from "@/hooks/useSupport";
import { colors, typography } from "@/theme";

export function NotificationsScreen() {
  const { data, isLoading, isError } = useNotifications();

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Notifications"
          subtitle="Booking reminders, payment updates, offers, and support updates."
        />
      }
    >
      {isLoading ? (
        <>
          <SkeletonBlock height={90} />
          <SkeletonBlock height={90} />
        </>
      ) : isError ? (
        <EmptyState
          title="Notifications unavailable"
          description="The feed is mock-backed and query-driven, ready for real notification sources later."
        />
      ) : !(data?.length) ? (
        <EmptyState
          title="No notifications yet"
          description="Booking reminders and support updates will appear here when available."
        />
      ) : (
        data.map((item) => (
          <Card key={item.id} style={item.unread ? styles.unreadCard : undefined}>
            <Text style={styles.eyebrow}>
              {item.type.toUpperCase()} • {item.timeLabel}
            </Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
          </Card>
        ))
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  unreadCard: {
    borderColor: colors.accent500,
  },
  eyebrow: {
    color: colors.accent400,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
