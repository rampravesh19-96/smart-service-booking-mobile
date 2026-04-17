import { useQuery } from "@tanstack/react-query";

import {
  fetchCategories,
  fetchServiceById,
  fetchServices,
  fetchSlotsForService,
} from "@/mocks/services/catalogService";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

export function useServices(search?: string, categoryId?: string) {
  return useQuery({
    queryKey: ["services", search ?? "", categoryId ?? ""],
    queryFn: () => fetchServices(search, categoryId),
  });
}

export function useServiceDetail(serviceId?: string) {
  return useQuery({
    queryKey: ["service-detail", serviceId],
    queryFn: () => fetchServiceById(serviceId),
  });
}

export function useSlotOptions(serviceId?: string) {
  return useQuery({
    queryKey: ["service-slots", serviceId],
    queryFn: () => fetchSlotsForService(serviceId),
    enabled: Boolean(serviceId),
  });
}
