import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z.string().min(0, "please enter a valid password"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Please enter a valid name"),
  phone_number: z.string().min(11, "Phone number must be 11 digits"),
  email: z.string().email("Please enter a valid email"),
  password1: z.string().min(6, "Password must be at least 6 characters"),
  password2: z.string().min(6, "Password must be at least 6 characters"),
});
