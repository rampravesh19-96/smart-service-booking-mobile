import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { TimelineItem } from "@/components/common/TimelineItem";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { InfoRow } from "@/components/ui/InfoRow";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { StatusPill } from "@/components/ui/StatusPill";
import { useBookingDetail } from "@/hooks/useBookings";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { colors, typography } from "@/theme";
import { BookingsStackParamList } from "@/types/navigation";
import { formatCurrency } from "@/utils/formatters";

type Props = NativeStackScreenProps<BookingsStackParamList, "UpcomingBookingDetail">;

export function UpcomingBookingDetailScreen({ navigation, route }: Props) {
  const bookingId = route.params?.bookingId;
  const { data: booking, isLoading, isError } = useBookingDetail(bookingId);
  const setService = useBookingDraftStore((state) => state.setService);

  if (isLoading) {
    return (
      <AppScreen header={<ScreenHeader title="Booking detail" subtitle="Loading booking state" />}>
        <SkeletonBlock height={140} />
        <SkeletonBlock height={180} />
      </AppScreen>
    );
  }

  if (isError || !booking) {
    return (
      <AppScreen header={<ScreenHeader title="Booking detail" subtitle="Unable to load booking" />}>
        <EmptyState
          title="Booking unavailable"
          description="This detail view is connected to the query layer and supports mutation-driven refreshes."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Booking detail"
          subtitle="Operational booking view with lifecycle actions and timeline status."
        />
      }
      footer={
        <BottomActionBar>
          {booking.canReschedule ? (
            <Button
              label="Reschedule"
              variant="secondary"
              onPress={() => navigation.navigate("RescheduleBooking", { bookingId: booking.id })}
            />
          ) : null}
          {booking.canCancel ? (
            <Button
              label="Cancel Booking"
              variant="ghost"
              onPress={() => navigation.navigate("CancelBooking", { bookingId: booking.id })}
            />
          ) : null}
          <Button
            label="Book This Again"
            variant="secondary"
            onPress={() => {
              setService(booking.serviceId);
              const parentNavigation = navigation.getParent() as NavigationProp<ParamListBase>;
              parentNavigation?.navigate("HomeTab", {
                screen: "ServiceDetail",
                params: { serviceId: booking.serviceId },
              });
            }}
          />
        </BottomActionBar>
      }
    >
      <Animated.View entering={FadeInDown.duration(240)}>
        <Card>
          <View style={styles.row}>
            <Text style={styles.id}>{booking.id}</Text>
            <StatusPill status={booking.status} />
          </View>
          <Text style={styles.title}>{booking.serviceTitle}</Text>
          <InfoRow label="Scheduled for" value={`${booking.dateLabel} • ${booking.slotLabel}`} />
          <InfoRow label="Address" value={booking.addressLabel} />
          <InfoRow label="Partner" value={booking.providerName} />
          <InfoRow label="Amount paid" value={formatCurrency(booking.amount)} emphasized />
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(90).duration(260)}>
        <Card>
          <Text style={styles.sectionTitle}>Status timeline</Text>
          {booking.timeline.map((item) => (
            <TimelineItem item={item} key={item.id} />
          ))}
        </Card>
      </Animated.View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  id: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
});
