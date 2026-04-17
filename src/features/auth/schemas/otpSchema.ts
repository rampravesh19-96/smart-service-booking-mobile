import { z } from "zod";

export const otpSchema = z.object({
  otp: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit OTP"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export const otpFormDefaults: OtpFormValues = {
  otp: "",
};
