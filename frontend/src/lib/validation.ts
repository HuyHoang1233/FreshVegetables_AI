import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  confirmPassword: z.string()
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const projectSchema = z.object({
  name: z.string().trim().min(2, "Project name must be at least 2 characters").max(150),
  description: z.string().trim().max(1000).optional(),
  status: z.enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED"])
});

export const userSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
  roles: z.array(z.enum(["ADMIN", "USER"])).min(1, "Select at least one role")
});

export const userCreateSchema = userSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters")
});
