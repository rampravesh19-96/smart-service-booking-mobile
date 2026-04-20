import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppScreen } from "@/components/layout/AppScreen";
import { BottomActionBar } from "@/components/layout/BottomActionBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import {
  addressFormDefaults,
  addressSchema,
  AddressFormValues,
} from "@/features/booking/schemas/addressSchema";
import { useCreateAddress } from "@/hooks/useBookings";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import { BookingStackParamList } from "@/types/navigation";

type Props = NativeStackScreenProps<BookingStackParamList, "AddAddress">;

export function AddAddressScreen({ navigation }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AddressFormValues>({
    defaultValues: addressFormDefaults,
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });
  const createAddressMutation = useCreateAddress();
  const updateDraft = useBookingDraftStore((state) => state.updateDraft);

  const onSubmit = async (values: AddressFormValues) => {
    const address = await createAddressMutation.mutateAsync(values);
    updateDraft({ addressId: address.id });
    navigation.goBack();
  };

  return (
    <AppScreen
      header={
        <ScreenHeader
          title="Add Address"
          subtitle="Validated address capture for the booking flow."
        />
      }
      keyboardAware
      footer={
        <BottomActionBar>
          <Button
            disabled={!isValid}
            label="Save Address"
            loading={isSubmitting || createAddressMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          />
        </BottomActionBar>
      }
    >
      <Card>
        <Controller
          control={control}
          name="label"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Label"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Home / Office"
              value={value}
              error={errors.label?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="line1"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="Address line"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="House / flat / street"
              value={value}
              error={errors.line1?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              label="City"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Bengaluru"
              value={value}
              error={errors.city?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="pinCode"
          render={({ field: { onBlur, onChange, value } }) => (
            <Input
              keyboardType="number-pad"
              label="PIN code"
              maxLength={6}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="560038"
              value={value}
              error={errors.pinCode?.message}
            />
          )}
        />
      </Card>
    </AppScreen>
  );
}
