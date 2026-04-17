import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { storageKeys, zustandStorage } from "@/config/storage";
import { PaymentMethod } from "@/types/domain";

export type BookingDraft = {
  serviceId?: string;
  addressId?: string;
  slotId?: string;
  dateLabel?: string;
  slotLabel?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  selectedAddOnIds: string[];
};

type BookingDraftStore = {
  draft: BookingDraft;
  setService: (serviceId: string, addOnIds?: string[]) => void;
  toggleAddOn: (addOnId: string) => void;
  updateDraft: (payload: Partial<BookingDraft>) => void;
  resetDraft: () => void;
};

const initialDraft: BookingDraft = {
  selectedAddOnIds: [],
};

export const useBookingDraftStore = create<BookingDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setService: (serviceId, addOnIds = []) =>
        set((state) => ({
          draft: {
            ...state.draft,
            serviceId,
            selectedAddOnIds:
              state.draft.serviceId === serviceId ? state.draft.selectedAddOnIds : addOnIds,
          },
        })),
      toggleAddOn: (addOnId) =>
        set((state) => {
          const exists = state.draft.selectedAddOnIds.includes(addOnId);

          return {
            draft: {
              ...state.draft,
              selectedAddOnIds: exists
                ? state.draft.selectedAddOnIds.filter((id) => id !== addOnId)
                : [...state.draft.selectedAddOnIds, addOnId],
            },
          };
        }),
      updateDraft: (payload) =>
        set((state) => ({ draft: { ...state.draft, ...payload } })),
      resetDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: storageKeys.bookingDraft,
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
