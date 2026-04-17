import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandStorage } from "@/config/storage";

type UserPreferences = {
  pushNotifications: boolean;
  promoAlerts: boolean;
  smartReminders: boolean;
  biometricLock: boolean;
};

type UserPreferencesStore = {
  preferences: UserPreferences;
  togglePreference: (key: keyof UserPreferences) => void;
};

const initialPreferences: UserPreferences = {
  pushNotifications: true,
  promoAlerts: true,
  smartReminders: true,
  biometricLock: false,
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
    (set) => ({
      preferences: initialPreferences,
      togglePreference: (key) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: !state.preferences[key],
          },
        })),
    }),
    {
      name: "ssb.user.preferences",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ preferences: state.preferences }),
    },
  ),
);
