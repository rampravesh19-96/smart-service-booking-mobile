import { Text } from "react-native";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { ToggleRow } from "@/components/ui/ToggleRow";
import { useUserPreferencesStore } from "@/store/userPreferencesStore";
import { colors, typography } from "@/theme";

export function SettingsScreen() {
  const preferences = useUserPreferencesStore((state) => state.preferences);
  const togglePreference = useUserPreferencesStore((state) => state.togglePreference);

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Settings"
          subtitle="Useful, realistic preferences without bloating the app."
        />
      }
    >
      <Card>
        <ToggleRow
          title="Push notifications"
          subtitle="Receive booking status updates and reminders."
          value={preferences.pushNotifications}
          onValueChange={() => togglePreference("pushNotifications")}
        />
        <ToggleRow
          title="Promotional alerts"
          subtitle="Get notified about seasonal offers and saved coupons."
          value={preferences.promoAlerts}
          onValueChange={() => togglePreference("promoAlerts")}
        />
        <ToggleRow
          title="Smart reminders"
          subtitle="Receive reminders for repeat services and upcoming bookings."
          value={preferences.smartReminders}
          onValueChange={() => togglePreference("smartReminders")}
        />
        <ToggleRow
          title="Biometric lock"
          subtitle="Protect account access on shared devices."
          value={preferences.biometricLock}
          onValueChange={() => togglePreference("biometricLock")}
        />
      </Card>

      <Card>
        <Text style={{ color: colors.textPrimary, fontSize: typography.body, fontWeight: "700" }}>
          App preferences are persisted locally for this portfolio build.
        </Text>
      </Card>

      <Button label="All Changes Saved" variant="secondary" disabled />
    </AppScreen>
  );
}
