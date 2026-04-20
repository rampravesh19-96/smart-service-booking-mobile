import { PropsWithChildren, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "@/theme";

type AppScreenProps = PropsWithChildren<{
  header?: ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  footer?: ReactNode;
  keyboardAware?: boolean;
}>;

export function AppScreen({
  children,
  header,
  scrollable = true,
  padded = true,
  footer,
  keyboardAware = false,
}: AppScreenProps) {
  const content = (
    <View style={[styles.content, padded && styles.padded]}>{children}</View>
  );

  return (
    <LinearGradient colors={[colors.brand900, colors.brand800]} style={styles.root}>
      <SafeAreaView edges={footer ? ["top"] : ["top", "bottom"]} style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={
            keyboardAware ? Platform.select({ ios: "padding", android: "height" }) : undefined
          }
          keyboardVerticalOffset={keyboardAware ? spacing.md : 0}
          style={styles.keyboardContainer}
        >
          {header}
          {scrollable ? (
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                footer ? styles.scrollContentWithFooter : null,
              ]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {content}
            </ScrollView>
          ) : (
            content
          )}
          {footer}
        </KeyboardAvoidingView>
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing["3xl"],
  },
  scrollContentWithFooter: {
    paddingBottom: spacing.xl,
  },
  content: {
    flexGrow: 1,
  },
  padded: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },
});
