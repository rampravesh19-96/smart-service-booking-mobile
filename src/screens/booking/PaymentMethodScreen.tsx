import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useToast } from "@/components/feedback/ToastProvider";
import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { InfoRow } from "@/components/ui/InfoRow";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { paymentMethods } from "@/constants/options";
import { useAddresses } from "@/hooks/useBookings";
import { useServiceDetail } from "@/hooks/useCatalog";
import { useCompleteBookingPayment } from "@/hooks/usePayments";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { useAuthStore } from "@/store/authStore";
import { colors, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";
import { calculateBookingTotal } from "@/utils/booking";
import { formatCurrency } from "@/utils/formatters";

type Props = NativeStackScreenProps<BookingStackParamList, "PaymentMethod">;

export function PaymentMethodScreen({ navigation }: Props) {
  const { showToast } = useToast();
  const session = useAuthStore((state) => state.session);
  const draft = useBookingDraftStore((state) => state.draft);
  const updateDraft = useBookingDraftStore((state) => state.updateDraft);
  const resetDraft = useBookingDraftStore((state) => state.resetDraft);
  const completeBookingPayment = useCompleteBookingPayment();
  const { data: service } = useServiceDetail(draft.serviceId);
  const { data: addresses } = useAddresses();
  const pricing = calculateBookingTotal(service, draft.selectedAddOnIds);

  const address = useMemo(
    () => addresses?.find((item) => item.id === draft.addressId),
    [addresses, draft.addressId],
  );

  if (!service || !address || !draft.slotLabel || !draft.dateLabel || !session) {
    return (
      <AppScreen header={<ScreenHeader title="Payment method" subtitle="Booking details missing" />}>
        <EmptyState
          title="Complete booking summary first"
          description="Payment requires a complete booking draft and an active signed-in session."
        />
      </AppScreen>
    );
  }

  const handleConfirm = async () => {
    if (!draft.paymentMethod || !draft.dateLabel || !draft.slotLabel) {
      return;
    }

    try {
      const result = await completeBookingPayment.mutateAsync({
        serviceId: service.id,
        addressId: address.id,
        dateLabel: draft.dateLabel,
        slotLabel: draft.slotLabel,
        selectedAddOnIds: draft.selectedAddOnIds,
        notes: draft.notes,
        paymentMethod: draft.paymentMethod,
        amount: pricing.total,
        serviceTitle: service.title,
        customer: session,
      });

      showToast({
        tone: "success",
        title: "Payment successful",
        message: "Razorpay test payment completed and booking has been confirmed.",
      });
      resetDraft();
      navigation.navigate("BookingSuccess", { bookingId: result.booking.id });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Payment could not be completed. Please try again.";

      showToast({
        tone: message.toLowerCase().includes("cancelled") ? "info" : "error",
        title: message.toLowerCase().includes("cancelled")
          ? "Payment cancelled"
          : "Payment failed",
        message,
      });
    }
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Payment method"
          subtitle="Launch real Razorpay checkout in test mode after creating a server-side order."
        />
      }
      footer={
        <BottomActionBar>
          <Button
            disabled={!draft.paymentMethod}
            label={`Pay ${formatCurrency(pricing.total)}`}
            loading={completeBookingPayment.isPending}
            onPress={handleConfirm}
          />
        </BottomActionBar>
      }
    >
      {paymentMethods.map((method, index) => {
        const selected = draft.paymentMethod === method;

        return (
          <Animated.View entering={FadeInDown.delay(index * 70).duration(250)} key={method}>
            <Pressable onPress={() => updateDraft({ paymentMethod: method })}>
              <Card style={selected ? styles.cardActive : undefined}>
                <Text style={styles.method}>{method}</Text>
                <Text style={styles.copy}>
                  {method === "UPI"
                    ? "Opens Razorpay checkout with UPI options in test mode."
                    : method === "Card"
                      ? "Opens Razorpay card checkout with test cards and OTP flow."
                      : "Uses Razorpay-supported wallets where available in test checkout."}
                </Text>
              </Card>
            </Pressable>
          </Animated.View>
        );
      })}

      <Card>
        <Text style={styles.sectionTitle}>Final payment review</Text>
        <InfoRow label="Service" value={service.title} />
        <InfoRow label="Scheduled for" value={`${draft.dateLabel} • ${draft.slotLabel}`} />
        <InfoRow label="At address" value={address.label} />
        <InfoRow label="Customer" value={session.userName} />
        <InfoRow label="Payable now" value={formatCurrency(pricing.total)} emphasized />
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  cardActive: {
    borderColor: colors.accent500,
    backgroundColor: "rgba(44, 140, 255, 0.12)",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
  method: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
});
