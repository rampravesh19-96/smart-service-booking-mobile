import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";
import { BookingTimelineItem } from "@/types/domain";

type TimelineItemProps = {
  item: BookingTimelineItem;
};

export function TimelineItem({ item }: TimelineItemProps) {
  const tone =
    item.state === "done"
      ? colors.success500
      : item.state === "current"
        ? colors.accent400
        : colors.textMuted;

  return (
    <View style={styles.row}>
      <View style={styles.track}>
        <View style={[styles.dot, { backgroundColor: tone }]} />
        <View style={styles.line} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.timeLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  track: {
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    marginTop: 4,
  },
  line: {
    width: 1,
    flex: 1,
    marginTop: 6,
    backgroundColor: colors.borderSoft,
  },
  copy: {
    flex: 1,
    gap: 2,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  time: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
});
