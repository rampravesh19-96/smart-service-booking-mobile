import { SlotOption } from "@/types/domain";

export const mockSlotsByService: Record<string, SlotOption[]> = {
  "svc-1": [
    { id: "slot-1", dateLabel: "Sun, 21 Apr", displayDate: "Sunday, 21 April", slotLabel: "09:00 AM - 12:30 PM", availability: "limited" },
    { id: "slot-2", dateLabel: "Sun, 21 Apr", displayDate: "Sunday, 21 April", slotLabel: "10:30 AM - 02:00 PM", availability: "high" },
    { id: "slot-3", dateLabel: "Mon, 22 Apr", displayDate: "Monday, 22 April", slotLabel: "08:30 AM - 12:00 PM", availability: "high" },
  ],
  "svc-2": [
    { id: "slot-4", dateLabel: "Today", displayDate: "Today", slotLabel: "01:00 PM - 02:15 PM", availability: "limited" },
    { id: "slot-5", dateLabel: "Today", displayDate: "Today", slotLabel: "03:30 PM - 04:45 PM", availability: "high" },
  ],
  "svc-3": [
    { id: "slot-6", dateLabel: "Tomorrow", displayDate: "Tomorrow", slotLabel: "05:00 PM - 06:30 PM", availability: "high" },
    { id: "slot-7", dateLabel: "Tomorrow", displayDate: "Tomorrow", slotLabel: "07:00 PM - 08:30 PM", availability: "limited" },
  ],
  "svc-4": [
    { id: "slot-8", dateLabel: "Today", displayDate: "Today", slotLabel: "12:00 PM - 12:50 PM", availability: "high" },
    { id: "slot-9", dateLabel: "Today", displayDate: "Today", slotLabel: "04:00 PM - 04:50 PM", availability: "high" },
  ],
};
