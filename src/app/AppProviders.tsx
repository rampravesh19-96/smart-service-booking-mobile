import { PropsWithChildren, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ToastProvider } from "@/components/feedback/ToastProvider";
import { queryClient } from "@/config/queryClient";
import { useBookingDraftStore } from "@/store/bookingDraftStore";

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    useBookingDraftStore.persist.rehydrate();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
