// src/features/reservations/pages/ClassReservationsPage.tsx
import {
  Box,
  Card,
  CardBody,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { reservationsApi } from "../services/api";
import { Reservation } from "../types";

export const ClassReservationsPage = () => {
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["teacher-reservations"],
    queryFn: reservationsApi.getAllTeacherReservations,
  });

  console.log({ reservations });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Agrupar reservas por fecha
  const groupByDate = (reservations: Reservation[]) => {
    const grouped: Record<string, Reservation[]> = {};

    reservations.forEach((reservation) => {
      const date = reservation.classDate;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(reservation);
    });

    return Object.entries(grouped).sort(
      ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  const groupedReservations = reservations ? groupByDate(reservations) : [];

  return (
    <Box p={4}>
      <Heading mb={6}>Reservas de Clases de Reforzamiento</Heading>

      {!reservations || reservations.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No hay reservas registradas para tus clases
        </Alert>
      ) : (
        <VStack spacing={6} align="stretch">
          {groupedReservations.map(([date, dateReservations]) => (
            <Card key={date}>
              <CardBody>
                <Heading size="md" mb={4}>
                  {formatDate(date)}
                </Heading>
                <Divider mb={4} />

                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Estudiante</Th>
                      <Th>Curso</Th>
                      <Th>Email</Th>
                      <Th>Teléfono</Th>
                      <Th>Notas</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dateReservations.map((reservation) => (
                      <Tr key={reservation.id}>
                        <Td>
                          {reservation.student
                            ? `${reservation.student.firstName} ${reservation.student.lastName}`
                            : "-"}
                        </Td>
                        <Td>
                          <Text fontWeight="medium">{reservation.course?.name}</Text>
                          <Text fontSize="xs" color="gray.600">
                            {reservation.course?.subject}
                          </Text>
                        </Td>
                        <Td>{reservation.student?.email || "-"}</Td>
                        <Td>{reservation.student?.phone || "-"}</Td>
                        <Td>
                          <Text fontSize="sm" color="gray.600">
                            {reservation.notes || "-"}
                          </Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Text fontSize="sm" color="gray.600" mt={3}>
                  Total de estudiantes: {dateReservations.length}
                </Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
    </Box>
  );
};
