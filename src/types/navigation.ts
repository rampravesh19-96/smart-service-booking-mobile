export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  OtpVerify: { phoneNumber?: string } | undefined;
};

export type BookingStackParamList = {
  Home: undefined;
  Search: undefined;
  CategoryListing: { categoryId?: string } | undefined;
  ServiceDetail: { serviceId?: string } | undefined;
  Reviews: { serviceId?: string } | undefined;
  AddressList: undefined;
  AddAddress: undefined;
  SlotSelection: undefined;
  BookingSummary: undefined;
  PaymentMethod: undefined;
  BookingSuccess: { bookingId?: string } | undefined;
};

export type BookingsStackParamList = {
  BookingHistory: undefined;
  UpcomingBookingDetail: { bookingId?: string } | undefined;
  RescheduleBooking: { bookingId?: string } | undefined;
  CancelBooking: { bookingId?: string } | undefined;
  Notifications: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  Settings: undefined;
  HelpSupport: undefined;
  SupportIssue: { categoryId?: string; issueTitle?: string } | undefined;
  Notifications: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  BookingsTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  AuthStack: undefined;
  AppStack: undefined;
  RootModal: undefined;
  SearchModal: undefined;
  ConfirmationModal: { title?: string; message?: string } | undefined;
};
