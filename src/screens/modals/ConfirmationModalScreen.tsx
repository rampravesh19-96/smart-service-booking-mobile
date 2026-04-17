import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { colors, spacing, typography } from "@/theme";
import { RootStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ConfirmationModal">;

export function ConfirmationModalScreen({ navigation, route }: Props) {
  return (
    <View style={styles.overlay}>
      <Card style={styles.card}>
        <Text style={styles.title}>{route.params?.title ?? "Confirmation modal"}</Text>
        <Text style={styles.copy}>
          {route.params?.message ??
            "Reusable modal shell for confirmations, payment states, or action summaries."}
        </Text>
        <Button label="Close" onPress={() => navigation.goBack()} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    padding: spacing.lg,
  },
  card: {
    gap: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
