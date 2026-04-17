import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { colors, spacing, typography } from "@/theme";
import { PromoOffer } from "@/types/domain";

type PromoCardProps = {
  offer: PromoOffer;
};

export function PromoCard({ offer }: PromoCardProps) {
  return (
    <Card style={[styles.card, { borderColor: offer.accentColor }]}>
      <Text style={styles.eyebrow}>{offer.code}</Text>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.subtitle}>{offer.subtitle}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: colors.surfaceSecondary,
  },
  eyebrow: {
    color: colors.accent400,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
});
