// src/features/courses/pages/EditCoursePage.tsx
import {
  Box,
  Spinner,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses, useCourse } from "../hooks/useCourses";
import { CourseForm } from "../components/CourseForm";
import { CourseFormData } from "../validations/courses.validations";
import { PageContainer } from "../components/PageContainer";

const EditCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: course, isLoading: isLoadingCourse, error } = useCourse(id!);
  const { teachers, isLoadingTeachers, updateCourse, isUpdating } = useCourses();

  const handleSubmit = (data: CourseFormData) => {
    if (!id) return;

    updateCourse(
      { id, input: data },
      {
        onSuccess: () => {
          navigate("/admin/courses");
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin/courses");
  };

  if (isLoadingCourse || isLoadingTeachers) {
    return (
      <PageContainer
        breadcrumbs={[{ label: "Cursos", path: "/admin/courses" }, { label: "Editar" }]}
      >
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Flex>
      </PageContainer>
    );
  }

  if (error || !course) {
    return (
      <PageContainer
        breadcrumbs={[{ label: "Cursos", path: "/admin/courses" }, { label: "Editar" }]}
      >
        <Alert
          status="error"
          borderRadius="lg"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minH="200px"
          bg="red.50"
          border="1px"
          borderColor="red.200"
        >
          <AlertIcon boxSize="40px" mr={0} mb={4} color="red.500" />
          <AlertDescription maxW="md" fontSize="md" color="gray.700">
            <Text fontWeight="semibold" mb={2}>
              {error ? "Error al cargar el curso" : "Curso no encontrado"}
            </Text>
            <Text>
              {error
                ? "No se pudo cargar la información del curso. Por favor, intenta nuevamente."
                : "El curso que buscas no existe o ha sido eliminado."}
            </Text>
          </AlertDescription>
        </Alert>
      </PageContainer>
    );
  }

  if (!teachers || teachers.length === 0) {
    return (
      <PageContainer
        title={`Editar: ${course.name}`}
        breadcrumbs={[{ label: "Cursos", path: "/admin/courses" }, { label: "Editar" }]}
      >
        <Alert
          status="warning"
          borderRadius="lg"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minH="200px"
          bg="orange.50"
          border="1px"
          borderColor="orange.200"
        >
          <AlertIcon boxSize="40px" mr={0} mb={4} color="orange.500" />
          <AlertDescription maxW="md" fontSize="md" color="gray.700">
            <Text fontWeight="semibold" mb={2}>
              No hay docentes disponibles
            </Text>
            <Text>No hay docentes activos disponibles para asignar al curso.</Text>
          </AlertDescription>
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer breadcrumbs={[{ label: "Cursos", path: "/admin/courses" }, { label: "Editar" }]}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="md" maxW="900px" mx="auto">
        <Flex align="center" gap={3} mb={6}>
          <Heading size="lg" color={"gray.800"}>
            Editar: {course.name}
          </Heading>
          <Badge
            colorScheme={course.isActive ? "green" : "gray"}
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="full"
          >
            {course.isActive ? "Activo" : "Inactivo"}
          </Badge>
        </Flex>
        <Flex mb={6} p={4} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="blue.800" mb={1}>
              Información del curso
            </Text>
            <Text fontSize="sm" color="gray.600">
              Materia: <strong>{course.subject}</strong> | Docente:{" "}
              <strong>
                {course.teacher.firstName} {course.teacher.lastName}
              </strong>
            </Text>
          </Box>
        </Flex>

        <CourseForm
          course={course}
          teachers={teachers}
          isSubmitting={isUpdating}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Box>
    </PageContainer>
  );
};

export default EditCoursePage;
