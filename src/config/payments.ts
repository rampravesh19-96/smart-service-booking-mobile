const DEFAULT_PUBLIC_PAYMENTS_API_BASE_URL =
  "https://smart-service-booking-mobile.onrender.com";

let hasLoggedPaymentEnvDiagnostics = false;

function maskPublicKey(value: string) {
  if (!value) {
    return "missing";
  }

  if (value.length <= 8) {
    return `${value.slice(0, 2)}***`;
  }

  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function readClientPaymentConfig() {
  const razorpayKeyId = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID ?? "";
  const paymentsApiBaseUrl = (
    process.env.EXPO_PUBLIC_PAYMENTS_API_BASE_URL ?? DEFAULT_PUBLIC_PAYMENTS_API_BASE_URL
  ).replace(/\/$/, "");

  if (__DEV__ && !hasLoggedPaymentEnvDiagnostics) {
    hasLoggedPaymentEnvDiagnostics = true;
    // eslint-disable-next-line no-console
    console.log("[payments] env diagnostics", {
      razorpayKeyPresent: Boolean(razorpayKeyId),
      razorpayKeyPreview: maskPublicKey(razorpayKeyId),
      paymentsApiBaseUrl,
    });
  }

  return {
    razorpayKeyId,
    paymentsApiBaseUrl,
    merchantName: "Smart Service Booking",
    merchantDescription: "Home services booking",
    currency: "INR",
    themeColor: "#2C8CFF",
  } as const;
}

export function getPaymentConfig() {
  return readClientPaymentConfig();
}

export function assertClientPaymentConfig() {
  const paymentConfig = readClientPaymentConfig();

  if (!paymentConfig.razorpayKeyId) {
    throw new Error(
      "Missing EXPO_PUBLIC_RAZORPAY_KEY_ID in the Expo client bundle. Add it to the root .env, then restart Metro. If you changed it after creating an installed dev build or APK, make a fresh build so the updated env is included.",
    );
  }

  if (
    paymentConfig.paymentsApiBaseUrl.includes("localhost") ||
    paymentConfig.paymentsApiBaseUrl.includes("127.0.0.1")
  ) {
    throw new Error(
      "EXPO_PUBLIC_PAYMENTS_API_BASE_URL cannot use localhost in a shared mobile build. Use the deployed Render backend or a publicly reachable HTTPS URL instead.",
    );
  }
}
