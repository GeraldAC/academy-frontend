// src/features/reservations/pages/ReservationPage.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReservationSchema, CreateReservationFormData } from "../validations";
import { reservationsApi, enrollmentsApi } from "../services/api";

export const ReservationPage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateReservationFormData>({
    resolver: zodResolver(createReservationSchema),
  });

  // Obtener cursos matriculados con horarios de reforzamiento
  const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: enrollmentsApi.getMyEnrollments,
  });

  console.log({ enrollments });

  // Filtrar solo cursos activos con horarios de reforzamiento
  // const availableCourses = enrollments?.filter(
  //   (enrollment) =>
  //     enrollment.status === "ACTIVE" &&
  //     enrollment.course?.schedules?.some(
  //       (schedule) => schedule.classType === "REINFORCEMENT" && schedule.isActive
  //     )
  // );

  const availableCourses = enrollments;

  const createReservationMutation = useMutation({
    mutationFn: reservationsApi.create,
    onSuccess: () => {
      toast({
        title: "Reserva creada",
        description: "Tu reserva ha sido registrada exitosamente",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
      reset();
      setSelectedCourseId("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo crear la reserva",
        status: "error",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: CreateReservationFormData) => {
    createReservationMutation.mutate(data);
  };

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setValue("courseId", courseId);
  };

  if (loadingEnrollments) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  const formatTime = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const DAY_LABELS: Record<string, string> = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={6}>Reservar Clase de Reforzamiento</Heading>

      {!availableCourses || availableCourses.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No tienes cursos con clases de reforzamiento disponibles
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <Heading size="md">Nueva Reserva</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="stretch">
                <FormControl isInvalid={!!errors.courseId}>
                  <FormLabel>Curso</FormLabel>
                  <Select
                    placeholder="Selecciona un curso"
                    value={selectedCourseId}
                    onChange={(e) => handleCourseChange(e.target.value)}
                  >
                    {availableCourses.map((enrollment) => (
                      <option key={enrollment.course.id} value={enrollment.course.id}>
                        {enrollment.course.name} - {enrollment.course.subject}
                      </option>
                    ))}
                  </Select>
                  {errors.courseId && (
                    <Text color="red.500" fontSize="sm">
                      {errors.courseId.message}
                    </Text>
                  )}
                </FormControl>

                {selectedCourseId && (
                  <>
                    <Box p={3} bg="blue.50" borderRadius="md">
                      <Text fontSize="sm" fontWeight="bold" mb={2}>
                        Horarios disponibles:
                      </Text>

                      {availableCourses
                        .find((e) => e.course.id === selectedCourseId)
                        ?.course.schedules?.filter(
                          (s) => s.classType === "REINFORCEMENT" && s.isActive
                        )
                        .map((schedule) => (
                          <Text key={schedule.id} fontSize="sm">
                            • {DAY_LABELS[schedule.weekDay]} – {formatTime(schedule.startTime)} a{" "}
                            {formatTime(schedule.endTime)}
                            {schedule.classroom && ` (${schedule.classroom})`}
                          </Text>
                        ))}
                    </Box>

                    <FormControl isInvalid={!!errors.classDate}>
                      <FormLabel>Fecha de la clase</FormLabel>
                      <Input type="date" {...register("classDate")} />
                      {errors.classDate && (
                        <Text color="red.500" fontSize="sm">
                          {errors.classDate.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormLabel>Notas (opcional)</FormLabel>
                      <Textarea
                        {...register("notes")}
                        placeholder="Agrega alguna nota si es necesario"
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      isLoading={createReservationMutation.isPending}
                      w="full"
                    >
                      Reservar
                    </Button>
                  </>
                )}
              </VStack>
            </form>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};
