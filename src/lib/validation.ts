import z from "zod";

export const LoginData = z.object({
  email: z.email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long. " })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const RegisterData = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const ActivitiesData = z.object({
  category_id: z.string().min(1, "Kategori harus diisi"),
  value: z.number().min(1, "Tulis berapa lama anda"),
  note: z.string().min(1, "Catatan harus di isi"),
  occured_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
  })
});

export type LoginDataValues = z.infer<typeof LoginData>;
export type RegisterDataValues = z.infer<typeof RegisterData>;
export type ActivitiesDataValues = z.infer<typeof ActivitiesData>;