import { mockAddresses } from "@/mocks/data/addresses";
import { mockBookings } from "@/mocks/data/bookings";
import { mockServices } from "@/mocks/data/services";
import { simulateFailure } from "@/mocks/utils/network";
import { Booking, BookingTimelineItem, PaymentMethod } from "@/types/domain";

type CreateBookingPayload = {
  serviceId: string;
  addressId: string;
  slotLabel: string;
  dateLabel: string;
  paymentMethod: PaymentMethod;
  selectedAddOnIds: string[];
  notes?: string;
};

type UpdateBookingPayload = {
  bookingId: string;
  reason?: string;
  dateLabel?: string;
  slotLabel?: string;
};

export async function fetchAddresses() {
  return simulateFailure(async () => [...mockAddresses]);
}

export async function createAddress(payload: {
  label: string;
  line1: string;
  city: string;
  pinCode: string;
}) {
  return simulateFailure(async () => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      ...payload,
      isDefault: false,
    };

    mockAddresses.unshift(newAddress);
    return newAddress;
  });
}

export async function fetchBookings() {
  return simulateFailure(async () => [...mockBookings]);
}

export async function fetchBookingById(id?: string) {
  return simulateFailure(async () => {
    const booking = mockBookings.find((item) => item.id === id) ?? mockBookings[0];

    if (!booking) {
      throw new Error("Booking details not found.");
    }

    return booking;
  });
}

export async function createBooking(payload: CreateBookingPayload) {
  return simulateFailure(async () => {
    const service = mockServices.find((item) => item.id === payload.serviceId);
    const address = mockAddresses.find((item) => item.id === payload.addressId);

    if (!service || !address) {
      throw new Error("Booking information is incomplete.");
    }

    const selectedAddOns = service.addOns.filter((addOn) =>
      payload.selectedAddOnIds.includes(addOn.id),
    );
    const total =
      service.basePrice +
      selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0) +
      49;

    const timeline: BookingTimelineItem[] = [
      {
        id: `tl-${Date.now()}-1`,
        title: "Booking confirmed",
        timeLabel: "Just now",
        state: "done",
      },
      {
        id: `tl-${Date.now()}-2`,
        title: "Partner assignment in progress",
        timeLabel: "Within 15 min",
        state: "current",
      },
      {
        id: `tl-${Date.now()}-3`,
        title: "Service scheduled",
        timeLabel: `${payload.dateLabel} • ${payload.slotLabel}`,
        state: "upcoming",
      },
    ];

    const booking: Booking = {
      id: `BK-${Math.floor(24000 + Math.random() * 1000)}`,
      serviceId: service.id,
      serviceTitle: service.title,
      dateLabel: payload.dateLabel,
      slotLabel: payload.slotLabel,
      addressLabel: `${address.label} - ${address.city}`,
      providerName: service.providerName,
      amount: total,
      status: "upcoming",
      paymentMethod: payload.paymentMethod,
      addOnTitles: selectedAddOns.map((item) => item.title),
      notes: payload.notes,
      canCancel: true,
      canReschedule: true,
      timeline,
    };

    mockBookings.unshift(booking);
    return booking;
  });
}

export async function cancelBooking(payload: UpdateBookingPayload) {
  return simulateFailure(async () => {
    const bookingIndex = mockBookings.findIndex((item) => item.id === payload.bookingId);

    if (bookingIndex === -1) {
      throw new Error("Booking not found.");
    }

    mockBookings[bookingIndex] = {
      ...mockBookings[bookingIndex],
      status: "cancelled",
      canCancel: false,
      canReschedule: false,
      timeline: [
        ...mockBookings[bookingIndex].timeline,
        {
          id: `tl-${Date.now()}-cancel`,
          title: `Cancelled${payload.reason ? `: ${payload.reason}` : ""}`,
          timeLabel: "Just now",
          state: "done",
        },
      ],
    };

    return mockBookings[bookingIndex];
  });
}

export async function rescheduleBooking(payload: UpdateBookingPayload) {
  return simulateFailure(async () => {
    const bookingIndex = mockBookings.findIndex((item) => item.id === payload.bookingId);

    if (bookingIndex === -1 || !payload.dateLabel || !payload.slotLabel) {
      throw new Error("Reschedule details are incomplete.");
    }

    mockBookings[bookingIndex] = {
      ...mockBookings[bookingIndex],
      dateLabel: payload.dateLabel,
      slotLabel: payload.slotLabel,
      timeline: [
        ...mockBookings[bookingIndex].timeline,
        {
          id: `tl-${Date.now()}-reschedule`,
          title: "Booking rescheduled",
          timeLabel: `${payload.dateLabel} • ${payload.slotLabel}`,
          state: "current",
        },
      ],
    };

    return mockBookings[bookingIndex];
  });
}
