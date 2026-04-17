import { Review } from "@/types/domain";

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    serviceId: "svc-1",
    userName: "Aditi S.",
    rating: 5,
    dateLabel: "2 days ago",
    comment:
      "The team was punctual, explained the checklist clearly, and cleaned corners most vendors skip.",
    tags: ["Punctual", "Thorough", "Professional"],
  },
  {
    id: "rev-2",
    serviceId: "svc-1",
    userName: "Karan M.",
    rating: 4,
    dateLabel: "1 week ago",
    comment:
      "Good end result and responsive support. Would book again before hosting guests.",
    tags: ["Good support", "Value for money"],
  },
  {
    id: "rev-3",
    serviceId: "svc-2",
    userName: "Neha R.",
    rating: 5,
    dateLabel: "3 days ago",
    comment:
      "Technician quickly diagnosed the cooling issue and suggested only the add-on that actually made sense.",
    tags: ["Honest advice", "Fast diagnosis"],
  },
  {
    id: "rev-4",
    serviceId: "svc-3",
    userName: "Ishita P.",
    rating: 5,
    dateLabel: "5 days ago",
    comment:
      "Very hygienic setup and the facial felt premium. Great option for at-home appointments.",
    tags: ["Hygienic", "Premium feel"],
  },
];
