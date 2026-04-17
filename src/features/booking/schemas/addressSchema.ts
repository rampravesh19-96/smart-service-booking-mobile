import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(2, "Label is required"),
  line1: z.string().min(5, "Address line is required"),
  city: z.string().min(2, "City is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pin code"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export const addressFormDefaults: AddressFormValues = {
  label: "",
  line1: "",
  city: "",
  pinCode: "",
};
