import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelBooking,
  createAddress,
  createBooking,
  fetchAddresses,
  fetchBookingById,
  fetchBookings,
  rescheduleBooking,
} from "@/mocks/services/bookingService";

export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddresses,
  });
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });
}

export function useBookingDetail(bookingId?: string) {
  return useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => fetchBookingById(bookingId),
    enabled: Boolean(bookingId),
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", variables.bookingId] });
      queryClient.invalidateQueries({ queryKey: ["home-feed"] });
    },
  });
}

export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rescheduleBooking,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["bookings", variables.bookingId] });
    },
  });
}
