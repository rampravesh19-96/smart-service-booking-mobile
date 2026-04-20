import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPaymentOrder, verifyPaymentResult } from "@/api/payments/paymentService";
import { createBooking } from "@/mocks/services/bookingService";
import { openRazorpayCheckout } from "@/services/payments/razorpayCheckout";
import { AuthSession, PaymentMethod } from "@/types/domain";
import { BookingPaymentIntent } from "@/types/payments";

type CompleteBookingPaymentPayload = {
  serviceId: string;
  addressId: string;
  dateLabel: string;
  slotLabel: string;
  selectedAddOnIds: string[];
  notes?: string;
  paymentMethod: PaymentMethod;
  amount: number;
  serviceTitle: string;
  customer: AuthSession;
};

export function useCompleteBookingPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CompleteBookingPaymentPayload) => {
      const intent: BookingPaymentIntent = {
        amount: payload.amount,
        currency: "INR",
        description: `${payload.serviceTitle} booking`,
        receipt: `booking_${Date.now()}`,
        serviceTitle: payload.serviceTitle,
        paymentMethod: payload.paymentMethod,
        customer: {
          name: payload.customer.userName,
          email: payload.customer.email,
          contact: payload.customer.phoneNumber,
        },
        notes: {
          service_id: payload.serviceId,
          slot: payload.slotLabel,
        },
      };

      const order = await createPaymentOrder({
        amount: payload.amount * 100,
        currency: intent.currency,
        receipt: intent.receipt,
        notes: intent.notes,
      });

      const checkoutResult = await openRazorpayCheckout({
        order,
        intent,
      });

      const verification = await verifyPaymentResult(checkoutResult);

      if (!verification.verified) {
        throw new Error("Payment verification failed. Please contact support if money was deducted.");
      }

      const booking = await createBooking({
        serviceId: payload.serviceId,
        addressId: payload.addressId,
        slotLabel: payload.slotLabel,
        dateLabel: payload.dateLabel,
        paymentMethod: payload.paymentMethod,
        selectedAddOnIds: payload.selectedAddOnIds,
        notes: payload.notes,
      });

      return {
        booking,
        order,
        checkoutResult,
      };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", variables.serviceId] });
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
    },
  });
}
