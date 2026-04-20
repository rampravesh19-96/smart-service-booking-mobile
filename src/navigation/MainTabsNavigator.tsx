import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookingNavigator } from "@/navigation/BookingNavigator";
import { BookingsNavigator } from "@/navigation/BookingsNavigator";
import { ProfileNavigator } from "@/navigation/ProfileNavigator";
import { colors, radius, spacing, typography } from "@/theme";
import { MainTabParamList } from "@/types/navigation";

const Tab = createBottomTabNavigator<MainTabParamList>();
const BASE_TAB_BAR_HEIGHT = 60;
const ANDROID_EXTRA_BOTTOM_SPACING = 10;

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={[styles.icon, focused && styles.iconActive]}>
      <Text style={[styles.iconText, focused && styles.iconTextActive]}>{label}</Text>
    </View>
  );
}

export function MainTabsNavigator() {
  const insets = useSafeAreaInsets();
  const extraBottomInset = Platform.OS === "android" ? ANDROID_EXTRA_BOTTOM_SPACING : 0;
  const bottomInset = Math.max(insets.bottom, spacing.sm) + extraBottomInset;
  const tabBarHeight = BASE_TAB_BAR_HEIGHT + bottomInset;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            paddingTop: spacing.sm,
            paddingBottom: bottomInset,
          },
        ],
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
    borderTopWidth: 1,
  },
  tabBarItem: {
    paddingBottom: Platform.OS === "android" ? 2 : 0,
  },
  tabBarLabel: {
    fontSize: typography.caption,
    fontWeight: "700",
    marginTop: Platform.OS === "android" ? 0 : 2,
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
