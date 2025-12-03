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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiMail, FiPhone, FiMoreVertical, FiCheckCircle, FiXCircle, FiCheck } from "react-icons/fi";
import { useEnrollments } from "../hooks/useEnrollments";
import { useState, useRef } from "react";
import type { Enrollment, EnrollmentStatus } from "../types/types";

interface EnrolledStudentsListProps {
  courseId: string;
}

export const EnrolledStudentsList = ({ courseId }: EnrolledStudentsListProps) => {
  const { enrollments, isLoadingEnrollments, updateEnrollmentStatus, isUpdatingStatus } =
    useEnrollments(courseId);

  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [newStatus, setNewStatus] = useState<EnrollmentStatus | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleStatusChange = (enrollment: Enrollment, status: EnrollmentStatus) => {
    setSelectedEnrollment(enrollment);
    setNewStatus(status);
    onOpen();
  };

  const handleConfirmStatusChange = () => {
    if (selectedEnrollment && newStatus) {
      updateEnrollmentStatus(
        { enrollmentId: selectedEnrollment.id, status: { status: newStatus } },
        {
          onSuccess: () => {
            onClose();
            setSelectedEnrollment(null);
            setNewStatus(null);
          },
        }
      );
    }
  };

  const getStatusBadge = (status: EnrollmentStatus) => {
    const config = {
      ACTIVE: { colorScheme: "green", label: "Activo" },
      CANCELLED: { colorScheme: "red", label: "Cancelado" },
      COMPLETED: { colorScheme: "blue", label: "Completado" },
    };
    return config[status];
  };

  const getStatusMessage = (status: EnrollmentStatus) => {
    const messages = {
      ACTIVE: "reactivar",
      CANCELLED: "cancelar",
      COMPLETED: "marcar como completado",
    };
    return messages[status];
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
            {enrollments.map((enrollment) => {
              const statusBadge = getStatusBadge(enrollment.status);

              return (
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
                    <Badge colorScheme={statusBadge.colorScheme}>{statusBadge.label}</Badge>
                  </Td>
                  <Td>
                    {enrollment.status !== "COMPLETED" && (
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<FiMoreVertical />}
                          size="sm"
                          variant="ghost"
                          aria-label="Opciones"
                          isDisabled={isUpdatingStatus}
                        />
                        <MenuList>
                          {enrollment.status === "ACTIVE" && (
                            <>
                              <MenuItem
                                icon={<FiCheck />}
                                onClick={() => handleStatusChange(enrollment, "COMPLETED")}
                              >
                                Marcar como completado
                              </MenuItem>
                              <MenuItem
                                icon={<FiXCircle />}
                                color="red.600"
                                onClick={() => handleStatusChange(enrollment, "CANCELLED")}
                              >
                                Cancelar matrícula
                              </MenuItem>
                            </>
                          )}
                          {enrollment.status === "CANCELLED" && (
                            <MenuItem
                              icon={<FiCheckCircle />}
                              color="green.600"
                              onClick={() => handleStatusChange(enrollment, "ACTIVE")}
                            >
                              Reactivar matrícula
                            </MenuItem>
                          )}
                        </MenuList>
                      </Menu>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      {/* Dialog de confirmación */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar cambio de estado
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de {newStatus && getStatusMessage(newStatus)} la matrícula de{" "}
              <strong>
                {selectedEnrollment?.student.firstName} {selectedEnrollment?.student.lastName}
              </strong>
              ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isUpdatingStatus}>
                Cancelar
              </Button>
              <Button
                colorScheme={newStatus === "CANCELLED" ? "red" : "blue"}
                onClick={handleConfirmStatusChange}
                ml={3}
                isLoading={isUpdatingStatus}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
