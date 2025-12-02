import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentsService } from "../services/api";
import { useToast } from "@chakra-ui/react";
import type { CreateEnrollmentDTO } from "../types/types";

export const useEnrollments = (courseId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query para obtener matrículas de un curso
  const enrollmentsQuery = useQuery({
    queryKey: ["enrollments", courseId],
    queryFn: () => enrollmentsService.getEnrollmentsByCourse(courseId),
    enabled: !!courseId,
  });

  // Query para obtener estudiantes disponibles
  const availableStudentsQuery = useQuery({
    queryKey: ["available-students", courseId],
    queryFn: () => enrollmentsService.getAvailableStudents(courseId),
    enabled: !!courseId,
  });

  // Mutation para crear matrícula
  const createEnrollmentMutation = useMutation({
    mutationFn: (data: CreateEnrollmentDTO) => enrollmentsService.createEnrollment(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["enrollments", courseId] });
      queryClient.invalidateQueries({ queryKey: ["available-students", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Actualizar contadores
      toast({
        title: "Estudiante matriculado",
        description: response.message || "El estudiante ha sido matriculado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al matricular",
        description: error.response?.data?.message || "No se pudo matricular al estudiante",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Mutation para cancelar matrícula
  const cancelEnrollmentMutation = useMutation({
    mutationFn: (enrollmentId: string) => enrollmentsService.cancelEnrollment(enrollmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments", courseId] });
      queryClient.invalidateQueries({ queryKey: ["available-students", courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast({
        title: "Matrícula cancelada",
        description: "La matrícula ha sido cancelada exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al cancelar",
        description: error.response?.data?.message || "No se pudo cancelar la matrícula",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    // Queries
    enrollments: enrollmentsQuery.data,
    isLoadingEnrollments: enrollmentsQuery.isLoading,
    enrollmentsError: enrollmentsQuery.error,

    availableStudents: availableStudentsQuery.data,
    isLoadingStudents: availableStudentsQuery.isLoading,

    // Mutations
    createEnrollment: createEnrollmentMutation.mutate,
    isCreating: createEnrollmentMutation.isPending,

    cancelEnrollment: cancelEnrollmentMutation.mutate,
    isCancelling: cancelEnrollmentMutation.isPending,
  };
};
