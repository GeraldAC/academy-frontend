import { z } from "zod";

export const enrollmentSchema = z.object({
  studentId: z.string().min(1, "Debes seleccionar un estudiante"),
  courseId: z.string().min(1, "Debes seleccionar un curso"),
  notes: z.string().optional(),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;
