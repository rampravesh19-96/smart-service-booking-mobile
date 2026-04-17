export type ServiceCategory = {
  id: string;
  name: string;
  iconLabel: string;
  shortDescription: string;
  serviceCount?: number;
};

export type ServiceAddOn = {
  id: string;
  title: string;
  price: number;
  durationMinutes: number;
};

export type ServiceReviewSummary = {
  averageRating: number;
  totalReviews: number;
  highlight: string;
};

export type RatingBreakdownItem = {
  stars: 1 | 2 | 3 | 4 | 5;
  percentage: number;
};

export type ProviderInfo = {
  name: string;
  yearsActive: number;
  completedJobs: number;
  arrivalPromise: string;
  highlights: string[];
  trustBadges: string[];
};

export type Review = {
  id: string;
  serviceId: string;
  userName: string;
  rating: number;
  dateLabel: string;
  comment: string;
  tags: string[];
};

export type Service = {
  id: string;
  categoryId: string;
  title: string;
  tagline: string;
  basePrice: number;
  rating: number;
  durationMinutes: number;
  heroImage: string;
  badges: string[];
  imageGallery: string[];
  about: string;
  inclusions: string[];
  addOns: ServiceAddOn[];
  reviewSummary: ServiceReviewSummary;
  providerName: string;
  nearbyLabel: string;
  provider: ProviderInfo;
  ratingBreakdown: RatingBreakdownItem[];
  isFeatured?: boolean;
  isPopularNearby?: boolean;
};

export type Address = {
  id: string;
  label: string;
  line1: string;
  city: string;
  pinCode: string;
  isDefault?: boolean;
};

export type PaymentMethod = "UPI" | "Card" | "Wallet";

export type BookingStatus =
  | "pending_confirmation"
  | "upcoming"
  | "in_progress"
  | "completed"
  | "cancelled";

export type BookingTimelineItem = {
  id: string;
  title: string;
  timeLabel: string;
  state: "done" | "current" | "upcoming";
};

export type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  dateLabel: string;
  slotLabel: string;
  addressLabel: string;
  providerName: string;
  amount: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  addOnTitles: string[];
  notes?: string;
  canReschedule?: boolean;
  canCancel?: boolean;
  timeline: BookingTimelineItem[];
};

export type AuthSession = {
  userName: string;
  phoneNumber: string;
  token: string;
  email: string;
  preferredCity: string;
  memberSince: string;
  totalBookings: number;
};

export type PromoOffer = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  accentColor: string;
};

export type SlotOption = {
  id: string;
  dateLabel: string;
  displayDate: string;
  slotLabel: string;
  availability: "high" | "limited";
};

export type HomeFeed = {
  categories: ServiceCategory[];
  featuredServices: Service[];
  nearbyServices: Service[];
  popularServices: Service[];
  offers: PromoOffer[];
  upcomingBooking?: Booking;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timeLabel: string;
  type: "booking" | "offer" | "support";
  unread: boolean;
};

export type SupportCategory = {
  id: string;
  title: string;
  subtitle: string;
  quickActions: string[];
};

export type SmartFinderSuggestion = {
  serviceId: string;
  reason: string;
  addOnSuggestion?: string;
  bookingTip?: string;
};

export type SmartFinderResult = {
  interpretedNeed: string;
  suggestions: SmartFinderSuggestion[];
};
