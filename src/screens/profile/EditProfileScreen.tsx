import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useToast } from "@/components/feedback/ToastProvider";
import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  ProfileFormValues,
  profileSchema,
} from "@/features/profile/schemas/profileSchema";
import { useAuthStore } from "@/store/authStore";
import { ProfileStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<ProfileStackParamList, "EditProfile">;

export function EditProfileScreen({ navigation }: Props) {
  const session = useAuthStore((state) => state.session);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
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
    try {
      await updateProfile(values);
      showToast({
        tone: "success",
        title: "Profile updated",
        message: "Your account details were saved successfully.",
      });
      navigation.goBack();
    } catch {
      showToast({
        tone: "error",
        title: "Could not save profile",
        message: "Please try again in a moment.",
      });
    }
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Edit profile"
          subtitle="Keep account details clean and believable for a real consumer app."
        />
      }
      keyboardAware
      footer={
        <BottomActionBar>
          <Button
            disabled={!isValid}
            label="Save Changes"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </BottomActionBar>
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
    </AppScreen>
  );
}

const styles = StyleSheet.create({});
