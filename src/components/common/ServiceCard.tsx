import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { colors, radius, spacing, typography } from "@/theme";
import { Service } from "@/types/domain";
import { formatCurrency, formatDuration } from "@/utils/formatters";

type ServiceCardProps = {
  service: Service;
  onPress?: () => void;
};

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <Image contentFit="cover" source={service.heroImage} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.row}>
            <Badge label={service.badges[0]} />
            <Text style={styles.rating}>★ {service.rating}</Text>
          </View>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.tagline}>{service.tagline}</Text>
          <View style={styles.footer}>
            <Text style={styles.meta}>{formatDuration(service.durationMinutes)}</Text>
            <Text style={styles.price}>Starts {formatCurrency(service.basePrice)}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    padding: 0,
  },
  image: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "700",
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
  },
  price: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
