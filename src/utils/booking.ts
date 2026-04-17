import { Service } from "@/types/domain";

export const PLATFORM_FEE = 49;

export function getSelectedAddOns(service: Service | undefined, selectedAddOnIds: string[]) {
  if (!service) {
    return [];
  }

  return service.addOns.filter((addOn) => selectedAddOnIds.includes(addOn.id));
}

export function calculateBookingTotal(
  service: Service | undefined,
  selectedAddOnIds: string[],
) {
  if (!service) {
    return { subtotal: 0, addOnsTotal: 0, platformFee: PLATFORM_FEE, total: 0 };
  }

  const addOns = getSelectedAddOns(service, selectedAddOnIds);
  const addOnsTotal = addOns.reduce((sum, item) => sum + item.price, 0);
  const subtotal = service.basePrice + addOnsTotal;

  return {
    subtotal,
    addOnsTotal,
    platformFee: PLATFORM_FEE,
    total: subtotal + PLATFORM_FEE,
  };
}
