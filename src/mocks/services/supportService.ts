import { mockSupportCategories } from "@/mocks/data/support";
import { simulateFailure } from "@/mocks/utils/network";

export async function fetchSupportCategories() {
  return simulateFailure(async () => [...mockSupportCategories]);
}

export async function submitSupportRequest(payload: {
  categoryId: string;
  issueTitle: string;
}) {
  return simulateFailure(async () => ({
    ticketId: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
    ...payload,
  }));
}
