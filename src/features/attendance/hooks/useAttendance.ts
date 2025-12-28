// src/features/attendance/hooks/useAttendance.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceService } from "../services/api";
import { enrollmentsService } from "@/features/enrollments/services/api";
import { useToast } from "@chakra-ui/react";
import type { RegisterAttendanceDto, AttendanceReportQuery } from "../types/types";

export const useAttendance = (courseId?: string, classDate?: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query: Obtener estudiantes desde matriculas (para el roster)
  const studentsQuery = useQuery({
    queryKey: ["enrollment-students", courseId],
    queryFn: async () => {
      const enrollments = await enrollmentsService.getEnrollmentsByCourse(courseId!);
      // Mapear enrollment a estructura de estudiante compatible
      return enrollments.map((e) => ({
        id: e.studentId, // ID del estudiante
        firstName: e.student.firstName,
        lastName: e.student.lastName,
        email: e.student.email,
        dni: e.student.dni,
        present: false, // Default state
      }));
    },
    enabled: !!courseId,
  });

  // Query: Obtener asistencia por curso
  const courseAttendanceQuery = useQuery({
    queryKey: ["course-attendance", courseId, classDate],
    queryFn: () => attendanceService.getCourseAttendance(courseId!, classDate),
    enabled: !!courseId,
  });

  // Mutation: Registrar asistencia
  const registerMutation = useMutation({
    mutationFn: (data: RegisterAttendanceDto) => attendanceService.registerAttendance(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["attendance-students"] });
      queryClient.invalidateQueries({ queryKey: ["course-attendance"] });
      toast({
        title: "Asistencia registrada",
        description: response.message || `${response.count} registros guardados exitosamente`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.error("Error registering attendance:", error);
      const errorMsg =
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        "No se pudo registrar la asistencia";
      toast({
        title: "Error al registrar asistencia",
        description: errorMsg,
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    },
  });

  // Mutation: Actualizar asistencia
  const updateMutation = useMutation({
    mutationFn: ({ id, present, notes }: { id: string; present: boolean; notes?: string }) =>
      attendanceService.updateAttendance(id, present, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance-students"] });
      queryClient.invalidateQueries({ queryKey: ["course-attendance"] });
      toast({
        title: "Asistencia actualizada",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al actualizar",
        description: error.response?.data?.message || "No se pudo actualizar la asistencia",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    // Queries
    students: studentsQuery.data,
    isLoadingStudents: studentsQuery.isLoading,
    courseAttendance: courseAttendanceQuery.data,
    isLoadingCourseAttendance: courseAttendanceQuery.isLoading,

    // Mutations
    registerAttendance: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    updateAttendance: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

// Hook para estudiantes
export const useStudentAttendance = (studentId: string, courseId?: string) => {
  const queryClient = useQueryClient();

  // Query: Historial de asistencia
  const historyQuery = useQuery({
    queryKey: ["student-attendance-history", studentId, courseId],
    queryFn: () => attendanceService.getStudentHistory(studentId, courseId),
    enabled: !!studentId,
  });

  // Query: Estadísticas
  const statsQuery = useQuery({
    queryKey: ["student-attendance-stats", studentId, courseId],
    queryFn: () => attendanceService.getStudentStats(studentId, courseId),
    enabled: !!studentId,
  });

  return {
    history: historyQuery.data,
    isLoadingHistory: historyQuery.isLoading,
    stats: statsQuery.data,
    isLoadingStats: statsQuery.isLoading,
    refetch: () => {
      queryClient.invalidateQueries({ queryKey: ["student-attendance-history"] });
      queryClient.invalidateQueries({ queryKey: ["student-attendance-stats"] });
    },
  };
};

// Hook para reportes
export const useAttendanceReport = (query: AttendanceReportQuery) => {
  const reportQuery = useQuery({
    queryKey: ["attendance-report", query],
    queryFn: () => attendanceService.getAttendanceReport(query),
    enabled: !!(query.studentId || query.courseId),
  });

  return {
    report: reportQuery.data,
    isLoadingReport: reportQuery.isLoading,
    refetch: reportQuery.refetch,
  };
};
