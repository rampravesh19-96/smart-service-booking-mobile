import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/AppScreen";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { colors, spacing, typography } from "@/theme";

type PlaceholderScreenProps = {
  title: string;
  subtitle: string;
  bodyTitle: string;
  bodyDescription: string;
  children?: ReactNode;
};

export function PlaceholderScreen({
  title,
  subtitle,
  bodyTitle,
  bodyDescription,
  children,
}: PlaceholderScreenProps) {
  return (
    <AppScreen
      header={<ScreenHeader title={title} subtitle={subtitle} />}
      scrollable={true}
    >
      <EmptyState title={bodyTitle} description={bodyDescription} />
      {children ? <View style={styles.extra}>{children}</View> : null}
      <Text style={styles.note}>
        Phase 1 scaffold: structure, layout, and placeholder UX are ready for the
        next implementation pass.
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  extra: {
    gap: spacing.md,
  },
  note: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
});
