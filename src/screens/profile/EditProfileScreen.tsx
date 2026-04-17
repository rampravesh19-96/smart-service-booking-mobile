import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  ProfileFormValues,
  profileSchema,
} from "@/features/profile/schemas/profileSchema";
import { useAuthStore } from "@/store/authStore";
import { colors, typography } from "@/theme";
import { ProfileStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<ProfileStackParamList, "EditProfile">;

export function EditProfileScreen({ navigation }: Props) {
  const session = useAuthStore((state) => state.session);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      userName: session?.userName ?? "",
      email: session?.email ?? "",
      preferredCity: session?.preferredCity ?? "",
    },
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: ProfileFormValues) => {
    await updateProfile(values);
    navigation.goBack();
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Edit profile"
          subtitle="Keep account details clean and believable for a real consumer app."
        />
      }
    >
      <Card>
        <Controller
          control={control}
          name="userName"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.userName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="preferredCity"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Preferred city"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.preferredCity?.message}
            />
          )}
        />
      </Card>

      {isSubmitSuccessful ? (
        <Text style={styles.success}>Profile updated successfully.</Text>
      ) : null}

      <Button
        disabled={!isValid}
        label="Save Changes"
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  success: {
    color: colors.success500,
    fontSize: typography.bodySm,
    fontWeight: "700",
  },
});
