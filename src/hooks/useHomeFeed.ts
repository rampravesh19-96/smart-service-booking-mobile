import { useQuery } from "@tanstack/react-query";

import { fetchHomeFeed } from "@/mocks/services/homeService";

export function useHomeFeed() {
  return useQuery({
    queryKey: ["home-feed"],
    queryFn: fetchHomeFeed,
  });
}
