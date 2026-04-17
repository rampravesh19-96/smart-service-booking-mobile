import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";

import { BookingNavigator } from "@/navigation/BookingNavigator";
import { BookingsNavigator } from "@/navigation/BookingsNavigator";
import { ProfileNavigator } from "@/navigation/ProfileNavigator";
import { colors, radius, spacing, typography } from "@/theme";
import { MainTabParamList } from "@/types/navigation";

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={[styles.icon, focused && styles.iconActive]}>
      <Text style={[styles.iconText, focused && styles.iconTextActive]}>{label}</Text>
    </View>
  );
}

export function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        component={BookingNavigator}
        name="HomeTab"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="HM" />,
        }}
      />
      <Tab.Screen
        component={BookingsNavigator}
        name="BookingsTab"
        options={{
          title: "Bookings",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="BK" />,
        }}
      />
      <Tab.Screen
        component={ProfileNavigator}
        name="ProfileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="PF" />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surfacePrimary,
    borderTopColor: colors.borderSoft,
    height: 76,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  tabBarLabel: {
    fontSize: typography.caption,
    fontWeight: "700",
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  iconActive: {
    backgroundColor: colors.accent500,
  },
  iconText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "800",
  },
  iconTextActive: {
    color: colors.white,
  },
});
