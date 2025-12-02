import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Tooltip,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { FiTrash2, FiMail, FiPhone } from "react-icons/fi";
import { useEnrollments } from "../hooks/useEnrollments";
import { useState, useRef } from "react";
import type { Enrollment } from "../types/types";

interface EnrolledStudentsListProps {
  courseId: string;
}

export const EnrolledStudentsList = ({ courseId }: EnrolledStudentsListProps) => {
  const { enrollments, isLoadingEnrollments, cancelEnrollment, isCancelling } =
    useEnrollments(courseId);

  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleCancelClick = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    onOpen();
  };

  const handleConfirmCancel = () => {
    if (selectedEnrollment) {
      cancelEnrollment(selectedEnrollment.id);
      onClose();
    }
  };

  if (isLoadingEnrollments) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="lg" color="blue.500" />
        <Text mt={4} color="gray.600">
          Cargando estudiantes inscritos...
        </Text>
      </Box>
    );
  }

  if (!enrollments || enrollments.length === 0) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        <AlertDescription>Aún no hay estudiantes inscritos en este curso.</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Box overflowX="auto" borderRadius="md" border="1px" borderColor="gray.200">
        <Table variant="simple" size="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th>Estudiante</Th>
              <Th>DNI</Th>
              <Th>Contacto</Th>
              <Th>Fecha de Matrícula</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {enrollments.map((enrollment) => (
              <Tr key={enrollment.id} _hover={{ bg: "gray.50" }}>
                <Td fontWeight="medium">
                  {enrollment.student.firstName} {enrollment.student.lastName}
                </Td>
                <Td>{enrollment.student.dni}</Td>
                <Td>
                  <Box>
                    <Tooltip label={enrollment.student.email} fontSize="xs">
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <FiMail size={12} />
                        <Text fontSize="sm" noOfLines={1} maxW="200px">
                          {enrollment.student.email}
                        </Text>
                      </Box>
                    </Tooltip>
                    {enrollment.student.phone && (
                      <Box display="flex" alignItems="center" gap={1}>
                        <FiPhone size={12} />
                        <Text fontSize="sm">{enrollment.student.phone}</Text>
                      </Box>
                    )}
                  </Box>
                </Td>
                <Td>
                  {new Date(enrollment.enrollmentDate).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      enrollment.status === "ACTIVE"
                        ? "green"
                        : enrollment.status === "CANCELLED"
                          ? "red"
                          : "gray"
                    }
                  >
                    {enrollment.status === "ACTIVE"
                      ? "Activo"
                      : enrollment.status === "CANCELLED"
                        ? "Cancelado"
                        : "Completado"}
                  </Badge>
                </Td>
                <Td>
                  {enrollment.status === "ACTIVE" && (
                    <Tooltip label="Cancelar matrícula" fontSize="xs">
                      <IconButton
                        aria-label="Cancelar matrícula"
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleCancelClick(enrollment)}
                        isDisabled={isCancelling}
                      />
                    </Tooltip>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Dialog de confirmación */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancelar Matrícula
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de cancelar la matrícula de{" "}
              <strong>
                {selectedEnrollment?.student.firstName} {selectedEnrollment?.student.lastName}
              </strong>
              ? Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handleConfirmCancel}
                ml={3}
                isLoading={isCancelling}
              >
                Sí, cancelar matrícula
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
