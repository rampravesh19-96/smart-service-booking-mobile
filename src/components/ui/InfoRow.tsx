import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "@/theme";

type InfoRowProps = {
  label: string;
  value: string;
  emphasized?: boolean;
};

export function InfoRow({ label, value, emphasized = false }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, emphasized && styles.emphasizedLabel]}>{label}</Text>
      <Text style={[styles.value, emphasized && styles.emphasizedValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  emphasizedLabel: {
    color: colors.white,
    fontWeight: "800",
  },
  emphasizedValue: {
    color: colors.white,
    fontSize: typography.h3,
    fontWeight: "800",
  },
});
