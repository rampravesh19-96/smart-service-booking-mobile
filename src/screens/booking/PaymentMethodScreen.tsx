import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { InfoRow } from "@/components/ui/InfoRow";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { paymentMethods } from "@/constants/options";
import { useCreateBooking, useAddresses } from "@/hooks/useBookings";
import { useServiceDetail } from "@/hooks/useCatalog";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { colors, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";
import { calculateBookingTotal } from "@/utils/booking";
import { formatCurrency } from "@/utils/formatters";

type Props = NativeStackScreenProps<BookingStackParamList, "PaymentMethod">;

export function PaymentMethodScreen({ navigation }: Props) {
  const draft = useBookingDraftStore((state) => state.draft);
  const updateDraft = useBookingDraftStore((state) => state.updateDraft);
  const resetDraft = useBookingDraftStore((state) => state.resetDraft);
  const createBookingMutation = useCreateBooking();
  const { data: service } = useServiceDetail(draft.serviceId);
  const { data: addresses } = useAddresses();
  const pricing = calculateBookingTotal(service, draft.selectedAddOnIds);

  const address = useMemo(
    () => addresses?.find((item) => item.id === draft.addressId),
    [addresses, draft.addressId],
  );

  if (!service || !address || !draft.slotLabel || !draft.dateLabel) {
    return (
      <AppScreen header={<ScreenHeader title="Payment method" subtitle="Booking details missing" />}>
        <EmptyState
          title="Complete booking summary first"
          description="Payment remains a mock UX, but it still depends on a complete booking draft."
        />
      </AppScreen>
    );
  }

  const handleConfirm = async () => {
    if (
      !draft.paymentMethod ||
      !service ||
      !address ||
      !draft.slotLabel ||
      !draft.dateLabel
    ) {
      return;
    }

    const booking = await createBookingMutation.mutateAsync({
      serviceId: service.id,
      addressId: address.id,
      slotLabel: draft.slotLabel,
      dateLabel: draft.dateLabel,
      paymentMethod: draft.paymentMethod,
      selectedAddOnIds: draft.selectedAddOnIds,
      notes: draft.notes,
    });

    resetDraft();
    navigation.navigate("BookingSuccess", { bookingId: booking.id });
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Payment method"
          subtitle="Mock payment UX with a credible pre-payment review."
        />
      }
    >
      {paymentMethods.map((method) => {
        const selected = draft.paymentMethod === method;

        return (
          <Pressable
            key={method}
            onPress={() => updateDraft({ paymentMethod: method })}
          >
            <Card style={selected ? styles.cardActive : undefined}>
              <Text style={styles.method}>{method}</Text>
              <Text style={styles.copy}>
                {method === "UPI"
                  ? "Fast, familiar, and ideal for quick mobile checkout."
                  : method === "Card"
                    ? "Debit and credit card placeholder checkout."
                    : "Wallet balance or cashback-driven payment placeholder."}
              </Text>
            </Card>
          </Pressable>
        );
      })}

      <Card>
        <InfoRow label="Service" value={service.title} />
        <InfoRow label="Scheduled for" value={`${draft.dateLabel} • ${draft.slotLabel}`} />
        <InfoRow label="Payable now" value={formatCurrency(pricing.total)} emphasized />
      </Card>

      <Button
        disabled={!draft.paymentMethod}
        label={`Pay ${formatCurrency(pricing.total)}`}
        loading={createBookingMutation.isPending}
        onPress={handleConfirm}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  cardActive: {
    borderColor: colors.accent500,
    backgroundColor: "rgba(44, 140, 255, 0.12)",
  },
  method: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
});
