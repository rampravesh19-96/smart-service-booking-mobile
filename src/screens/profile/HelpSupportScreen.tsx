import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useSupportCategories } from "@/hooks/useSupport";
import { colors, radius, spacing, typography } from "@/theme";
import { ProfileStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<ProfileStackParamList, "HelpSupport">;

export function HelpSupportScreen({ navigation }: Props) {
  const { data, isLoading, isError } = useSupportCategories();

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Help & support"
          subtitle="Mock support flows with realistic issue categories and quick entry points."
        />
      }
    >
      {isLoading ? (
        <Card>
          <Text style={styles.placeholder}>Loading support categories...</Text>
        </Card>
      ) : isError ? (
        <EmptyState
          title="Support center unavailable"
          description="This area is ready for FAQ, support tickets, and issue routing."
        />
      ) : (
        data?.map((category) => (
          <Card key={category.id}>
            <Text style={styles.title}>{category.title}</Text>
            <Text style={styles.subtitle}>{category.subtitle}</Text>
            <View style={styles.quickActions}>
              {category.quickActions.map((action) => (
                <Pressable
                  key={action}
                  onPress={() =>
                    navigation.navigate("SupportIssue", {
                      categoryId: category.id,
                      issueTitle: action,
                    })
                  }
                  style={styles.actionChip}
                >
                  <Text style={styles.actionText}>{action}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        ))
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  actionChip: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceTertiary,
  },
  actionText: {
    color: colors.textPrimary,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
});
