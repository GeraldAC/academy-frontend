// src/features/reservations/pages/MyReservationsPage.tsx
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { reservationsApi } from "../services/api";
import { Reservation } from "../types";

export const MyReservationsPage = () => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: reservations, isLoading } = useQuery({
    queryKey: ["my-reservations"],
    queryFn: reservationsApi.getMyReservations,
  });

  const cancelMutation = useMutation({
    mutationFn: reservationsApi.cancel,
    onSuccess: () => {
      toast({
        title: "Reserva cancelada",
        description: "Tu reserva ha sido cancelada exitosamente",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["my-reservations"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo cancelar la reserva",
        status: "error",
        duration: 5000,
      });
    },
  });

  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    onOpen();
  };

  const handleConfirmCancel = () => {
    if (selectedReservation) {
      cancelMutation.mutate(selectedReservation.id);
    }
  };

  const canCancel = (classDate: string) => {
    const now = new Date();
    const reservationDate = new Date(classDate);
    const hoursUntil = (reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntil >= 24;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={6}>Mis Reservas</Heading>

      {!reservations || reservations.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No tienes reservas registradas
        </Alert>
      ) : (
        <Card>
          <CardBody overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Curso</Th>
                  <Th>Materia</Th>
                  <Th>Fecha</Th>
                  <Th>Docente</Th>
                  <Th>Estado</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reservations.map((reservation) => (
                  <Tr key={reservation.id}>
                    <Td>{reservation.course?.name}</Td>
                    <Td>{reservation.course?.subject}</Td>
                    <Td>{formatDate(reservation.classDate)}</Td>
                    <Td>
                      {reservation.course?.teacher
                        ? `${reservation.course.teacher.firstName} ${reservation.course.teacher.lastName}`
                        : "-"}
                    </Td>
                    <Td>
                      {reservation.isCancelled ? (
                        <Badge colorScheme="red">Cancelada</Badge>
                      ) : new Date(reservation.classDate) < new Date() ? (
                        <Badge colorScheme="gray">Completada</Badge>
                      ) : (
                        <Badge colorScheme="green">Activa</Badge>
                      )}
                    </Td>
                    <Td>
                      {!reservation.isCancelled && new Date(reservation.classDate) > new Date() && (
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleCancelClick(reservation)}
                          isDisabled={!canCancel(reservation.classDate)}
                        >
                          Cancelar
                        </Button>
                      )}
                      {!reservation.isCancelled &&
                        !canCancel(reservation.classDate) &&
                        new Date(reservation.classDate) > new Date() && (
                          <Text fontSize="xs" color="gray.500">
                            No se puede cancelar (menos de 24h)
                          </Text>
                        )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Cancelación</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas cancelar tu reserva para {selectedReservation?.course?.name}{" "}
            el {selectedReservation && formatDate(selectedReservation.classDate)}?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              No, mantener reserva
            </Button>
            <Button
              colorScheme="red"
              onClick={handleConfirmCancel}
              isLoading={cancelMutation.isPending}
            >
              Sí, cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
