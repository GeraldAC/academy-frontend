import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesService } from "../services/courses.service";
import { CreateCourseInput, UpdateCourseInput, CourseFilters } from "../types/courses.types";
import { useToast } from "@chakra-ui/react";

export const useCourses = (filters?: CourseFilters) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  // Query para obtener todos los cursos
  const coursesQuery = useQuery({
    queryKey: ["courses", filters],
    queryFn: () => coursesService.getCourses(filters),
    // Mantener datos previos mientras se revalida
    placeholderData: (previousData) => previousData,
  });

  // Query para obtener docentes activos
  const teachersQuery = useQuery({
    queryKey: ["teachers", "active"],
    queryFn: () => coursesService.getAvailableUsers("TEACHER", true),
  });

  const subjectsQuery = useQuery({
    queryKey: ["subjects", "available"],
    queryFn: () => coursesService.getAvailableSubjects(),
  });

  // Mutation para crear curso
  const createCourseMutation = useMutation({
    mutationFn: (input: CreateCourseInput) => coursesService.createCourse(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast({
        title: "Curso creado",
        description: "El curso se ha creado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al crear curso",
        description: error.response?.data?.message || "Ocurrió un error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Mutation para actualizar curso
  const updateCourseMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCourseInput }) =>
      coursesService.updateCourse(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      const message =
        variables.input.isActive === false
          ? "El curso se ha desactivado exitosamente"
          : variables.input.isActive === true
            ? "El curso se ha activado exitosamente"
            : "El curso se ha actualizado exitosamente";

      toast({
        title:
          variables.input.isActive === false
            ? "Curso desactivado"
            : variables.input.isActive === true
              ? "Curso activado"
              : "Curso actualizado",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al actualizar curso",
        description: error.response?.data?.message || "Ocurrió un error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Mutation para desactivar curso
  const deactivateCourseMutation = useMutation({
    mutationFn: (id: string) => coursesService.deactivateCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast({
        title: "Curso desactivado",
        description: "El curso se ha desactivado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al desactivar curso",
        description: error.response?.data?.message || "Ocurrió un error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    // Queries
    courses: coursesQuery.data,
    isLoadingCourses: coursesQuery.isLoading,
    coursesError: coursesQuery.error,
    coursesQuery,
    teachers: teachersQuery.data,
    isLoadingTeachers: teachersQuery.isLoading,
    subjects: subjectsQuery.data,
    isLoadingSubjects: subjectsQuery.isLoading,
    subjectsError: subjectsQuery.error,

    // Mutations
    createCourse: createCourseMutation.mutate,
    isCreating: createCourseMutation.isPending,
    updateCourse: updateCourseMutation.mutate,
    isUpdating: updateCourseMutation.isPending,
    deactivateCourse: deactivateCourseMutation.mutate,
    isDeactivating: deactivateCourseMutation.isPending,
  };
};
export const useStudentCourses = () => {
  return useQuery({
    queryKey: ["student-courses"],
    queryFn: () => coursesService.getStudentCourses(),
  });
};
export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => coursesService.getCourseById(id),
    enabled: !!id,
  });
};
