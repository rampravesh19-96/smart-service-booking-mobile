import { PaymentMethod } from "@/types/domain";

export type PaymentOrderRequest = {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
};

export type PaymentOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
};

export type RazorpayPaymentSuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export type RazorpayPaymentError = {
  code?: string | number;
  description?: string;
  source?: string;
  step?: string;
  reason?: string;
  metadata?: {
    payment_id?: string;
    order_id?: string;
  };
};

export type PaymentVerificationRequest = RazorpayPaymentSuccess;

export type PaymentVerificationResponse = {
  verified: boolean;
};

export type CheckoutCustomer = {
  name: string;
  email: string;
  contact: string;
};

export type BookingPaymentIntent = {
  amount: number;
  currency: string;
  description: string;
  receipt: string;
  customer: CheckoutCustomer;
  serviceTitle: string;
  paymentMethod: PaymentMethod;
  notes?: Record<string, string>;
};
