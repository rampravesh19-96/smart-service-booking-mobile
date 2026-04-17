import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useAuthStore } from "@/store/authStore";
import { colors, spacing, typography } from "@/theme";
import { ProfileStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<ProfileStackParamList, "ProfileHome">;

export function ProfileScreen({ navigation }: Props) {
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Profile"
          subtitle="Account details, preferences, notifications, and support entry points."
        />
      }
    >
      <Card>
        <Text style={styles.name}>{session?.userName ?? "Rahul Mehra"}</Text>
        <Text style={styles.meta}>{session?.phoneNumber ?? "+91 98765 43210"}</Text>
        <Text style={styles.meta}>{session?.email ?? "rahul.mehra@example.com"}</Text>
        <Text style={styles.meta}>
          {session?.preferredCity ?? "Bengaluru"} • Member since {session?.memberSince ?? "Jan 2024"}
        </Text>
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{session?.totalBookings ?? 18}</Text>
          <Text style={styles.statLabel}>Bookings completed</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Avg experience</Text>
        </Card>
      </View>

      <View style={styles.actions}>
        <Button label="Edit Profile" variant="secondary" onPress={() => navigation.navigate("EditProfile")} />
        <Button label="Notifications" variant="secondary" onPress={() => navigation.navigate("Notifications")} />
        <Button label="Settings" variant="secondary" onPress={() => navigation.navigate("Settings")} />
        <Button label="Help & Support" variant="secondary" onPress={() => navigation.navigate("HelpSupport")} />
        <Button label="Sign Out" variant="ghost" onPress={() => signOut()} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  name: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  meta: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
  },
  actions: {
    gap: spacing.md,
  },
});
