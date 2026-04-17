import { z } from "zod";

export const profileSchema = z.object({
  userName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  preferredCity: z.string().min(2, "Enter your city"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
