import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OnboardingScreen } from "@/screens/auth/OnboardingScreen";
import { LoginScreen } from "@/screens/auth/LoginScreen";
import { OtpVerifyScreen } from "@/screens/auth/OtpVerifyScreen";
import { colors } from "@/theme";
import { AuthStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.brand900 },
      }}
    >
      <Stack.Screen component={OnboardingScreen} name="Onboarding" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={OtpVerifyScreen} name="OtpVerify" />
    </Stack.Navigator>
  );
}
