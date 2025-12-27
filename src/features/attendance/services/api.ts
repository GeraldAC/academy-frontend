// src/features/attendance/services/api.ts
import axios from "@/api/axios";
import type {
  RegisterAttendanceDto,
  Attendance,
  AttendanceStats,
  StudentAttendanceRecord,
  AttendanceReportData,
  AttendanceReportQuery,
} from "../types/types";

export const attendanceService = {
  // RF-014: Registrar asistencia (Docente)
  async registerAttendance(
    data: RegisterAttendanceDto
  ): Promise<{ message: string; count: number; data: Attendance[] }> {
    const { data: response } = await axios.post("/attendance/bulk", data);
    return response;
  },

  // Obtener estudiantes para registrar asistencia
  async getStudentsForAttendance(
    courseId: string,
    classDate: string
  ): Promise<StudentAttendanceRecord[]> {
    const { data } = await axios.get(`/attendance/course/${courseId}/students`, {
      params: { classDate },
    });
    return data;
  },

  // Obtener asistencia por curso y fecha
  async getCourseAttendance(courseId: string, classDate?: string): Promise<Attendance[]> {
    const { data } = await axios.get(`/attendance/course/${courseId}`, {
      params: classDate ? { classDate } : undefined,
    });
    return data;
  },

  // RF-015: Obtener historial de asistencia del estudiante
  async getStudentHistory(studentId: string, courseId?: string): Promise<Attendance[]> {
    const { data } = await axios.get(`/attendance/student/${studentId}`, {
      params: courseId ? { courseId } : undefined,
    });
    return data;
  },

  // RF-015: Obtener estadísticas de asistencia del estudiante
  async getStudentStats(studentId: string, courseId?: string): Promise<AttendanceStats> {
    const { data } = await axios.get(`/attendance/student/${studentId}/stats`, {
      params: courseId ? { courseId } : undefined,
    });
    return data;
  },

  // RF-016: Obtener datos para reporte
  async getAttendanceReport(query: AttendanceReportQuery): Promise<AttendanceReportData> {
    const { data } = await axios.get("/attendance/report", { params: query });
    return data;
  },

  // Actualizar asistencia
  async updateAttendance(id: string, present: boolean, notes?: string): Promise<Attendance> {
    const { data } = await axios.patch(`/attendance/${id}`, { present, notes });
    return data.data;
  },

  // Eliminar asistencia
  async deleteAttendance(id: string): Promise<void> {
    await axios.delete(`/attendance/${id}`);
  },
};
