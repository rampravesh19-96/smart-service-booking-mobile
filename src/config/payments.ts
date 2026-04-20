export const paymentConfig = {
  razorpayKeyId: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID ?? "",
  paymentsApiBaseUrl: (process.env.EXPO_PUBLIC_PAYMENTS_API_BASE_URL ?? "").replace(
    /\/$/,
    "",
  ),
  merchantName: "Smart Service Booking",
  merchantDescription: "Home services booking",
  currency: "INR",
  themeColor: "#2C8CFF",
} as const;

export function assertClientPaymentConfig() {
  if (!paymentConfig.razorpayKeyId) {
    throw new Error(
      "Missing EXPO_PUBLIC_RAZORPAY_KEY_ID. Add your Razorpay test key_id to the app environment.",
    );
  }

  if (!paymentConfig.paymentsApiBaseUrl) {
    throw new Error(
      "Missing EXPO_PUBLIC_PAYMENTS_API_BASE_URL. Point the app to the demo payment backend.",
    );
  }

  if (
    paymentConfig.paymentsApiBaseUrl.includes("localhost") ||
    paymentConfig.paymentsApiBaseUrl.includes("127.0.0.1")
  ) {
    throw new Error(
      "EXPO_PUBLIC_PAYMENTS_API_BASE_URL cannot use localhost on a physical phone. Use your machine LAN URL instead, for example http://10.151.193.226:8787.",
    );
  }
}
