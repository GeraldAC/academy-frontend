import axios from "@/api/axios";
import type {
  CreateEnrollmentDTO,
  EnrollmentResponse,
  Enrollment,
  StudentOption,
  UpdateEnrollmentStatusDTO,
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

  // 🆕 NUEVO: Actualizar estado de matrícula
  async updateEnrollmentStatus(
    enrollmentId: string,
    status: UpdateEnrollmentStatusDTO
  ): Promise<EnrollmentResponse> {
    const { data } = await axios.patch<EnrollmentResponse>(
      `/enrollments/${enrollmentId}/status`,
      status
    );
    return data;
  },

  // Cancelar matrícula (método antiguo)
  async cancelEnrollment(enrollmentId: string): Promise<void> {
    await axios.delete(`/enrollments/${enrollmentId}`);
  },

  // Obtener mis matrículas (Estudiante)
  async getMyEnrollments(): Promise<Enrollment[]> {
    const { data } = await axios.get<Enrollment[]>("/enrollments/my-enrollments");
    return data;
  },
};
