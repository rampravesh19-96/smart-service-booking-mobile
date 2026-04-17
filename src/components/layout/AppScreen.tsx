import { PropsWithChildren, ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "@/theme";

type AppScreenProps = PropsWithChildren<{
  header?: ReactNode;
  scrollable?: boolean;
  padded?: boolean;
}>;

export function AppScreen({
  children,
  header,
  scrollable = true,
  padded = true,
}: AppScreenProps) {
  const content = (
    <View style={[styles.content, padded && styles.padded]}>{children}</View>
  );

  return (
    <LinearGradient colors={[colors.brand900, colors.brand800]} style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {header}
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing["3xl"],
  },
  content: {
    flexGrow: 1,
  },
  padded: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
});
