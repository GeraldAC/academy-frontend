import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseFormSchema, CourseFormData } from "../validations/courses.validations";
import { Course, Teacher } from "../types/courses.types";

interface CourseFormProps {
  course?: Course;
  teachers: Teacher[];
  isSubmitting: boolean;
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
}

export const CourseForm = ({
  course,
  teachers,
  isSubmitting,
  onSubmit,
  onCancel,
}: CourseFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: course
      ? {
          name: course.name,
          description: course.description || "",
          subject: course.subject,
          teacherId: course.teacherId,
          capacity: course.capacity,
          monthlyPrice: course.monthlyPrice,
        }
      : {
          capacity: 25,
          monthlyPrice: 0,
        },
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5} align="stretch">
        {/* Nombre del curso */}
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
            Nombre del curso
          </FormLabel>
          <Input
            {...register("name")}
            placeholder="Ej: Matemática Avanzada"
            size="lg"
            bg="gray.50"
            border="1px"
            borderColor="gray.200"
            _hover={{ borderColor: "gray.300" }}
            _focus={{ bg: "white", borderColor: "blue.400" }}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        {/* Descripción */}
        <FormControl isInvalid={!!errors.description}>
          <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
            Descripción (opcional)
          </FormLabel>
          <Textarea
            {...register("description")}
            placeholder="Describe el contenido del curso..."
            rows={4}
            bg="gray.50"
            border="1px"
            borderColor="gray.200"
            _hover={{ borderColor: "gray.300" }}
            _focus={{ bg: "white", borderColor: "blue.400" }}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        {/* Materia */}
        <FormControl isInvalid={!!errors.subject} isRequired>
          <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
            Materia
          </FormLabel>
          <Input
            {...register("subject")}
            placeholder="Ej: Matemática"
            size="lg"
            bg="gray.50"
            border="1px"
            borderColor="gray.200"
            _hover={{ borderColor: "gray.300" }}
            _focus={{ bg: "white", borderColor: "blue.400" }}
          />
          <FormErrorMessage>{errors.subject?.message}</FormErrorMessage>
        </FormControl>

        {/* Docente */}
        <FormControl isInvalid={!!errors.teacherId} isRequired>
          <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
            Docente
          </FormLabel>
          <Select
            {...register("teacherId")}
            placeholder="Selecciona un docente"
            size="lg"
            bg="gray.50"
            border="1px"
            borderColor="gray.200"
            _hover={{ borderColor: "gray.300" }}
            _focus={{ bg: "white", borderColor: "blue.400" }}
          >
            {teachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.teacherId?.message}</FormErrorMessage>
        </FormControl>

        <Flex gap={5} direction={{ base: "column", md: "row" }}>
          {/* Capacidad */}
          <FormControl isInvalid={!!errors.capacity} isRequired flex="1">
            <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
              Capacidad (estudiantes)
            </FormLabel>
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <NumberInput
                  min={5}
                  max={40}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  size="lg"
                >
                  <NumberInputField
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormErrorMessage>{errors.capacity?.message}</FormErrorMessage>
          </FormControl>

          {/* Precio mensual */}
          <FormControl isInvalid={!!errors.monthlyPrice} isRequired flex="1">
            <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
              Precio mensual (S/)
            </FormLabel>
            <Controller
              name="monthlyPrice"
              control={control}
              render={({ field }) => (
                <NumberInput
                  min={0}
                  max={9999.99}
                  precision={2}
                  step={10}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value)}
                  size="lg"
                >
                  <NumberInputField
                    bg="gray.50"
                    border="1px"
                    borderColor="gray.200"
                    _hover={{ borderColor: "gray.300" }}
                    _focus={{ bg: "white", borderColor: "blue.400" }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            <FormErrorMessage>{errors.monthlyPrice?.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        {/* Botones */}
        <Box
          display="flex"
          gap={3}
          justifyContent="flex-end"
          pt={6}
          mt={4}
          borderTop="1px"
          borderColor="gray.200"
        >
          <Button variant="outline" onClick={onCancel} isDisabled={isSubmitting} size="lg" px={8}>
            Cancelar
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Guardando..."
            size="lg"
            px={8}
            shadow="sm"
          >
            {course ? "Actualizar" : "Crear"} Curso
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
