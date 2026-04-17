import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { colors, radius, spacing, typography } from "@/theme";
import { ServiceCategory } from "@/types/domain";

type CategoryTileProps = {
  category: ServiceCategory;
  onPress?: () => void;
};

export function CategoryTile({ category, onPress }: CategoryTileProps) {
  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <Card style={styles.card}>
        <View style={styles.icon}>
          <Text style={styles.iconLabel}>{category.iconLabel}</Text>
        </View>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.subtitle}>{category.shortDescription}</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 180,
  },
  card: {
    minHeight: 156,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLabel: {
    color: colors.accent400,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 19,
  },
});
