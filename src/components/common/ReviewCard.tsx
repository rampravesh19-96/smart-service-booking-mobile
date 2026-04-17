import { StyleSheet, Text, View } from "react-native";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { colors, spacing, typography } from "@/theme";
import { Review } from "@/types/domain";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.name}>{review.userName}</Text>
          <Text style={styles.meta}>{`★ ${review.rating} • ${review.dateLabel}`}</Text>
        </View>
        {review.tags[0] ? <Badge label={review.tags[0]} /> : null}
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      <Text style={styles.tags}>{review.tags.slice(1).join(" • ")}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
  comment: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  tags: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
  },
});
