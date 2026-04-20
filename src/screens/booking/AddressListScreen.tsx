import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useAddresses } from "@/hooks/useBookings";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { colors, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "AddressList">;

export function AddressListScreen({ navigation }: Props) {
  const { data, isLoading, isError } = useAddresses();
  const selectedAddressId = useBookingDraftStore((state) => state.draft.addressId);
  const updateDraft = useBookingDraftStore((state) => state.updateDraft);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Select address"
          subtitle="Choose where the service should happen"
          actionLabel="Add New"
          onActionPress={() => navigation.navigate("AddAddress")}
        />
      }
      footer={
        <BottomActionBar>
          <Button
            disabled={!selectedAddressId}
            label="Continue to Slots"
            onPress={() => navigation.navigate("SlotSelection")}
          />
        </BottomActionBar>
      }
    >
      {isLoading ? (
        <>
          <SkeletonBlock height={100} />
          <SkeletonBlock height={100} />
        </>
      ) : isError ? (
        <EmptyState
          title="Addresses unavailable"
          description="This screen is wired for async loading and saved address selection."
        />
      ) : !data?.length ? (
        <EmptyState
          title="No saved addresses"
          description="Add a home or office address to continue your booking."
        />
      ) : (
        data.map((address) => (
          <Pressable key={address.id} onPress={() => updateDraft({ addressId: address.id })}>
            <Card style={selectedAddressId === address.id ? styles.selectedCard : undefined}>
              <Text style={styles.title}>
                {address.label} {address.isDefault ? "• Default" : ""}
              </Text>
              <Text style={styles.copy}>
                {address.line1}, {address.city} {address.pinCode}
              </Text>
            </Card>
          </Pressable>
        ))
      )}
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
    fontSize: typography.body,
    fontWeight: "700",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
