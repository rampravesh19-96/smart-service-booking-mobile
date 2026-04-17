import { SupportCategory } from "@/types/domain";

export const mockSupportCategories: SupportCategory[] = [
  {
    id: "booking",
    title: "Booking issues",
    subtitle: "Reschedule problems, assigned partner concerns, or missed slots",
    quickActions: ["Booking not visible", "Partner delayed", "Need urgent reschedule"],
  },
  {
    id: "payment",
    title: "Payment and refund",
    subtitle: "Payment status, refund ETA, invoice, or duplicate charge questions",
    quickActions: ["Refund status", "Payment pending", "Invoice request"],
  },
  {
    id: "service",
    title: "Service quality",
    subtitle: "Raise concerns about quality, add-on execution, or incomplete work",
    quickActions: ["Work incomplete", "Need revisit", "Wrong add-on charged"],
  },
];
