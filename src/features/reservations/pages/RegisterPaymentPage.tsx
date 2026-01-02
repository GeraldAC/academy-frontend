// src/features/payments/pages/RegisterPaymentPage.tsx
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
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPaymentSchema, CreatePaymentFormData } from "../validations";
import { paymentsApi } from "../services/api";
import { coursesService } from "@/features/courses/services/courses.service";

export const RegisterPaymentPage = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      status: "PENDING",
    },
  });

  // Obtener lista de estudiantes
  const { data: students, isLoading: loadingStudents } = useQuery({
    queryKey: ["students"],
    queryFn: () => coursesService.getAvailableUsers("STUDENT", true),
  });

  const createPaymentMutation = useMutation({
    mutationFn: paymentsApi.create,
    onSuccess: () => {
      toast({
        title: "Pago registrado",
        description: "El pago ha sido registrado exitosamente",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo registrar el pago",
        status: "error",
        duration: 5000,
      });
    },
  });

  const onSubmit = (data: CreatePaymentFormData) => {
    createPaymentMutation.mutate(data);
  };

  if (loadingStudents) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={6}>Registrar Pago</Heading>

      <Card>
        <CardHeader>
          <Heading size="md">Nuevo Pago</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <FormControl isInvalid={!!errors.studentId}>
                <FormLabel>Estudiante</FormLabel>
                <Select placeholder="Selecciona un estudiante" {...register("studentId")}>
                  {students?.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName} - {student.dni}
                    </option>
                  ))}
                </Select>
                {errors.studentId && (
                  <Text color="red.500" fontSize="sm">
                    {errors.studentId.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.concept}>
                <FormLabel>Concepto</FormLabel>
                <Select placeholder="Selecciona un concepto" {...register("concept")}>
                  <option value="Mensualidad">Mensualidad</option>
                  <option value="Matrícula">Matrícula</option>
                  <option value="Materiales">Materiales</option>
                  <option value="Otro">Otro</option>
                </Select>
                {errors.concept && (
                  <Text color="red.500" fontSize="sm">
                    {errors.concept.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.amount}>
                <FormLabel>Monto (S/)</FormLabel>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      min={0}
                      precision={2}
                      value={field.value}
                      onChange={(_, valueNumber) => field.onChange(valueNumber)}
                    >
                      <NumberInputField placeholder="0.00" />
                    </NumberInput>
                  )}
                />
                {errors.amount && (
                  <Text color="red.500" fontSize="sm">
                    {errors.amount.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.dueDate}>
                <FormLabel>Fecha de Vencimiento (opcional)</FormLabel>
                <Input type="date" {...register("dueDate")} />
                {errors.dueDate && (
                  <Text color="red.500" fontSize="sm">
                    {errors.dueDate.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.status}>
                <FormLabel>Estado</FormLabel>
                <Select {...register("status")}>
                  <option value="PENDING">Pendiente</option>
                  <option value="PAID">Pagado</option>
                  <option value="OVERDUE">Vencido</option>
                </Select>
                {errors.status && (
                  <Text color="red.500" fontSize="sm">
                    {errors.status.message}
                  </Text>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.paymentMethod}>
                <FormLabel>Método de Pago (opcional)</FormLabel>
                <Select placeholder="Selecciona un método" {...register("paymentMethod")}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Yape">Yape</option>
                  <option value="Plin">Plin</option>
                </Select>
                {errors.paymentMethod && (
                  <Text color="red.500" fontSize="sm">
                    {errors.paymentMethod.message}
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Notas (opcional)</FormLabel>
                <Textarea
                  {...register("notes")}
                  placeholder="Agrega notas adicionales si es necesario"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={createPaymentMutation.isPending}
                w="full"
              >
                Registrar Pago
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};
