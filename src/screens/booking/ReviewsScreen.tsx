import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { ReviewCard } from "@/components/common/ReviewCard";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useReviews } from "@/hooks/useReviews";
import { useServiceDetail } from "@/hooks/useCatalog";
import { colors, spacing, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "Reviews">;

export function ReviewsScreen({ route }: Props) {
  const serviceId = route.params?.serviceId;
  const { data: service } = useServiceDetail(serviceId);
  const { data: reviews, isLoading, isError } = useReviews(serviceId);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Ratings & reviews"
          subtitle="Trust signals and real-user comments in a dedicated mobile-friendly view."
        />
      }
    >
      {service ? (
        <Card>
          <Text style={styles.title}>{service.title}</Text>
          <Text style={styles.meta}>
            ★ {service.reviewSummary.averageRating} from {service.reviewSummary.totalReviews} reviews
          </Text>
          {service.ratingBreakdown.map((item) => (
            <View key={item.stars} style={styles.barRow}>
              <Text style={styles.barLabel}>{item.stars}★</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${item.percentage}%` }]} />
              </View>
              <Text style={styles.barLabel}>{item.percentage}%</Text>
            </View>
          ))}
        </Card>
      ) : null}

      {isLoading ? (
        <Card>
          <Text style={styles.meta}>Loading reviews...</Text>
        </Card>
      ) : isError ? (
        <EmptyState
          title="Reviews unavailable"
          description="This screen is wired for async review data and can be connected to a real provider later."
        />
      ) : !(reviews?.length) ? (
        <EmptyState
          title="No reviews yet"
          description="Review content will appear here once users start rating the service."
        />
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  barLabel: {
    width: 32,
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.accent500,
    borderRadius: 999,
  },
});
