import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

type FilterChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function FilterChip({ label, active = false, onPress }: FilterChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.base, active && styles.active]}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  active: {
    backgroundColor: "rgba(44, 140, 255, 0.16)",
    borderColor: colors.accent500,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
  activeLabel: {
    color: colors.accent400,
  },
});
