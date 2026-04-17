import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BookingHistoryScreen } from "@/screens/bookings/BookingHistoryScreen";
import { UpcomingBookingDetailScreen } from "@/screens/bookings/UpcomingBookingDetailScreen";
import { RescheduleBookingScreen } from "@/screens/bookings/RescheduleBookingScreen";
import { CancelBookingScreen } from "@/screens/bookings/CancelBookingScreen";
import { NotificationsScreen } from "@/screens/profile/NotificationsScreen";
import { colors } from "@/theme";
import { BookingsStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export function BookingsNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.brand900 },
      }}
    >
      <Stack.Screen component={BookingHistoryScreen} name="BookingHistory" />
      <Stack.Screen
        component={UpcomingBookingDetailScreen}
        name="UpcomingBookingDetail"
      />
      <Stack.Screen component={RescheduleBookingScreen} name="RescheduleBooking" />
      <Stack.Screen component={CancelBookingScreen} name="CancelBooking" />
      <Stack.Screen component={NotificationsScreen} name="Notifications" />
    </Stack.Navigator>
  );
}
