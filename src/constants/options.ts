export const paymentMethods = ["UPI", "Card", "Wallet"] as const;

export const bookingStatuses = [
  "pending_confirmation",
  "upcoming",
  "in_progress",
  "completed",
  "cancelled",
] as const;

export const cancelReasons = [
  "Booked by mistake",
  "Need a different time",
  "Found another provider",
  "No longer required",
] as const;

export const serviceSortOptions = [
  { id: "recommended", label: "Recommended" },
  { id: "rating", label: "Top Rated" },
  { id: "priceLowToHigh", label: "Price: Low to High" },
] as const;
