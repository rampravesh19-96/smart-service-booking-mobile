import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { CategoryTile } from "@/components/common/CategoryTile";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SmartFinderCard } from "@/components/common/SmartFinderCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChip } from "@/components/ui/FilterChip";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useCategories, useServices } from "@/hooks/useCatalog";
import { useSmartFinder } from "@/hooks/useSmartFinder";
import { spacing } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "Search">;

export function SearchScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>();
  const categoriesQuery = useCategories();
  const servicesQuery = useServices(searchQuery, activeCategoryId);
  const smartFinder = useSmartFinder();

  const categoryResults = useMemo(
    () =>
      (categoriesQuery.data ?? []).filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [categoriesQuery.data, searchQuery],
  );

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Search services"
          subtitle="Search by category or describe the real-world problem you need solved."
        />
      }
    >
      <Input
        label="What do you need help with?"
        onChangeText={setSearchQuery}
        placeholder="Try 'AC not cooling' or 'need deep cleaning before guests'"
        value={searchQuery}
      />

      <Button
        disabled={!searchQuery.trim()}
        label="Use Smart Service Finder"
        loading={smartFinder.isPending}
        onPress={() => smartFinder.mutate(searchQuery)}
      />

      {smartFinder.data ? (
        <SmartFinderCard
          onOpenService={(serviceId) => navigation.navigate("ServiceDetail", { serviceId })}
          result={smartFinder.data}
          services={servicesQuery.data ?? []}
        />
      ) : null}

      <View style={styles.filters}>
        <FilterChip
          active={!activeCategoryId}
          label="All"
          onPress={() => setActiveCategoryId(undefined)}
        />
        {(categoriesQuery.data ?? []).map((category) => (
          <FilterChip
            key={category.id}
            active={activeCategoryId === category.id}
            label={category.name}
            onPress={() =>
              setActiveCategoryId((current) =>
                current === category.id ? undefined : category.id,
              )
            }
          />
        ))}
      </View>

      {servicesQuery.isLoading ? (
        <View style={styles.loadingStack}>
          <SkeletonBlock height={120} />
          <SkeletonBlock height={170} />
        </View>
      ) : servicesQuery.isError ? (
        <EmptyState
          title="Search is unavailable right now"
          description="The screen supports query-driven loading and error states with room for retry handling."
        />
      ) : (
        <>
          {categoryResults.length > 0 && searchQuery ? (
            <View style={styles.section}>
              <SectionHeader
                title="Matching categories"
                subtitle="Useful when the user starts broad before choosing a service."
              />
              <FlatList
                data={categoryResults}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CategoryTile category={item} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            </View>
          ) : null}

          <View style={styles.section}>
            <SectionHeader
              title="Matching services"
              subtitle={
                searchQuery
                  ? `Results for "${searchQuery}"`
                  : "Start typing or use category chips to narrow discovery."
              }
            />
            {(servicesQuery.data ?? []).length === 0 ? (
              <EmptyState
                title="No matching services"
                description="Try a broader term like cleaning, repair, salon, or remove filters to see more options."
              />
            ) : (
              (servicesQuery.data ?? []).map((service) => (
                <ServiceCard
                  key={service.id}
                  onPress={() => navigation.navigate("ServiceDetail", { serviceId: service.id })}
                  service={service}
                />
              ))
            )}
          </View>
        </>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
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
