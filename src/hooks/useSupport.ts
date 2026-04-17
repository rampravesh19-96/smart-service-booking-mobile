import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchNotifications } from "@/mocks/services/notificationService";
import { fetchSupportCategories, submitSupportRequest } from "@/mocks/services/supportService";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
}

export function useSupportCategories() {
  return useQuery({
    queryKey: ["support-categories"],
    queryFn: fetchSupportCategories,
  });
}

export function useSubmitSupportRequest() {
  return useMutation({
    mutationFn: submitSupportRequest,
  });
}
