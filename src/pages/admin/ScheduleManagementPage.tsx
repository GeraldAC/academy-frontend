// src/pages/admin/ScheduleManagementPage.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  useDisclosure,
  useToast,
  Flex,
  Select,
  SimpleGrid,
  Badge,
  IconButton,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";
import { Plus, Calendar, Trash2, Edit, Clock, MapPin, User as UserIcon } from "lucide-react";
import {
  getSchedules,
  getCourses,
  getTeachers,
  deleteSchedule,
} from "@/features/users/services/api";
import type { Schedule } from "@/features/users/types/types";
import CreateScheduleModal from "./components/CreateScheduleModal";

const DAYS_MAP = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

const DAYS_ORDER = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export default function ScheduleManagementPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  // Queries
  const { data: schedulesData, isLoading: isLoadingSchedules } = useQuery({
    queryKey: ["schedules", selectedDay, selectedCourse],
    queryFn: async () => {
      const result = await getSchedules({
        dayOfWeek: selectedDay !== "all" ? selectedDay : undefined,
        courseId: selectedCourse !== "all" ? Number(selectedCourse) : undefined,
      });
      console.log("[DEBUG] schedulesData from API:", result);
      return result;
    },
  });

  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await getCourses();
      return Array.isArray(response) ? response : (response as any).data || [];
    },
  });

  const { data: teachers = [], isLoading: isLoadingTeachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const response = await getTeachers();
      return Array.isArray(response) ? response : (response as any).data || [];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      toast({
        title: "Horario eliminado",
        description: "El horario ha sido eliminado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al eliminar",
        description: error.response?.data?.message || "Ocurrió un error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    onOpen();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este horario?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreateNew = () => {
    setEditingSchedule(null);
    onOpen();
  };

  const handleCloseModal = () => {
    setEditingSchedule(null);
    onClose();
  };

  // Organizar horarios por día
  const schedulesByDay =
    schedulesData?.data.reduce(
      (acc, schedule) => {
        const dayKey = (schedule as any).weekDay || schedule.dayOfWeek; // Handle both field names
        if (!acc[dayKey]) {
          acc[dayKey] = [];
        }
        acc[dayKey].push(schedule);
        return acc;
      },
      {} as Record<string, Schedule[]>
    ) || {};

  // Ordenar horarios por hora de inicio
  Object.keys(schedulesByDay).forEach((day) => {
    schedulesByDay[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  const isLoading = isLoadingSchedules || isLoadingCourses || isLoadingTeachers;

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading size="lg" mb={2} color="gray.800">
            Gestión de Horarios
          </Heading>
          <Text color="gray.600">Programa y administra los horarios de los cursos</Text>
        </Box>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="blue"
          onClick={handleCreateNew}
          size="lg"
        >
          Nuevo Horario
        </Button>
      </Flex>

      {/* Filters */}
      <Card mb={6}>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                Filtrar por día
              </Text>
              <Select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                icon={<Calendar size={16} />}
              >
                <option value="all">Todos los días</option>
                {Object.entries(DAYS_MAP).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                Filtrar por curso
              </Text>
              <Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="all">Todos los cursos</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </Select>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Flex justify="center" align="center" py={12}>
          <Spinner size="xl" color="blue.500" />
        </Flex>
      )}

      {/* Empty State */}
      {!isLoading && schedulesData?.data.length === 0 && (
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          No hay horarios registrados. Crea el primer horario para comenzar.
        </Alert>
      )}

      {/* Schedules by Day */}
      {!isLoading && schedulesData && schedulesData.data.length > 0 && (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {DAYS_ORDER.map((day) => {
            const daySchedules = schedulesByDay[day] || [];
            if (daySchedules.length === 0 && selectedDay === "all") return null;

            return (
              <Card key={day}>
                <CardBody>
                  <Flex align="center" mb={4}>
                    <Calendar size={20} />
                    <Heading size="md" ml={2} color="gray.800">
                      {DAYS_MAP[day as keyof typeof DAYS_MAP]}
                    </Heading>
                    <Badge ml="auto" colorScheme="blue">
                      {daySchedules.length} {daySchedules.length === 1 ? "clase" : "clases"}
                    </Badge>
                  </Flex>

                  <Divider mb={4} />

                  {daySchedules.length === 0 ? (
                    <Text color="gray.500" fontSize="sm" textAlign="center" py={4}>
                      No hay horarios para este día
                    </Text>
                  ) : (
                    <Box>
                      {daySchedules.map((schedule) => (
                        <Card
                          key={schedule.id}
                          variant="outline"
                          mb={3}
                          _hover={{ shadow: "md" }}
                          transition="all 0.2s"
                        >
                          <CardBody>
                            <Flex justify="space-between" align="start" mb={2}>
                              <Box flex={1}>
                                <Text fontWeight="bold" color="blue.600" mb={1}>
                                  {schedule.course?.name}
                                </Text>
                                <Text fontSize="xs" color="gray.600" mb={2}>
                                  Código: {schedule.course?.code}
                                </Text>
                              </Box>
                              <Flex gap={1}>
                                <IconButton
                                  aria-label="Editar"
                                  icon={<Edit size={16} />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="blue"
                                  onClick={() => handleEdit(schedule)}
                                />
                                <IconButton
                                  aria-label="Eliminar"
                                  icon={<Trash2 size={16} />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={() => handleDelete(Number(schedule.id))}
                                  isLoading={deleteMutation.isPending}
                                />
                              </Flex>
                            </Flex>

                            <Flex direction="column" gap={2} fontSize="sm" color="gray.600">
                              <Flex align="center">
                                <Clock size={14} />
                                <Text ml={2}>
                                  {schedule.startTime} - {schedule.endTime}
                                </Text>
                              </Flex>
                              <Flex align="center">
                                <UserIcon size={14} />
                                <Text ml={2}>
                                  Prof. {schedule.teacher?.firstName} {schedule.teacher?.lastName}
                                </Text>
                              </Flex>
                              <Flex align="center">
                                <MapPin size={14} />
                                <Text ml={2}>Aula: {schedule.classroom ?? "A01"}</Text>
                              </Flex>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </Box>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      )}

      {/* Modal */}
      <CreateScheduleModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        schedule={editingSchedule}
        courses={courses}
        teachers={teachers}
      />
    </Box>
  );
}
