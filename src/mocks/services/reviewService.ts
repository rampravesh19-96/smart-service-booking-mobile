import { mockReviews } from "@/mocks/data/reviews";
import { simulateFailure } from "@/mocks/utils/network";

export async function fetchReviewsByService(serviceId?: string) {
  return simulateFailure(async () =>
    mockReviews.filter((review) => review.serviceId === serviceId),
  );
}
