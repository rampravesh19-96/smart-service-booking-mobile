import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  otpFormDefaults,
  otpSchema,
  OtpFormValues,
} from "@/features/auth/schemas/otpSchema";
import { useAuthStore } from "@/store/authStore";
import { colors, spacing, typography } from "@/theme";
import { AuthStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "OtpVerify">;

export function OtpVerifyScreen({ route }: Props) {
  const signIn = useAuthStore((state) => state.signIn);
  const [secondsLeft, setSecondsLeft] = useState(25);
  const phoneNumber = route.params?.phoneNumber ?? "+91 9876543210";
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OtpFormValues>({
    defaultValues: otpFormDefaults,
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const onSubmit = async () => {
    await signIn(phoneNumber);
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Verify OTP"
          subtitle={`We sent a code to ${phoneNumber}. Use 123456 for this frontend demo flow.`}
        />
      }
      scrollable={false}
    >
      <View style={styles.content}>
        <Card>
          <Text style={styles.title}>Enter the 6-digit code</Text>
          <Controller
            control={control}
            name="otp"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                keyboardType="number-pad"
                label="One-time password"
                maxLength={6}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="123456"
                value={value}
                error={errors.otp?.message}
              />
            )}
          />
          <Text style={styles.helper}>
            {secondsLeft > 0
              ? `Resend available in ${secondsLeft}s`
              : "You can resend the OTP now."}
          </Text>
        </Card>
      </View>

      <Button
        disabled={!isValid}
        label="Verify and Continue"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2,
    fontWeight: "800",
  },
  helper: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    fontWeight: "600",
  },
});
