import { useQuery } from "@tanstack/react-query";

import { fetchReviewsByService } from "@/mocks/services/reviewService";

export function useReviews(serviceId?: string) {
  return useQuery({
    queryKey: ["reviews", serviceId],
    queryFn: () => fetchReviewsByService(serviceId),
    enabled: Boolean(serviceId),
  });
}
