import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useServiceDetail } from "@/hooks/useCatalog";
import { useReviews } from "@/hooks/useReviews";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { colors, radius, spacing, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";
import { formatCurrency, formatDuration } from "@/utils/formatters";

type Props = NativeStackScreenProps<BookingStackParamList, "ServiceDetail">;

export function ServiceDetailScreen({ navigation, route }: Props) {
  const serviceId = route.params?.serviceId;
  const { data: service, isLoading, isError } = useServiceDetail(serviceId);
  const { data: reviews } = useReviews(serviceId);
  const draft = useBookingDraftStore((state) => state.draft);
  const setService = useBookingDraftStore((state) => state.setService);
  const toggleAddOn = useBookingDraftStore((state) => state.toggleAddOn);

  if (isLoading) {
    return (
      <AppScreen header={<ScreenHeader title="Service detail" subtitle="Loading package information" />}>
        <SkeletonBlock height={220} />
        <SkeletonBlock height={180} />
        <SkeletonBlock height={200} />
      </AppScreen>
    );
  }

  if (isError || !service) {
    return (
      <AppScreen header={<ScreenHeader title="Service detail" subtitle="Unable to load details" />}>
        <EmptyState
          title="Service details unavailable"
          description="This route is connected to async service data. Retry from the discovery screen."
        />
      </AppScreen>
    );
  }

  const selectedAddOnIds = draft.serviceId === service.id ? draft.selectedAddOnIds : [];

  return (
    <AppScreen
      header={
        <ScreenHeader
          title={service.title}
          subtitle="Rich service detail with trust, pricing, provider depth, and add-on selection."
        />
      }
    >
      <Image contentFit="cover" source={service.heroImage} style={styles.heroImage} />

      <FlatList
        data={service.imageGallery}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image contentFit="cover" source={item} style={styles.galleryImage} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryList}
      />

      <Card>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.tagline}>{service.tagline}</Text>
          </View>
          <Text style={styles.price}>{formatCurrency(service.basePrice)}</Text>
        </View>
        <Text style={styles.meta}>
          ★ {service.rating} • {formatDuration(service.durationMinutes)} • {service.nearbyLabel}
        </Text>
        <Text style={styles.about}>{service.about}</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Provider trust details</Text>
        <Text style={styles.providerName}>{service.provider.name}</Text>
        <Text style={styles.about}>
          {service.provider.completedJobs}+ jobs completed • {service.provider.yearsActive} years active
        </Text>
        <Text style={styles.about}>{service.provider.arrivalPromise}</Text>
        {service.provider.highlights.map((item) => (
          <Text key={item} style={styles.bulletText}>• {item}</Text>
        ))}
        <View style={styles.badgesRow}>
          {service.provider.trustBadges.map((badge) => (
            <View key={badge} style={styles.trustBadge}>
              <Text style={styles.trustBadgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>What's included</Text>
        {service.inclusions.map((item) => (
          <Text key={item} style={styles.bulletText}>• {item}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Optional add-ons</Text>
        {service.addOns.map((addOn) => {
          const selected = selectedAddOnIds.includes(addOn.id);

          return (
            <Pressable
              key={addOn.id}
              onPress={() => {
                setService(service.id);
                toggleAddOn(addOn.id);
              }}
              style={[styles.addOnCard, selected && styles.addOnSelected]}
            >
              <View style={styles.titleBlock}>
                <Text style={styles.addOnTitle}>{addOn.title}</Text>
                <Text style={styles.addOnMeta}>{formatDuration(addOn.durationMinutes)} add-on</Text>
              </View>
              <Text style={styles.addOnPrice}>{formatCurrency(addOn.price)}</Text>
            </Pressable>
          );
        })}
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Reviews summary</Text>
        <Text style={styles.meta}>
          ★ {service.reviewSummary.averageRating} from {service.reviewSummary.totalReviews} reviews
        </Text>
        <Text style={styles.about}>{service.reviewSummary.highlight}</Text>
        {service.ratingBreakdown.slice(0, 3).map((item) => (
          <View key={item.stars} style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{item.stars}★</Text>
            <View style={styles.breakdownTrack}>
              <View style={[styles.breakdownFill, { width: `${item.percentage}%` }]} />
            </View>
          </View>
        ))}
        <Button
          label={`Read all reviews (${reviews?.length ?? 0})`}
          variant="secondary"
          onPress={() => navigation.navigate("Reviews", { serviceId: service.id })}
        />
      </Card>

      <Button
        label="Start Booking"
        onPress={() => {
          setService(service.id, selectedAddOnIds);
          navigation.navigate("AddressList");
        }}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: radius.lg,
  },
  galleryList: {
    gap: spacing.sm,
  },
  galleryImage: {
    width: 110,
    height: 84,
    borderRadius: radius.md,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  price: {
    color: colors.white,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    fontWeight: "600",
  },
  about: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  providerName: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  bulletText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  trustBadge: {
    borderRadius: radius.pill,
    backgroundColor: "rgba(44, 140, 255, 0.14)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  trustBadgeText: {
    color: colors.accent400,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
  addOnCard: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.surfaceTertiary,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  addOnSelected: {
    borderColor: colors.accent500,
    backgroundColor: "rgba(44, 140, 255, 0.12)",
  },
  addOnTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  addOnMeta: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
  },
  addOnPrice: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: "800",
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  breakdownLabel: {
    width: 28,
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
  breakdownTrack: {
    flex: 1,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceTertiary,
    overflow: "hidden",
  },
  breakdownFill: {
    height: "100%",
    backgroundColor: colors.accent500,
    borderRadius: radius.pill,
  },
});
