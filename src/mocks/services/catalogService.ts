import { mockCategories } from "@/mocks/data/categories";
import { mockServices } from "@/mocks/data/services";
import { mockSlotsByService } from "@/mocks/data/slots";
import { simulateFailure } from "@/mocks/utils/network";

export async function fetchCategories() {
  return simulateFailure(async () => mockCategories);
}

export async function fetchServices(search?: string, categoryId?: string) {
  return simulateFailure(async () => {
    const query = search?.trim().toLowerCase() ?? "";

    return mockServices.filter((service) => {
      const matchesCategory = categoryId ? service.categoryId === categoryId : true;
      const matchesSearch = query
        ? [service.title, service.tagline, service.about].some((value) =>
            value.toLowerCase().includes(query),
          )
        : true;

      return matchesCategory && matchesSearch;
    });
  });
}

export async function fetchServiceById(serviceId?: string) {
  return simulateFailure(async () => {
    const service = mockServices.find((item) => item.id === serviceId) ?? mockServices[0];

    if (!service) {
      throw new Error("Service details could not be loaded.");
    }

    return service;
  });
}

export async function fetchSlotsForService(serviceId?: string) {
  return simulateFailure(async () => mockSlotsByService[serviceId ?? "svc-1"] ?? []);
}
