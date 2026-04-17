import { z } from "zod";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginFormDefaults: LoginFormValues = {
  phoneNumber: "",
};
