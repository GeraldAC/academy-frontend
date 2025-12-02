import axios from "@/api/axios";
import type {
  CreateEnrollmentDTO,
  EnrollmentResponse,
  Enrollment,
  StudentOption,
} from "../types/types";

export const enrollmentsService = {
  // Crear matrícula
  async createEnrollment(data: CreateEnrollmentDTO): Promise<EnrollmentResponse> {
    const { data: response } = await axios.post<EnrollmentResponse>("/enrollments", data);
    return response;
  },

  // Obtener matrículas de un curso
  async getEnrollmentsByCourse(courseId: string): Promise<Enrollment[]> {
    const { data } = await axios.get<Enrollment[]>(`/enrollments/course/${courseId}`);
    return data;
  },

  // Obtener estudiantes disponibles (no inscritos en un curso específico)
  async getAvailableStudents(courseId: string): Promise<StudentOption[]> {
    const { data } = await axios.get<StudentOption[]>(`/enrollments/available/${courseId}`);
    return data;
  },

  // Cancelar matrícula (ahora usa DELETE en lugar de PATCH)
  async cancelEnrollment(enrollmentId: string): Promise<void> {
    await axios.delete(`/enrollments/${enrollmentId}`);
  },
};
