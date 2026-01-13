import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  useToast,
  FormErrorMessage,
  Text,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { createSchedule, updateSchedule } from "@/features/users/services/api";
import type { Schedule, Course, User, CreateScheduleRequest } from "@/features/users/types/types";

const DAYS_OPTIONS = [
  { value: "MONDAY", label: "Lunes" },
  { value: "TUESDAY", label: "Martes" },
  { value: "WEDNESDAY", label: "Miércoles" },
  { value: "THURSDAY", label: "Jueves" },
  { value: "FRIDAY", label: "Viernes" },
  { value: "SATURDAY", label: "Sábado" },
  { value: "SUNDAY", label: "Domingo" },
];

interface CreateScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
  courses: Course[];
  teachers: User[];
}

interface FormData {
  courseId: number | string;
  teacherId: number | string;
  days: string[]; // Cambiado para soportar múltiples días
  startTime: string;
  endTime: string;
  classroom: string;
}

export default function CreateScheduleModal({
  isOpen,
  onClose,
  schedule,
  courses,
  teachers,
}: CreateScheduleModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<FormData>({
    courseId: "", // ✅ String vacío
    teacherId: "", // ✅ String vacío
    days: [],
    startTime: "",
    endTime: "",
    classroom: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load schedule data when editing
  useEffect(() => {
    if (schedule) {
      setFormData({
        courseId: schedule.courseId,
        teacherId: schedule.teacherId,
        days: [schedule.dayOfWeek],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        classroom: schedule.classroom || "",
      });
    } else {
      // Reset form when creating new
      setFormData({
        courseId: "",
        teacherId: "",
        days: [],
        startTime: "",
        endTime: "",
        classroom: "",
      });
    }
    setErrors({});
  }, [schedule, isOpen]);

  // Create mutation - ahora crea múltiples horarios
  const createMutation = useMutation({
    mutationFn: async (schedules: CreateScheduleRequest[]) => {
      // Crear todos los horarios en paralelo
      return Promise.all(schedules.map((s) => createSchedule(s)));
    },
    onSuccess: (_, schedules) => {
      const count = schedules.length;
      toast({
        title: `${count} horario${count > 1 ? "s" : ""} creado${count > 1 ? "s" : ""}`,
        description: `Se ${count > 1 ? "han" : "ha"} creado exitosamente`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error al crear horario",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: { id: number; payload: Partial<CreateScheduleRequest> }) =>
      updateSchedule(data.id, data.payload),
    onSuccess: () => {
      toast({
        title: "Horario actualizado",
        description: "El horario ha sido actualizado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error al actualizar",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.courseId || formData.courseId === "") {
      newErrors.courseId = "Selecciona un curso";
    }

    if (!formData.teacherId || formData.teacherId === "") {
      newErrors.teacherId = "Selecciona un profesor";
    }

    if (formData.days.length === 0) {
      newErrors.days = "Selecciona al menos un día";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Ingresa la hora de inicio";
    }

    if (!formData.endTime) {
      newErrors.endTime = "Ingresa la hora de fin";
    }

    if (formData.endTime && formData.startTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "La hora de fin debe ser posterior a la hora de inicio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (schedule) {
      // Update existing schedule (solo un día)
      const payload: Partial<CreateScheduleRequest> = {
        courseId: formData.courseId,
        teacherId: formData.teacherId,
        dayOfWeek: formData.days[0] as any,
        startTime: formData.startTime,
        endTime: formData.endTime,
        classroom: formData.classroom || undefined,
      };
      updateMutation.mutate({ id: parseInt(schedule.id), payload });
    } else {
      // Create new schedules (uno por cada día seleccionado)
      const schedules: CreateScheduleRequest[] = formData.days.map((day) => ({
        courseId: formData.courseId,
        teacherId: formData.teacherId,
        dayOfWeek: day as any,
        startTime: formData.startTime,
        endTime: formData.endTime,
        classroom: formData.classroom || undefined,
      }));
      createMutation.mutate(schedules);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // ✅ Mantener como string
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDaysChange = (days: string[]) => {
    setFormData((prev) => ({ ...prev, days }));
    if (errors.days) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.days;
        return newErrors;
      });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{schedule ? "Editar Horario" : "Crear Nuevo Horario"}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            {/* Course */}
            <FormControl isRequired isInvalid={!!errors.courseId}>
              <FormLabel>Curso</FormLabel>
              {!Array.isArray(courses) || courses.length === 0 ? (
                <Text fontSize="sm" color="red.500">
                  No hay cursos disponibles. Crea cursos primero.
                </Text>
              ) : (
                <Select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  placeholder="Selecciona un curso"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.code || course.subject})
                    </option>
                  ))}
                </Select>
              )}
              <FormErrorMessage>{errors.courseId}</FormErrorMessage>
            </FormControl>

            {/* Teacher */}
            <FormControl isRequired isInvalid={!!errors.teacherId}>
              <FormLabel>Profesor</FormLabel>
              {!Array.isArray(teachers) || teachers.length === 0 ? (
                <Text fontSize="sm" color="red.500">
                  No hay profesores disponibles. Crea usuarios con rol TEACHER primero.
                </Text>
              ) : (
                <Select
                  name="teacherId"
                  value={formData.teacherId}
                  onChange={handleChange}
                  placeholder="Selecciona un profesor"
                >
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
                </Select>
              )}
              <FormErrorMessage>{errors.teacherId}</FormErrorMessage>
            </FormControl>

            {/* Days of Week - Multiple selection */}
            <FormControl isRequired isInvalid={!!errors.days}>
              <FormLabel>Días de la semana {!schedule && "(Selecciona uno o más días)"}</FormLabel>
              <CheckboxGroup value={formData.days} onChange={handleDaysChange}>
                <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={2}>
                  {DAYS_OPTIONS.map((day) => (
                    <Checkbox key={day.value} value={day.value}>
                      {day.label}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </CheckboxGroup>
              <FormErrorMessage>{errors.days}</FormErrorMessage>
              {!schedule && formData.days.length > 1 && (
                <Text fontSize="xs" color="blue.600" mt={2}>
                  Se crearán {formData.days.length} horarios con la misma información
                </Text>
              )}
            </FormControl>

            {/* Time Range */}
            <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
              <FormControl isRequired isInvalid={!!errors.startTime} flex={1}>
                <FormLabel>Hora de inicio</FormLabel>
                <Input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.startTime}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.endTime} flex={1}>
                <FormLabel>Hora de fin</FormLabel>
                <Input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.endTime}</FormErrorMessage>
              </FormControl>
            </Stack>

            {/* Classroom */}
            <FormControl isRequired isInvalid={!!errors.classroom}>
              <FormLabel>Aula/Salón</FormLabel>
              <Input
                name="classroom"
                value={formData.classroom}
                onChange={handleChange}
                placeholder="Ej: A-101, Lab 2, Aula Virtual"
              />
              <FormErrorMessage>{errors.classroom}</FormErrorMessage>
            </FormControl>

            {/* Info text */}
            <Text fontSize="sm" color="gray.600">
              * Los horarios se validarán automáticamente para evitar conflictos
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isLoading}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText={schedule ? "Actualizando..." : "Creando..."}
          >
            {schedule ? "Actualizar" : "Crear"} Horario
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
