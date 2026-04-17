import { StyleSheet, Switch, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

type ToggleRowProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: () => void;
};

export function ToggleRow({
  title,
  subtitle,
  value,
  onValueChange,
}: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Switch
        onValueChange={onValueChange}
        trackColor={{ false: colors.borderSoft, true: colors.accent500 }}
        thumbColor={colors.white}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
});
