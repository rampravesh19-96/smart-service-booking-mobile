import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { useSlotOptions } from "@/hooks/useCatalog";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { colors, typography } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "SlotSelection">;

export function SlotSelectionScreen({ navigation }: Props) {
  const draft = useBookingDraftStore((state) => state.draft);
  const updateDraft = useBookingDraftStore((state) => state.updateDraft);
  const { data, isLoading, isError } = useSlotOptions(draft.serviceId);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Choose a slot"
          subtitle="Clear availability cues make booking feel reliable and premium."
        />
      }
      footer={
        <BottomActionBar>
          <Button
            disabled={!draft.slotId}
            label="Continue to Summary"
            onPress={() => navigation.navigate("BookingSummary")}
          />
        </BottomActionBar>
      }
    >
      {!draft.serviceId ? (
        <EmptyState
          title="Choose a service first"
          description="The booking draft starts from a selected service, then moves into address and time selection."
        />
      ) : isLoading ? (
        <>
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </>
      ) : isError ? (
        <EmptyState
          title="Could not load slots"
          description="Slot selection is query-driven and ready for retry or real backend integration later."
        />
      ) : (
        (data ?? []).map((slot) => {
          const selected = draft.slotId === slot.id;

          return (
            <Pressable
              key={slot.id}
              onPress={() =>
                updateDraft({
                  slotId: slot.id,
                  dateLabel: slot.dateLabel,
                  slotLabel: slot.slotLabel,
                })
              }
            >
              <Card style={selected ? styles.selectedCard : undefined}>
                <Text style={styles.title}>{slot.displayDate}</Text>
                <Text style={styles.copy}>{slot.slotLabel}</Text>
                <Text style={styles.availability}>
                  {slot.availability === "high" ? "Good availability" : "Limited availability"}
                </Text>
              </Card>
            </Pressable>
          );
        })
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
    fontSize: typography.h3,
    fontWeight: "700",
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
