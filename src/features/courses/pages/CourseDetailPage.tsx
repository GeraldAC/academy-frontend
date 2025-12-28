import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VStack,
  HStack,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { enrollmentsService } from "@/features/enrollments/services/api";
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";
import { useCourse } from "../hooks/useCourses";

const weekDayLabels: Record<string, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
};

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourse(id || "");

  const { data: enrollments, isLoading: isLoadingEnrollments } = useQuery({
    queryKey: ["enrollments", id],
    queryFn: () => enrollmentsService.getEnrollmentsByCourse(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Cargando detalles del curso...</Text>
      </Box>
    );
  }

  if (error || !course) {
    return (
      <Box p={8}>
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Error al cargar el curso: {(error as Error)?.message || "Curso no encontrado"}
          </AlertDescription>
        </Alert>
        <Button mt={4} leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Box>
    );
  }

  const enrolledCount = course._count?.enrollments || 0;
  const availableSpots = course.capacity - enrolledCount;

  return (
    <Box p={8} maxW="1200px" mx="auto">
      {/* Header */}
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate("/teacher/courses")}
        mb={6}
        variant="ghost"
      >
        Volver a mis cursos
      </Button>

      <HStack justify="space-between" mb={6}>
        <Heading size="xl">{course.name}</Heading>
        <Badge colorScheme={course.isActive ? "green" : "gray"} fontSize="md" p={2}>
          {course.isActive ? "Activo" : "Inactivo"}
        </Badge>
      </HStack>

      {/* Información principal */}
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6} mb={6}>
        {/* Descripción y detalles */}
        <GridItem>
          <Card>
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Descripción
                  </Text>
                  <Text>{course.description || "Sin descripción disponible"}</Text>
                </Box>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Materia
                  </Text>
                  <Badge colorScheme="blue" fontSize="md">
                    {course.subject}
                  </Badge>
                </Box>

                <Divider />

                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Precio Mensual
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                    S/ {Number(course.monthlyPrice).toFixed(2)}
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Estadísticas */}
        <GridItem>
          <VStack spacing={4}>
            <Card w="full">
              <CardBody>
                <Stat>
                  <StatLabel>Estudiantes Inscritos</StatLabel>
                  <StatNumber>{enrolledCount}</StatNumber>
                  <StatHelpText>de {course.capacity} capacidad</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card w="full">
              <CardBody>
                <Stat>
                  <StatLabel>Cupos Disponibles</StatLabel>
                  <StatNumber color={availableSpots > 0 ? "green.500" : "red.500"}>
                    {availableSpots}
                  </StatNumber>
                  <StatHelpText>
                    {availableSpots === 0 ? "Curso lleno" : "Cupos libres"}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>

      {/* Horarios */}
      {course.schedules && course.schedules.length > 0 && (
        <Card>
          <CardBody>
            <HStack mb={4}>
              <CalendarIcon color="gray.500" />
              <Heading size="md">Horarios de Clase</Heading>
            </HStack>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={4}
            >
              {course.schedules.map((schedule) => (
                <Card key={schedule.id} variant="outline" bg="gray.50">
                  <CardBody>
                    <VStack align="start" spacing={2}>
                      <Badge colorScheme="purple">{weekDayLabels[schedule.weekDay]}</Badge>
                      <Text fontWeight="semibold">
                        {schedule.startTime.slice(0, 5)} - {schedule.endTime.slice(0, 5)}
                      </Text>
                      <Badge
                        colorScheme={schedule.classType === "REGULAR" ? "blue" : "orange"}
                        size="sm"
                      >
                        {schedule.classType === "REGULAR" ? "Regular" : "Reforzamiento"}
                      </Badge>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </CardBody>
        </Card>
      )}

      {/* Sección de estudiantes */}
      <Card mt={6}>
        <CardBody>
          <HStack justify="space-between" mb={4}>
            <VStack align="start" spacing={1}>
              <Heading size="md">Estudiantes Inscritos</Heading>
              <Text color="gray.600" fontSize="sm">
                Lista de estudiantes matriculados en este curso
              </Text>
            </VStack>
            <Badge colorScheme="blue" fontSize="md">
              {enrollments?.length || 0} Estudiantes
            </Badge>
          </HStack>

          {isLoadingEnrollments ? (
            <Box textAlign="center" py={4}>
              <Spinner />
              <Text mt={2}>Cargando estudiantes...</Text>
            </Box>
          ) : enrollments && enrollments.length > 0 ? (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Estudiante</Th>
                    <Th>Email</Th>
                    <Th>DNI</Th>
                    <Th>Estado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {enrollments.map((enrollment) => (
                    <Tr key={enrollment.id}>
                      <Td>
                        <HStack>
                          <Avatar
                            size="sm"
                            name={`${enrollment.student.firstName} ${enrollment.student.lastName}`}
                          />
                          <Text fontWeight="medium">
                            {enrollment.student.firstName} {enrollment.student.lastName}
                          </Text>
                        </HStack>
                      </Td>
                      <Td>{enrollment.student.email}</Td>
                      <Td>{enrollment.student.dni}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            enrollment.status === "ACTIVE"
                              ? "green"
                              : enrollment.status === "COMPLETED"
                                ? "blue"
                                : "red"
                          }
                        >
                          {enrollment.status === "ACTIVE"
                            ? "Activo"
                            : enrollment.status === "COMPLETED"
                              ? "Completado"
                              : "Cancelado"}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Alert status="info" mt={2}>
              <AlertIcon />
              No hay estudiantes inscritos en este curso aún.
            </Alert>
          )}
        </CardBody>
      </Card>
    </Box>
  );
}
