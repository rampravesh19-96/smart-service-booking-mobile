import { ServiceCategory } from "@/types/domain";

export const mockCategories: ServiceCategory[] = [
  {
    id: "cleaning",
    name: "Deep Cleaning",
    iconLabel: "CL",
    shortDescription: "Homes, kitchens, and move-in refresh jobs",
    serviceCount: 18,
  },
  {
    id: "salon",
    name: "Salon At Home",
    iconLabel: "SA",
    shortDescription: "Beauty appointments with flexible slots",
    serviceCount: 24,
  },
  {
    id: "ac",
    name: "AC Repair",
    iconLabel: "AC",
    shortDescription: "Service, gas refill, and cooling issues",
    serviceCount: 12,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    iconLabel: "PL",
    shortDescription: "Leak fixes, fittings, and urgent repairs",
    serviceCount: 16,
  },
];
