import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens/home/HomeScreen";
import { SearchScreen } from "@/screens/home/SearchScreen";
import { CategoryListingScreen } from "@/screens/home/CategoryListingScreen";
import { ServiceDetailScreen } from "@/screens/booking/ServiceDetailScreen";
import { AddressListScreen } from "@/screens/booking/AddressListScreen";
import { AddAddressScreen } from "@/screens/booking/AddAddressScreen";
import { SlotSelectionScreen } from "@/screens/booking/SlotSelectionScreen";
import { BookingSummaryScreen } from "@/screens/booking/BookingSummaryScreen";
import { PaymentMethodScreen } from "@/screens/booking/PaymentMethodScreen";
import { BookingSuccessScreen } from "@/screens/booking/BookingSuccessScreen";
import { ReviewsScreen } from "@/screens/booking/ReviewsScreen";
import { colors } from "@/theme";
import { BookingStackParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<BookingStackParamList>();

export function BookingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.brand900 },
      }}
    >
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={SearchScreen} name="Search" />
      <Stack.Screen component={CategoryListingScreen} name="CategoryListing" />
      <Stack.Screen component={ServiceDetailScreen} name="ServiceDetail" />
      <Stack.Screen component={ReviewsScreen} name="Reviews" />
      <Stack.Screen component={AddressListScreen} name="AddressList" />
      <Stack.Screen component={AddAddressScreen} name="AddAddress" />
      <Stack.Screen component={SlotSelectionScreen} name="SlotSelection" />
      <Stack.Screen component={BookingSummaryScreen} name="BookingSummary" />
      <Stack.Screen component={PaymentMethodScreen} name="PaymentMethod" />
      <Stack.Screen component={BookingSuccessScreen} name="BookingSuccess" />
    </Stack.Navigator>
  );
}
