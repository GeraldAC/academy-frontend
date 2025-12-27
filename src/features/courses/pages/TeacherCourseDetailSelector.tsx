import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useMyCourses } from "../hooks/useMyCourses";

export default function TeacherCourseDetailSelector() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useMyCourses();

  const courses = data?.courses || [];
  const totalCourses = data?.total || 0;

  // Si tiene exactamente 1 curso, redirigir automáticamente
  useEffect(() => {
    if (!isLoading && totalCourses === 1 && courses[0]) {
      navigate(`/teacher/courses/${courses[0].id}`, { replace: true });
    }
  }, [isLoading, totalCourses, courses, navigate]);

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Cargando tus cursos...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Error al cargar los cursos: {(error as Error).message}
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  // Si no tiene cursos
  if (totalCourses === 0) {
    return (
      <Box p={8} maxW="600px" mx="auto" textAlign="center">
        <Alert status="info">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">No tienes cursos asignados</Text>
            <Text fontSize="sm" mt={2}>
              Contacta con el administrador para que te asigne cursos.
            </Text>
          </Box>
        </Alert>
      </Box>
    );
  }

  // Si tiene múltiples cursos, mostrar selector
  return (
    <Box p={8} maxW="1200px" mx="auto">
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg" mb={2}>
            Selecciona un Curso
          </Heading>
          <Text color="gray.600">
            Tienes {totalCourses} {totalCourses === 1 ? "curso asignado" : "cursos asignados"}.
            Selecciona uno para ver sus detalles.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courses.map((course) => (
            <Card
              key={course.id}
              variant="outline"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              cursor="pointer"
              onClick={() => navigate(`/teacher/courses/${course.id}`)}
            >
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <Box>
                    <Heading size="md" mb={2}>
                      {course.name}
                    </Heading>
                    <Badge colorScheme="purple" mb={2}>
                      {course.subject}
                    </Badge>
                  </Box>

                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    {course.description || "Sin descripción"}
                  </Text>

                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      Estudiantes: {course._count?.enrollments || 0}/{course.capacity}
                    </Text>
                  </Box>

                  <Button colorScheme="blue" size="sm" width="full">
                    Ver Detalles
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
