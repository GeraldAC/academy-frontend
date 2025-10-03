import { z } from "zod";

export const registerFormSchema = z.object({
  firstName: z.string().min(2, "Nombre muy corto"),
  lastName: z.string().min(2, "Apellido muy corto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
  phone: z.string().optional().nullable(),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginFormData = z.infer<typeof loginFormSchema>;
