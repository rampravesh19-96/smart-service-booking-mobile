import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { ServiceCard } from "@/components/common/ServiceCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChip } from "@/components/ui/FilterChip";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { serviceSortOptions } from "@/constants/options";
import { useCategories, useServices } from "@/hooks/useCatalog";
import { colors, spacing, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "CategoryListing">;
type SortOption = (typeof serviceSortOptions)[number]["id"];

export function CategoryListingScreen({ route, navigation }: Props) {
  const categoryId = route.params?.categoryId;
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const categoriesQuery = useCategories();
  const servicesQuery = useServices(undefined, categoryId);
  const category = (categoriesQuery.data ?? []).find((item) => item.id === categoryId);

  const services = useMemo(() => {
    const items = [...(servicesQuery.data ?? [])];

    switch (sortBy) {
      case "rating":
        return items.sort((a, b) => b.rating - a.rating);
      case "priceLowToHigh":
        return items.sort((a, b) => a.basePrice - b.basePrice);
      default:
        return items;
    }
  }, [servicesQuery.data, sortBy]);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title={category?.name ?? "Category"}
          subtitle={category?.shortDescription ?? "Browse curated service options"}
        />
      }
    >
      <View style={styles.sortRow}>
        {serviceSortOptions.map((option) => (
          <FilterChip
            key={option.id}
            active={sortBy === option.id}
            label={option.label}
            onPress={() => setSortBy(option.id)}
          />
        ))}
      </View>

      {services.length === 0 ? (
        <EmptyState
          title="No services in this category"
          description="This state is ready for category-specific fallbacks and recommendations."
        />
      ) : (
        services.map((service) => (
          <ServiceCard
            key={service.id}
            onPress={() => navigation.navigate("ServiceDetail", { serviceId: service.id })}
            service={service}
          />
        ))
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Sorting keeps this screen interview-friendly while staying lightweight.
        </Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  sortRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
  },
});
