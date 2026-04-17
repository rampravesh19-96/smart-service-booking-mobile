import { FlatList, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { BookingCard } from "@/components/common/BookingCard";
import { CategoryTile } from "@/components/common/CategoryTile";
import { PromoCard } from "@/components/common/PromoCard";
import { ServiceCard } from "@/components/common/ServiceCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useHomeFeed } from "@/hooks/useHomeFeed";
import { colors, spacing, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { data, isLoading, isError, refetch } = useHomeFeed();

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Good evening"
          subtitle="Book reliable services with premium mobile UX."
          actionLabel="Search"
          onActionPress={() => navigation.navigate("Search")}
        />
      }
    >
      <View style={styles.hero}>
        <Badge label="Portfolio-grade mobile product" />
        <Text style={styles.heroTitle}>Home services with a conversion-first booking journey.</Text>
        <Text style={styles.heroSubtitle}>
          A polished mobile flow covering discovery, trust, scheduling, checkout,
          and booking lifecycle management.
        </Text>
        <Button
          label="Start a Booking"
          onPress={() => navigation.navigate("ServiceDetail", { serviceId: "svc-1" })}
        />
      </View>

      {isLoading ? (
        <View style={styles.loadingStack}>
          <SkeletonBlock height={110} />
          <SkeletonBlock height={140} />
          <SkeletonBlock height={180} />
        </View>
      ) : isError ? (
        <EmptyState
          title="Could not load the home feed"
          description="This screen is wired to async data and retry states. Try fetching the feed again."
        />
      ) : !data ? (
        <EmptyState
          title="No discovery data yet"
          description="When the feed is available, categories, offers, and personalized sections will show here."
        />
      ) : (
        <>
          {data.upcomingBooking ? (
            <View style={styles.section}>
              <SectionHeader
                title="Next appointment"
                subtitle="Returning users can jump straight into an upcoming service."
              />
              <BookingCard
                booking={data.upcomingBooking}
                onPress={() =>
                  navigation.getParent()?.navigate("BookingsTab", {
                    screen: "UpcomingBookingDetail",
                    params: { bookingId: data.upcomingBooking?.id },
                  } as never)
                }
              />
            </View>
          ) : null}

          <View style={styles.section}>
            <SectionHeader
              title="Offers for today"
              subtitle="Believable promo surfaces make the app feel like a real product."
            />
            <FlatList
              data={data.offers}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PromoCard offer={item} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Popular categories"
              subtitle="Designed for fast thumb-friendly scanning."
            />
            <FlatList
              data={data.categories}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CategoryTile
                  category={item}
                  onPress={() =>
                    navigation.navigate("CategoryListing", { categoryId: item.id })
                  }
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Featured services"
              subtitle="High-intent card treatment for the most portfolio-worthy discovery section."
            />
            {data.featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                onPress={() =>
                  navigation.navigate("ServiceDetail", { serviceId: service.id })
                }
                service={service}
              />
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Popular near you"
              subtitle="Adds locality and demand cues without needing a real backend."
            />
            {data.nearbyServices.map((service) => (
              <ServiceCard
                key={service.id}
                onPress={() =>
                  navigation.navigate("ServiceDetail", { serviceId: service.id })
                }
                service={service}
              />
            ))}
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="Top rated this week"
              subtitle="A second trust-building recommendation lane."
            />
            {data.popularServices.map((service) => (
              <ServiceCard
                key={`${service.id}-popular`}
                onPress={() =>
                  navigation.navigate("ServiceDetail", { serviceId: service.id })
                }
                service={service}
              />
            ))}
          </View>

          <Button label="Refresh feed" variant="secondary" onPress={() => refetch()} />
        </>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: "rgba(44, 140, 255, 0.08)",
    borderRadius: 24,
    padding: spacing.xl,
    gap: spacing.md,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: typography.h1,
    fontWeight: "800",
    lineHeight: 30,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
  },
  section: {
    gap: spacing.md,
  },
  horizontalList: {
    gap: spacing.md,
  },
  loadingStack: {
    gap: spacing.md,
  },
});
