import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { BookingStepCard } from "@/components/common/BookingStepCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { InfoRow } from "@/components/ui/InfoRow";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useAddresses } from "@/hooks/useBookings";
import { useServiceDetail } from "@/hooks/useCatalog";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { spacing } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";
import { calculateBookingTotal, getSelectedAddOns } from "@/utils/booking";
import { formatCurrency, formatDuration } from "@/utils/formatters";

type Props = NativeStackScreenProps<BookingStackParamList, "BookingSummary">;

export function BookingSummaryScreen({ navigation }: Props) {
  const draft = useBookingDraftStore((state) => state.draft);
  const updateDraft = useBookingDraftStore((state) => state.updateDraft);
  const [notes, setNotes] = useState(draft.notes ?? "");
  const { data: service } = useServiceDetail(draft.serviceId);
  const { data: addresses } = useAddresses();

  useEffect(() => {
    setNotes(draft.notes ?? "");
  }, [draft.notes]);

  const address = addresses?.find((item) => item.id === draft.addressId);
  const selectedAddOns = getSelectedAddOns(service, draft.selectedAddOnIds);
  const pricing = calculateBookingTotal(service, draft.selectedAddOnIds);

  if (!service || !address || !draft.slotLabel || !draft.dateLabel) {
    return (
      <AppScreen
        header={<ScreenHeader title="Booking summary" subtitle="Complete your selections first" />}
      >
        <EmptyState
          title="Booking information is incomplete"
          description="Select a service, address, and slot to view the pricing summary."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Booking summary"
          subtitle="Review the final service, slot, address, and payment amount before checkout."
        />
      }
    >
      <BookingStepCard
        step="STEP 1"
        title="Service"
        value={`${service.title} • ${formatDuration(service.durationMinutes)}`}
      />
      <Button
        label="Edit Service"
        variant="ghost"
        onPress={() => navigation.navigate("ServiceDetail", { serviceId: service.id })}
      />
      <BookingStepCard
        step="STEP 2"
        title="Address"
        value={`${address.label} • ${address.line1}, ${address.city}`}
      />
      <Button
        label="Edit Address"
        variant="ghost"
        onPress={() => navigation.navigate("AddressList")}
      />
      <BookingStepCard
        step="STEP 3"
        title="Slot"
        value={`${draft.dateLabel} • ${draft.slotLabel}`}
      />
      <Button
        label="Edit Slot"
        variant="ghost"
        onPress={() => navigation.navigate("SlotSelection")}
      />

      <Card>
        <Input
          label="Notes for the professional"
          multiline
          numberOfLines={3}
          onChangeText={setNotes}
          placeholder="Add entry instructions, preferred time notes, or special requests"
          style={{ minHeight: 88, textAlignVertical: "top", paddingVertical: 14 }}
          value={notes}
        />
      </Card>

      <Card>
        <InfoRow label="Service package" value={formatCurrency(service.basePrice)} />
        {selectedAddOns.map((addOn) => (
          <InfoRow key={addOn.id} label={addOn.title} value={formatCurrency(addOn.price)} />
        ))}
        <InfoRow label="Platform fee" value={formatCurrency(pricing.platformFee)} />
        <InfoRow emphasized label="To pay" value={formatCurrency(pricing.total)} />
      </Card>

      <View style={styles.actions}>
        <Button
          label="Choose Payment"
          onPress={() => {
            updateDraft({ notes });
            navigation.navigate("PaymentMethod");
          }}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  actions: {
    marginTop: spacing.sm,
  },
});
