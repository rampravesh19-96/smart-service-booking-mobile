import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>NO RESULT</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.accent400,
    fontSize: typography.caption,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
