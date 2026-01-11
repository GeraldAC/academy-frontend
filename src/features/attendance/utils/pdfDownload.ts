// src/features/attendance/utils/pdfDownload.ts
import axios from "@/api/axios";

/**
 * Descarga PDF de asistencia de un estudiante
 */
export const downloadStudentAttendancePDF = async (
  studentId: string,
  filters?: {
    courseId?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  try {
    const params = new URLSearchParams();
    if (filters?.courseId) params.append("courseId", filters.courseId);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);

    const response = await axios.get(`/attendance/student/${studentId}/pdf?${params.toString()}`, {
      responseType: "blob", // Importante para archivos
    });

    // Crear URL del blob
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Crear link temporal y descargar
    const link = document.createElement("a");
    link.href = url;
    link.download = `reporte-asistencia-${studentId}-${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
    throw new Error(error.response?.data?.message || "No se pudo descargar el PDF");
  }
};

/**
 * Descarga PDF de reporte general
 */
export const downloadReportPDF = async (filters?: {
  courseId?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    const params = new URLSearchParams();
    if (filters?.courseId) params.append("courseId", filters.courseId);
    if (filters?.studentId) params.append("studentId", filters.studentId);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);

    const response = await axios.get(`/attendance/report/pdf?${params.toString()}`, {
      responseType: "blob",
    });

    // Crear URL del blob
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Crear link temporal y descargar
    const link = document.createElement("a");
    link.href = url;
    link.download = `reporte-general-${new Date().toISOString().split("T")[0]}.pdf`;
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return { success: true };
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
    throw new Error(error.response?.data?.message || "No se pudo descargar el PDF");
  }
};
