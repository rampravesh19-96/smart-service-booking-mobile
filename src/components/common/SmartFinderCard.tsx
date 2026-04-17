import { Pressable, StyleSheet, Text, View } from "react-native";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { colors, spacing, typography } from "@/theme";
import { Service, SmartFinderResult } from "@/types/domain";

type SmartFinderCardProps = {
  result: SmartFinderResult;
  services: Service[];
  onOpenService?: (serviceId: string) => void;
};

export function SmartFinderCard({
  result,
  services,
  onOpenService,
}: SmartFinderCardProps) {
  return (
    <Card style={styles.card}>
      <Badge label="Smart Service Finder" />
      <Text style={styles.title}>Best match for the problem you described</Text>
      <Text style={styles.copy}>{result.interpretedNeed}</Text>
      {result.suggestions.map((suggestion) => {
        const service = services.find((item) => item.id === suggestion.serviceId);

        return (
          <Pressable
            key={suggestion.serviceId}
            onPress={() => onOpenService?.(suggestion.serviceId)}
            style={styles.suggestion}
          >
            <View style={styles.suggestionCopy}>
              <Text style={styles.serviceTitle}>{service?.title ?? "Suggested service"}</Text>
              <Text style={styles.reason}>{suggestion.reason}</Text>
              {suggestion.addOnSuggestion ? (
                <Text style={styles.hint}>Suggested add-on: {suggestion.addOnSuggestion}</Text>
              ) : null}
              {suggestion.bookingTip ? (
                <Text style={styles.hint}>Booking tip: {suggestion.bookingTip}</Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(44, 140, 255, 0.08)",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  suggestion: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.md,
  },
  suggestionCopy: {
    gap: 4,
  },
  serviceTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
  reason: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
  hint: {
    color: colors.accent400,
    fontSize: typography.bodySm,
    fontWeight: "600",
  },
});
