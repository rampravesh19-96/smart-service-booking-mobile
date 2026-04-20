import RazorpayCheckout from "react-native-razorpay";

import { assertClientPaymentConfig, getPaymentConfig } from "@/config/payments";
import {
  BookingPaymentIntent,
  PaymentOrderResponse,
  RazorpayPaymentError,
  RazorpayPaymentSuccess,
} from "@/types/payments";

export class PaymentFlowError extends Error {
  kind: "cancelled" | "failed" | "config";

  constructor(kind: "cancelled" | "failed" | "config", message: string) {
    super(message);
    this.kind = kind;
  }
}

function classifyCheckoutError(error: RazorpayPaymentError | undefined) {
  const description = error?.description ?? "Payment could not be completed.";
  const lowerDescription = description.toLowerCase();
  const reason = error?.reason?.toLowerCase() ?? "";

  if (
    lowerDescription.includes("cancel") ||
    lowerDescription.includes("dismiss") ||
    lowerDescription.includes("back button") ||
    reason.includes("cancel")
  ) {
    return new PaymentFlowError("cancelled", "Payment was cancelled before completion.");
  }

  return new PaymentFlowError("failed", description);
}

export async function openRazorpayCheckout(params: {
  order: PaymentOrderResponse;
  intent: BookingPaymentIntent;
}): Promise<RazorpayPaymentSuccess> {
  assertClientPaymentConfig();
  const paymentConfig = getPaymentConfig();

  const { order, intent } = params;

  try {
    return await RazorpayCheckout.open({
      key: paymentConfig.razorpayKeyId,
      amount: order.amount.toString(),
      currency: order.currency,
      order_id: order.id,
      name: paymentConfig.merchantName,
      description: intent.description,
      prefill: {
        name: intent.customer.name,
        email: intent.customer.email,
        contact: intent.customer.contact.replace(/[^\d]/g, ""),
      },
      notes: intent.notes,
      theme: {
        color: paymentConfig.themeColor,
      },
      retry: {
        enabled: true,
        max_count: 2,
      },
      send_sms_hash: true,
      modal: {
        confirm_close: true,
      },
    });
  } catch (error) {
    throw classifyCheckoutError(error as RazorpayPaymentError);
  }
}
