import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useToast } from "@/components/feedback/ToastProvider";
import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useRescheduleBooking, useBookingDetail } from "@/hooks/useBookings";
import { useSlotOptions } from "@/hooks/useCatalog";
import { colors, typography } from "@/theme";
import { BookingsStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingsStackParamList, "RescheduleBooking">;

export function RescheduleBookingScreen({ navigation, route }: Props) {
  const bookingId = route.params?.bookingId;
  const { data: booking } = useBookingDetail(bookingId);
  const { data: slots } = useSlotOptions(booking?.serviceId);
  const [selectedSlotId, setSelectedSlotId] = useState<string>();
  const rescheduleMutation = useRescheduleBooking();
  const { showToast } = useToast();

  if (!bookingId || !booking) {
    return (
      <AppScreen header={<ScreenHeader title="Reschedule booking" subtitle="Booking not found" />}>
        <EmptyState
          title="No booking selected"
          description="Open reschedule from a booking detail screen to continue."
        />
      </AppScreen>
    );
  }

  const selectedSlot = slots?.find((item) => item.id === selectedSlotId);

  const handleReschedule = async () => {
    if (!selectedSlot) {
      return;
    }

    try {
      await rescheduleMutation.mutateAsync({
        bookingId,
        dateLabel: selectedSlot.dateLabel,
        slotLabel: selectedSlot.slotLabel,
      });
      showToast({
        tone: "success",
        title: "Booking rescheduled",
        message: `New slot saved for ${selectedSlot.dateLabel}.`,
      });
      navigation.replace("UpcomingBookingDetail", { bookingId });
    } catch {
      showToast({
        tone: "error",
        title: "Reschedule failed",
        message: "Please try a different slot or retry in a moment.",
      });
    }
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Reschedule booking"
          subtitle="Reselection flow with clear available slot options."
        />
      }
      footer={
        <BottomActionBar>
          <Button
            disabled={!selectedSlot}
            label="Confirm New Slot"
            loading={rescheduleMutation.isPending}
            onPress={handleReschedule}
          />
        </BottomActionBar>
      }
    >
      <Card>
        <Text style={styles.title}>{booking.serviceTitle}</Text>
        <Text style={styles.copy}>
          Current slot: {booking.dateLabel} • {booking.slotLabel}
        </Text>
      </Card>

      {(slots ?? []).map((slot) => (
        <Pressable key={slot.id} onPress={() => setSelectedSlotId(slot.id)}>
          <Card style={selectedSlotId === slot.id ? styles.selectedCard : undefined}>
            <Text style={styles.title}>{slot.displayDate}</Text>
            <Text style={styles.copy}>{slot.slotLabel}</Text>
            <Text style={styles.availability}>
              {slot.availability === "high" ? "Good availability" : "Limited availability"}
            </Text>
          </Card>
        </Pressable>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  selectedCard: {
    borderColor: colors.accent500,
    backgroundColor: "rgba(44, 140, 255, 0.12)",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  availability: {
    color: colors.accent400,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
});
