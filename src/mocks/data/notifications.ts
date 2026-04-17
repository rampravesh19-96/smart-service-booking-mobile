import { NotificationItem } from "@/types/domain";

export const mockNotifications: NotificationItem[] = [
  {
    id: "ntf-1",
    title: "Partner assigned",
    message: "Spark & Shine Crew will arrive for your deep cleaning appointment on Sunday at 10:00 AM.",
    timeLabel: "10 min ago",
    type: "booking",
    unread: true,
  },
  {
    id: "ntf-2",
    title: "Slot reminder",
    message: "Your AC service slot starts in 2 hours. Keep the outdoor unit accessible if possible.",
    timeLabel: "Today",
    type: "booking",
    unread: true,
  },
  {
    id: "ntf-3",
    title: "Support update",
    message: "Your cancellation request refund note has been updated and is ready to review.",
    timeLabel: "Yesterday",
    type: "support",
    unread: false,
  },
  {
    id: "ntf-4",
    title: "Weekend offer unlocked",
    message: "Use FRESH15 on cleaning services above ₹1999 this weekend.",
    timeLabel: "2 days ago",
    type: "offer",
    unread: false,
  },
];
