import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  VStack,
  Text,
  Select,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enrollmentSchema, type EnrollmentFormData } from "../validations/validation";
import { useEnrollments } from "../hooks/useEnrollments";

interface EnrollStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseName: string;
}

export const EnrollStudentModal = ({
  isOpen,
  onClose,
  courseId,
  courseName,
}: EnrollStudentModalProps) => {
  const { availableStudents, isLoadingStudents, createEnrollment, isCreating } =
    useEnrollments(courseId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      courseId,
    },
  });

  const onSubmit = (data: EnrollmentFormData) => {
    createEnrollment(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Matricular Estudiante</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <AlertDescription>
                  Matriculando en: <strong>{courseName}</strong>
                </AlertDescription>
              </Alert>

              <FormControl isInvalid={!!errors.studentId}>
                <FormLabel>Estudiante</FormLabel>
                {isLoadingStudents ? (
                  <Spinner size="sm" />
                ) : availableStudents && availableStudents.length > 0 ? (
                  <Select placeholder="Selecciona un estudiante" {...register("studentId")}>
                    {availableStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.firstName} {student.lastName} - {student.dni}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Alert status="warning" borderRadius="md">
                    <AlertIcon />
                    <AlertDescription>
                      No hay estudiantes disponibles para matricular en este curso.
                    </AlertDescription>
                  </Alert>
                )}
                <FormErrorMessage>{errors.studentId?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.notes}>
                <FormLabel>Notas (Opcional)</FormLabel>
                <Textarea
                  placeholder="Observaciones o notas sobre la matrícula..."
                  {...register("notes")}
                  rows={3}
                />
                <FormErrorMessage>{errors.notes?.message}</FormErrorMessage>
              </FormControl>

              <Text fontSize="sm" color="gray.600">
                La fecha de matrícula será la fecha actual.
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={handleClose} isDisabled={isCreating}>
              Cancelar
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isCreating}
              loadingText="Matriculando..."
              isDisabled={!availableStudents || availableStudents.length === 0}
            >
              Matricular
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
