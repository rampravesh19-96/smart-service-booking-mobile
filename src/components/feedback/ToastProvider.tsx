import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

import { colors, radius, spacing, typography } from "@/theme";

type ToastTone = "success" | "error" | "info";

type ToastPayload = {
  title: string;
  message?: string;
  tone?: ToastTone;
};

type ToastContextValue = {
  showToast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneMap: Record<ToastTone, { border: string; bg: string; accent: string }> = {
  success: {
    border: colors.success500,
    bg: "rgba(23, 178, 106, 0.14)",
    accent: colors.success500,
  },
  error: {
    border: colors.danger500,
    bg: "rgba(240, 68, 56, 0.14)",
    accent: colors.danger500,
  },
  info: {
    border: colors.accent500,
    bg: "rgba(44, 140, 255, 0.14)",
    accent: colors.accent400,
  },
};

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<(ToastPayload & { id: number }) | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((payload: ToastPayload) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToast({
      id: Date.now(),
      tone: payload.tone ?? "info",
      ...payload,
    });

    timeoutRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);
  const tone = toneMap[toast?.tone ?? "info"];

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View pointerEvents="box-none" style={styles.overlay}>
        {toast ? (
          <Animated.View
            entering={FadeInDown.springify()}
            exiting={FadeOutDown.duration(180)}
            layout={LinearTransition}
            style={[
              styles.toast,
              { borderColor: tone.border, backgroundColor: tone.bg },
            ]}
          >
            <View style={[styles.accent, { backgroundColor: tone.accent }]} />
            <View style={styles.copy}>
              <Text style={styles.title}>{toast.title}</Text>
              {toast.message ? <Text style={styles.message}>{toast.message}</Text> : null}
            </View>
          </Animated.View>
        ) : null}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.xl,
  },
  toast: {
    minHeight: 72,
    borderWidth: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
  },
  accent: {
    width: 4,
    borderRadius: radius.pill,
    alignSelf: "stretch",
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "800",
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
});
