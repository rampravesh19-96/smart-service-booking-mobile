import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { colors, spacing, typography } from "@/theme";
import { Booking } from "@/types/domain";
import { formatCurrency } from "@/utils/formatters";

type BookingCardProps = {
  booking: Booking;
  onPress?: () => void;
};

export function BookingCard({ booking, onPress }: BookingCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.id}>{booking.id}</Text>
          <StatusPill status={booking.status} />
        </View>
        <Text style={styles.title}>{booking.serviceTitle}</Text>
        <Text style={styles.meta}>
          {booking.dateLabel} • {booking.slotLabel}
        </Text>
        <Text style={styles.meta}>{booking.addressLabel}</Text>
        <View style={styles.row}>
          <Text style={styles.provider}>{booking.providerName}</Text>
          <Text style={styles.amount}>{formatCurrency(booking.amount)}</Text>
        </View>
      </Card>
    </Pressable>
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
    fontSize: typography.h3,
    fontWeight: "700",
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
  provider: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
  amount: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: "800",
  },
});
