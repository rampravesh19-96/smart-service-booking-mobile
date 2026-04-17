import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { BookingCard } from "@/components/common/BookingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChip } from "@/components/ui/FilterChip";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useBookings } from "@/hooks/useBookings";
import { BookingStatus } from "@/types/domain";
import { BookingsStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingsStackParamList, "BookingHistory">;

export function BookingHistoryScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<BookingStatus | "all">("all");
  const { data, isLoading, isError } = useBookings();

  const filteredBookings = useMemo(() => {
    if (activeFilter === "all") {
      return data ?? [];
    }

    return (data ?? []).filter((booking) => booking.status === activeFilter);
  }, [activeFilter, data]);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Your bookings"
          subtitle="History, upcoming services, and lifecycle actions in one place."
          actionLabel="Alerts"
          onActionPress={() => navigation.navigate("Notifications")}
        />
      }
    >
      <View style={styles.filters}>
        {["all", "upcoming", "completed", "cancelled"].map((filter) => (
          <FilterChip
            key={filter}
            active={activeFilter === filter}
            label={filter === "all" ? "All" : filter}
            onPress={() => setActiveFilter(filter as BookingStatus | "all")}
          />
        ))}
      </View>

      {isLoading ? (
        <>
          <SkeletonBlock height={120} />
          <SkeletonBlock height={120} />
        </>
      ) : isError ? (
        <EmptyState
          title="Could not load booking history"
          description="The list is connected to TanStack Query and mutation-driven refreshes."
        />
      ) : filteredBookings.length === 0 ? (
        <EmptyState
          title="No bookings for this filter"
          description="Upcoming, completed, and cancelled states are all supported by the same booking feed."
        />
      ) : (
        filteredBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onPress={() =>
              navigation.navigate("UpcomingBookingDetail", { bookingId: booking.id })
            }
          />
        ))
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
