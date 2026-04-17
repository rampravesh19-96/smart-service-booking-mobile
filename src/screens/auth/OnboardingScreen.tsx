import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { colors, radius, spacing, typography } from "@/theme";
import { AuthStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

const highlights = [
  "Verified partners and clear pricing",
  "Fast multi-step booking with flexible reschedule",
  "Thoughtful mobile UX built like a real startup product",
];

export function OnboardingScreen({ navigation }: Props) {
  return (
    <AppScreen scrollable={false}>
      <Animated.View entering={FadeInUp.duration(500)} style={styles.hero}>
        <LinearGradient colors={[colors.accent500, colors.brand700]} style={styles.heroCard}>
          <Badge label="Smart Service Booking" />
          <Text style={styles.title}>Book trusted home services with a cleaner mobile flow.</Text>
          <Text style={styles.subtitle}>
            Fast discovery, reliable scheduling, and product-grade booking UX for busy users.
          </Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.featureList}>
        {highlights.map((item, index) => (
          <Animated.View
            entering={FadeInDown.delay(120 * index).duration(450)}
            key={item}
          >
            <Card style={styles.featureCard}>
              <Text style={styles.featureIndex}>{`0${index + 1}`}</Text>
              <Text style={styles.featureText}>{item}</Text>
            </Card>
          </Animated.View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button label="Continue to Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    justifyContent: "center",
    paddingTop: spacing["2xl"],
  },
  heroCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    minHeight: 260,
    justifyContent: "flex-end",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.display,
    fontWeight: "800",
    lineHeight: 40,
  },
  subtitle: {
    color: colors.white,
    fontSize: typography.body,
    lineHeight: 24,
    opacity: 0.88,
  },
  featureList: {
    gap: spacing.md,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  featureIndex: {
    color: colors.accent400,
    fontSize: typography.h3,
    fontWeight: "800",
  },
  featureText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "600",
    lineHeight: 22,
  },
  footer: {
    paddingBottom: spacing["3xl"],
  },
});
