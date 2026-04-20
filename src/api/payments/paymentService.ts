import { assertClientPaymentConfig, paymentConfig } from "@/config/payments";
import {
  PaymentOrderRequest,
  PaymentOrderResponse,
  PaymentVerificationRequest,
  PaymentVerificationResponse,
} from "@/types/payments";

async function requestPaymentApi<T>(path: string, body: unknown): Promise<T> {
  assertClientPaymentConfig();
  const requestUrl = `${paymentConfig.paymentsApiBaseUrl}${path}`;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log("[payments] base URL:", paymentConfig.paymentsApiBaseUrl);
    // eslint-disable-next-line no-console
    console.log("[payments] request URL:", requestUrl);
  }

  let response: Response;

  try {
    response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown network error while reaching payment server.";

    throw new Error(
      `Could not reach the payment server at ${requestUrl}. Check that your phone and laptop are on the same Wi-Fi, the backend is running, and EXPO_PUBLIC_PAYMENTS_API_BASE_URL uses your LAN IP. Network error: ${message}`,
    );
  }

  let data: (T & { message?: string }) | null = null;

  try {
    data = (await response.json()) as T & { message?: string };
  } catch {
    throw new Error(
      `Payment server responded with invalid JSON for ${requestUrl}. Check the backend logs for a crash or proxy issue.`,
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Payment server returned HTTP ${response.status} for ${requestUrl}.`,
    );
  }

  return data as T;
}

export function createPaymentOrder(payload: PaymentOrderRequest) {
  return requestPaymentApi<PaymentOrderResponse>("/payments/order", payload);
}

export function verifyPaymentResult(payload: PaymentVerificationRequest) {
  return requestPaymentApi<PaymentVerificationResponse>("/payments/verify", payload);
}
