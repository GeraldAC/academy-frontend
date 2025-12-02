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
  useDisclosure,
} from "@chakra-ui/react";
import { FiArrowLeft, FiCalendar, FiUserPlus } from "react-icons/fi";
import { useCourse } from "../hooks/useCourses";
import { EnrollStudentModal } from "@/features/enrollments/components/EnrollStudentModal";
import { EnrolledStudentsList } from "@/features/enrollments/components/EnrolledStudentsList";

const weekDayLabels: Record<string, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
};

export default function AdminCourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading, error } = useCourse(id || "");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Button mt={4} leftIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
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
        leftIcon={<FiArrowLeft />}
        onClick={() => navigate("/admin/courses")}
        mb={6}
        variant="ghost"
      >
        Volver a cursos
      </Button>

      <HStack justify="space-between" mb={6}>
        <Heading size="xl">{course.name}</Heading>
        <HStack>
          <Badge colorScheme={course.isActive ? "green" : "gray"} fontSize="md" p={2}>
            {course.isActive ? "Activo" : "Inactivo"}
          </Badge>
          <Button
            leftIcon={<FiUserPlus />}
            colorScheme="blue"
            onClick={onOpen}
            isDisabled={!course.isActive || availableSpots === 0}
          >
            Matricular Estudiante
          </Button>
        </HStack>
      </HStack>

      {/* Información principal */}
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6} mb={6}>
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
                    Docente Asignado
                  </Text>
                  {course.teacher && (
                    <Text fontWeight="medium">
                      {course.teacher.firstName} {course.teacher.lastName}
                    </Text>
                  )}
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
        <Card mb={6}>
          <CardBody>
            <HStack mb={4}>
              <FiCalendar color="gray.500" />
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

      {/* Lista de estudiantes inscritos */}
      <Card>
        <CardBody>
          <HStack justify="space-between" mb={4}>
            <Heading size="md">Estudiantes Inscritos</Heading>
            <Badge colorScheme="blue" fontSize="md">
              {enrolledCount} {enrolledCount === 1 ? "estudiante" : "estudiantes"}
            </Badge>
          </HStack>
          <EnrolledStudentsList courseId={id || ""} />
        </CardBody>
      </Card>

      {/* Modal de matrícula */}
      <EnrollStudentModal
        isOpen={isOpen}
        onClose={onClose}
        courseId={id || ""}
        courseName={course.name}
      />
    </Box>
  );
}
