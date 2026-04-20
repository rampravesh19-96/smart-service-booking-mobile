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
import { cancelReasons } from "@/constants/options";
import { useBookingDetail, useCancelBooking } from "@/hooks/useBookings";
import { colors, radius, spacing, typography } from "@/theme";
import { BookingsStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingsStackParamList, "CancelBooking">;

export function CancelBookingScreen({ navigation, route }: Props) {
  const bookingId = route.params?.bookingId;
  const [selectedReason, setSelectedReason] = useState<string>();
  const { data: booking } = useBookingDetail(bookingId);
  const cancelMutation = useCancelBooking();
  const { showToast } = useToast();

  if (!bookingId || !booking) {
    return (
      <AppScreen header={<ScreenHeader title="Cancel booking" subtitle="Booking not found" />}>
        <EmptyState
          title="No booking selected"
          description="Open cancellation from a booking detail screen to continue."
        />
      </AppScreen>
    );
  }

  const handleCancel = async () => {
    if (!selectedReason) {
      return;
    }

    try {
      await cancelMutation.mutateAsync({ bookingId, reason: selectedReason });
      showToast({
        tone: "success",
        title: "Booking cancelled",
        message: "Your booking status has been updated successfully.",
      });
      navigation.replace("UpcomingBookingDetail", { bookingId });
    } catch {
      showToast({
        tone: "error",
        title: "Cancellation failed",
        message: "Please try again in a moment.",
      });
    }
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Cancel booking"
          subtitle="Surface policy clarity before the user confirms cancellation."
        />
      }
      footer={
        <BottomActionBar>
          <Button
            disabled={!selectedReason}
            label="Confirm Cancellation"
            loading={cancelMutation.isPending}
            onPress={handleCancel}
          />
        </BottomActionBar>
      }
    >
      <Card>
        <Text style={styles.title}>{booking.serviceTitle}</Text>
        <Text style={styles.copy}>
          {booking.dateLabel} • {booking.slotLabel}
        </Text>
        <Text style={styles.copy}>
          Refund, if applicable, will reflect within 3-5 business days.
        </Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Why are you cancelling?</Text>
        {cancelReasons.map((reason) => (
          <Pressable
            key={reason}
            onPress={() => setSelectedReason(reason)}
            style={[styles.reasonChip, selectedReason === reason && styles.reasonChipActive]}
          >
            <Text style={[styles.reasonText, selectedReason === reason && styles.reasonTextActive]}>
              {reason}
            </Text>
          </Pressable>
        ))}
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
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
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  reasonChip: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceTertiary,
  },
  reasonChipActive: {
    borderColor: colors.danger500,
    backgroundColor: "rgba(240, 68, 56, 0.12)",
  },
  reasonText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    fontWeight: "600",
  },
  reasonTextActive: {
    color: colors.white,
  },
});
