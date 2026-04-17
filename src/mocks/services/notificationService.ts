import { mockNotifications } from "@/mocks/data/notifications";
import { simulateFailure } from "@/mocks/utils/network";

export async function fetchNotifications() {
  return simulateFailure(async () => [...mockNotifications]);
}
