import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileScreen } from "@/screens/profile/ProfileScreen";
import { EditProfileScreen } from "@/screens/profile/EditProfileScreen";
import { SettingsScreen } from "@/screens/profile/SettingsScreen";
import { HelpSupportScreen } from "@/screens/profile/HelpSupportScreen";
import { SupportIssueScreen } from "@/screens/profile/SupportIssueScreen";
import { NotificationsScreen } from "@/screens/profile/NotificationsScreen";
import { colors } from "@/theme";
import { ProfileStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.brand900 },
      }}
    >
      <Stack.Screen component={ProfileScreen} name="ProfileHome" />
      <Stack.Screen component={EditProfileScreen} name="EditProfile" />
      <Stack.Screen component={SettingsScreen} name="Settings" />
      <Stack.Screen component={HelpSupportScreen} name="HelpSupport" />
      <Stack.Screen component={SupportIssueScreen} name="SupportIssue" />
      <Stack.Screen component={NotificationsScreen} name="Notifications" />
    </Stack.Navigator>
  );
}
