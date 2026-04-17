import { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthNavigator } from "@/navigation/AuthNavigator";
import { MainTabsNavigator } from "@/navigation/MainTabsNavigator";
import { SplashScreen } from "@/screens/system/SplashScreen";
import { SearchModalScreen } from "@/screens/modals/SearchModalScreen";
import { ConfirmationModalScreen } from "@/screens/modals/ConfirmationModalScreen";
import { colors } from "@/theme";
import { RootStackParamList } from "@/types/navigation";
import { useAuthStore } from "@/store/authStore";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.brand900,
    card: colors.surfacePrimary,
    border: colors.borderSoft,
    text: colors.textPrimary,
    primary: colors.accent500,
  },
};

export function RootNavigator() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isHydrated ? (
          <Stack.Screen component={SplashScreen} name="Splash" />
        ) : session ? (
          <>
            <Stack.Screen component={MainTabsNavigator} name="AppStack" />
            <Stack.Screen
              component={SearchModalScreen}
              name="SearchModal"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              component={ConfirmationModalScreen}
              name="ConfirmationModal"
              options={{ presentation: "transparentModal" }}
            />
          </>
        ) : (
          <Stack.Screen component={AuthNavigator} name="AuthStack" />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
