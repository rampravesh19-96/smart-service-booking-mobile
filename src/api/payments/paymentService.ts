import { assertClientPaymentConfig, getPaymentConfig } from "@/config/payments";
import {
  PaymentOrderRequest,
  PaymentOrderResponse,
  PaymentVerificationRequest,
  PaymentVerificationResponse,
} from "@/types/payments";

type PaymentApiOperation = "createOrder" | "verifyPayment";

function formatPaymentApiError(
  operation: PaymentApiOperation,
  requestUrl: string,
  message: string,
) {
  if (operation === "createOrder") {
    return `Could not create the Razorpay payment order. ${message} Endpoint: ${requestUrl}`;
  }

  return `Payment verification could not be completed. ${message} Endpoint: ${requestUrl}`;
}

async function requestPaymentApi<T>(
  operation: PaymentApiOperation,
  path: string,
  body: unknown,
): Promise<T> {
  assertClientPaymentConfig();
  const paymentConfig = getPaymentConfig();
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
      formatPaymentApiError(
        operation,
        requestUrl,
        `The payment backend is unreachable right now. Please try again in a moment. Network error: ${message}`,
      ),
    );
  }

  let data: (T & { message?: string }) | null = null;

  try {
    data = (await response.json()) as T & { message?: string };
  } catch {
    throw new Error(
      formatPaymentApiError(
        operation,
        requestUrl,
        "The payment backend returned an invalid response. Please try again later.",
      ),
    );
  }

  if (!response.ok) {
    throw new Error(
      formatPaymentApiError(
        operation,
        requestUrl,
        data?.message || `The backend returned HTTP ${response.status}.`,
      ),
    );
  }

  return data as T;
}

export function createPaymentOrder(payload: PaymentOrderRequest) {
  return requestPaymentApi<PaymentOrderResponse>("createOrder", "/payments/order", payload);
}

export function verifyPaymentResult(payload: PaymentVerificationRequest) {
  return requestPaymentApi<PaymentVerificationResponse>(
    "verifyPayment",
    "/payments/verify",
    payload,
  );
}
