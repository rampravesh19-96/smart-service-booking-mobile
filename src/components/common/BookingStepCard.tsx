import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { colors, spacing, typography } from "@/theme";

type BookingStepCardProps = {
  step: string;
  title: string;
  value: string;
};

export function BookingStepCard({ step, title, value }: BookingStepCardProps) {
  return (
    <Card>
      <Text style={styles.step}>{step}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
      <Text style={styles.value}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  step: {
    color: colors.accent400,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSoft,
  },
  value: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
