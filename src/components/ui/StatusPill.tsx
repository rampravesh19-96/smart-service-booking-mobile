import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";
import { BookingStatus } from "@/types/domain";

const pillMap = {
  pending_confirmation: {
    bg: "rgba(247, 144, 9, 0.18)",
    text: colors.warning500,
  },
  upcoming: { bg: "rgba(44, 140, 255, 0.18)", text: colors.accent400 },
  in_progress: { bg: "rgba(44, 140, 255, 0.18)", text: colors.accent400 },
  completed: { bg: "rgba(23, 178, 106, 0.18)", text: colors.success500 },
  cancelled: { bg: "rgba(240, 68, 56, 0.18)", text: colors.danger500 },
} as const;

type StatusPillProps = {
  status: BookingStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <View style={[styles.pill, { backgroundColor: pillMap[status].bg }]}>
      <Text style={[styles.text, { color: pillMap[status].text }]}>
        {status.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: typography.caption,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});
