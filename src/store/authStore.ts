import { create } from "zustand";

import { secureStorage, storageKeys } from "@/config/storage";
import { AuthSession } from "@/types/domain";

type AuthStore = {
  session: AuthSession | null;
  isHydrated: boolean;
  hydrate: () => Promise<void>;
  signIn: (phoneNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (payload: Partial<Omit<AuthSession, "token" | "phoneNumber">>) => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  isHydrated: false,
  hydrate: async () => {
    const rawSession = await secureStorage.getItem(storageKeys.authSession);

    if (rawSession) {
      set({ session: JSON.parse(rawSession) as AuthSession, isHydrated: true });
      return;
    }

    set({ isHydrated: true });
  },
  signIn: async (phoneNumber) => {
    const session = {
      userName: "Rahul Mehra",
      phoneNumber,
      token: "demo-session-token",
      email: "rahul.mehra@example.com",
      preferredCity: "Bengaluru",
      memberSince: "Jan 2024",
      totalBookings: 18,
    };
    await secureStorage.setItem(storageKeys.authSession, JSON.stringify(session));
    set({ session });
  },
  signOut: async () => {
    await secureStorage.deleteItem(storageKeys.authSession);
    set({ session: null });
  },
  updateProfile: async (payload) => {
    let nextSession: AuthSession | null = null;

    set((state) => {
      if (!state.session) {
        return state;
      }

      nextSession = {
        ...state.session,
        ...payload,
      };

      return { session: nextSession };
    });

    if (nextSession) {
      await secureStorage.setItem(storageKeys.authSession, JSON.stringify(nextSession));
    }
  },
}));
