import { useMutation } from "@tanstack/react-query";

import { getSmartServiceSuggestions } from "@/mocks/services/aiService";

export function useSmartFinder() {
  return useMutation({
    mutationFn: getSmartServiceSuggestions,
  });
}
