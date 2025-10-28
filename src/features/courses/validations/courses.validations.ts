import { z } from "zod";

export const courseFormSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z.string().optional(),
  subject: z
    .string()
    .min(2, "La materia debe tener al menos 2 caracteres")
    .max(50, "La materia no puede exceder 50 caracteres"),
  teacherId: z.string().uuid("Debe seleccionar un docente válido"),
  capacity: z
    .number()
    .int("La capacidad debe ser un número entero")
    .min(5, "La capacidad mínima es 5 estudiantes")
    .max(40, "La capacidad máxima es 40 estudiantes"),
  monthlyPrice: z
    .number()
    .positive("El precio debe ser mayor a 0")
    .max(9999.99, "El precio no puede exceder 9999.99"),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;
