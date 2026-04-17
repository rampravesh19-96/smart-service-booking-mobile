import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  loginFormDefaults,
  loginSchema,
  LoginFormValues,
} from "@/features/auth/schemas/loginSchema";
import { colors, spacing, typography } from "@/theme";
import { AuthStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: loginFormDefaults,
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    navigation.navigate("OtpVerify", { phoneNumber: `+91 ${values.phoneNumber}` });
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Welcome back"
          subtitle="Simple, credible mobile auth with strong validation and session persistence."
        />
      }
      scrollable={false}
    >
      <View style={styles.content}>
        <Card>
          <Badge label="Frontend-first auth flow" />
          <Text style={styles.title}>Continue with your mobile number</Text>
          <Text style={styles.copy}>
            We’ll use OTP verification for a low-friction sign in experience.
          </Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                keyboardType="number-pad"
                label="Mobile number"
                maxLength={10}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="9876543210"
                value={value}
                error={errors.phoneNumber?.message}
              />
            )}
          />
        </Card>

        <Card>
          <Text style={styles.helperTitle}>Why this flow works for the portfolio</Text>
          <Text style={styles.helperCopy}>
            Validated entry, persistent session setup, and a clean auth shell that
            is easy to extend later with social login or backend verification.
          </Text>
        </Card>
      </View>

      <Button
        disabled={!isValid}
        label="Send OTP"
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
  copy: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  helperTitle: {
    color: colors.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
  },
  helperCopy: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    lineHeight: 20,
  },
});
