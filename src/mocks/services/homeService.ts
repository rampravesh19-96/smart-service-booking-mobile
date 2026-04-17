import { mockBookings } from "@/mocks/data/bookings";
import { mockCategories } from "@/mocks/data/categories";
import { mockOffers } from "@/mocks/data/offers";
import { mockServices } from "@/mocks/data/services";
import { simulateFailure } from "@/mocks/utils/network";
import { HomeFeed } from "@/types/domain";

export async function fetchHomeFeed(): Promise<HomeFeed> {
  return simulateFailure(async () => ({
    categories: mockCategories,
    featuredServices: mockServices.filter((service) => service.isFeatured),
    nearbyServices: mockServices.filter((service) => service.isPopularNearby).slice(0, 3),
    popularServices: [...mockServices].sort((a, b) => b.rating - a.rating).slice(0, 3),
    offers: mockOffers,
    upcomingBooking: mockBookings.find((booking) => booking.status === "upcoming"),
  }));
}
