import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors, spacing, typography } from "@/theme";

export function SplashScreen() {
  return (
    <LinearGradient colors={[colors.brand900, colors.brand700]} style={styles.root}>
      <View style={styles.mark}>
        <Text style={styles.markLabel}>SS</Text>
      </View>
      <Text style={styles.title}>Smart Service Booking</Text>
      <Text style={styles.subtitle}>Preparing your booking workspace...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  mark: {
    width: 76,
    height: 76,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent500,
  },
  markLabel: {
    color: colors.white,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h1,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});
