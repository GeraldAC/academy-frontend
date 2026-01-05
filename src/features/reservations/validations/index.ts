// src/features/reservations/validations/index.ts
import { z } from "zod";

export const createReservationSchema = z.object({
  courseId: z.string().uuid("Curso inválido"),
  classDate: z.string().refine(
    (date) => {
      const selected = new Date(date);
      const tomorrow = new Date();
      tomorrow.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return selected >= tomorrow;
    },
    { message: "Solo puedes reservar clases para fechas futuras" }
  ),
  notes: z.string().optional(),
});

export type CreateReservationFormData = z.infer<typeof createReservationSchema>;

export const createPaymentSchema = z.object({
  studentId: z.string().uuid("Estudiante inválido"),
  amount: z.number().positive("El monto debe ser mayor a 0"),
  concept: z.string().min(3, "El concepto debe tener al menos 3 caracteres"),
  dueDate: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["PENDING", "PAID", "OVERDUE"]).optional(),
});

export type CreatePaymentFormData = z.infer<typeof createPaymentSchema>;
