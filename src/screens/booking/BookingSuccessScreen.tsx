import { StyleSheet, Text, View } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useBookingDetail } from "@/hooks/useBookings";
import { colors, spacing, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";
import { formatCurrency } from "@/utils/formatters";

type Props = NativeStackScreenProps<BookingStackParamList, "BookingSuccess">;

export function BookingSuccessScreen({ navigation, route }: Props) {
  const { data: booking } = useBookingDetail(route.params?.bookingId);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Booking confirmed"
          subtitle="The final state gives users confidence immediately after checkout."
        />
      }
    >
      <Card>
        <Text style={styles.mark}>CONFIRMED</Text>
        <Text style={styles.title}>
          {booking?.serviceTitle ?? "Your booking is confirmed"}
        </Text>
        <Text style={styles.copy}>
          {booking
            ? `${booking.dateLabel} • ${booking.slotLabel}`
            : "Your selected slot has been reserved."}
        </Text>
        <Text style={styles.copy}>{booking?.addressLabel}</Text>
        <Text style={styles.amount}>
          {booking ? formatCurrency(booking.amount) : "Payment captured"}
        </Text>
      </Card>

      <View style={styles.actions}>
        <Button
          label="View Booking"
          onPress={() => {
            const parentNavigation =
              navigation.getParent() as NavigationProp<ParamListBase>;
            parentNavigation?.navigate("BookingsTab", {
              screen: "UpcomingBookingDetail",
              params: { bookingId: route.params?.bookingId },
            });
          }}
        />
        <Button
          label="Back to Home"
          variant="secondary"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  mark: {
    color: colors.success500,
    fontSize: typography.caption,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  amount: {
    color: colors.white,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  actions: {
    gap: spacing.md,
  },
});
