// src/features/payments/pages/PaymentsListPage.tsx
import { useState } from "react";
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
  Spinner,
  Alert,
  AlertIcon,
  HStack,
  Select,
  Input,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiTrash2 } from "react-icons/fi";
import { paymentsApi } from "../services/api";
import { Payment, PaymentFilters } from "../types";

export const PaymentsListPage = () => {
  const [filters, setFilters] = useState<PaymentFilters>({});
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments", filters],
    queryFn: () => paymentsApi.getAll(filters),
  });

  const deleteMutation = useMutation({
    mutationFn: paymentsApi.delete,
    onSuccess: () => {
      toast({
        title: "Pago eliminado",
        description: "El pago ha sido eliminado exitosamente",
        status: "success",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo eliminar el pago",
        status: "error",
        duration: 5000,
      });
    },
  });

  const handleFilterChange = (key: keyof PaymentFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleDeleteClick = (payment: Payment) => {
    setSelectedPayment(payment);
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedPayment) {
      deleteMutation.mutate(selectedPayment.id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "green";
      case "PENDING":
        return "yellow";
      case "OVERDUE":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PAID":
        return "Pagado";
      case "PENDING":
        return "Pendiente";
      case "OVERDUE":
        return "Vencido";
      default:
        return status;
    }
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
      <Heading mb={6}>Gestión de Pagos</Heading>

      <Card mb={4}>
        <CardBody>
          <HStack spacing={4} mb={4}>
            <Select
              placeholder="Todos los estados"
              value={filters.status || ""}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              maxW="200px"
            >
              <option value="PENDING">Pendiente</option>
              <option value="PAID">Pagado</option>
              <option value="OVERDUE">Vencido</option>
            </Select>

            <Input
              type="date"
              placeholder="Fecha inicio"
              value={filters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              maxW="200px"
            />

            <Input
              type="date"
              placeholder="Fecha fin"
              value={filters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              maxW="200px"
            />

            <Button onClick={() => setFilters({})} variant="outline" size="sm">
              Limpiar filtros
            </Button>
          </HStack>
        </CardBody>
      </Card>

      {!payments || payments.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          No hay pagos registrados
        </Alert>
      ) : (
        <Card>
          <CardBody overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Estudiante</Th>
                  <Th>DNI</Th>
                  <Th>Concepto</Th>
                  <Th isNumeric>Monto</Th>
                  <Th>Fecha Pago</Th>
                  <Th>Vencimiento</Th>
                  <Th>Método</Th>
                  <Th>Estado</Th>
                  <Th>Recibo</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>
                      <Text fontWeight="medium">
                        {payment.student
                          ? `${payment.student.firstName} ${payment.student.lastName}`
                          : "-"}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {payment.student?.email}
                      </Text>
                    </Td>
                    <Td>{payment.student?.dni || "-"}</Td>
                    <Td>{payment.concept}</Td>
                    <Td isNumeric fontWeight="semibold">
                      S/ {Number(payment.amount).toFixed(2)}
                    </Td>
                    <Td>{formatDate(payment.paymentDate)}</Td>
                    <Td>{formatDate(payment.dueDate)}</Td>
                    <Td>{payment.paymentMethod || "-"}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(payment.status)}>
                        {getStatusLabel(payment.status)}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="xs" fontFamily="mono">
                        {payment.receiptNumber || "-"}
                      </Text>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Eliminar pago"
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteClick(payment)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Text fontSize="sm" color="gray.600" mt={4}>
              Total de pagos: {payments.length}
            </Text>
          </CardBody>
        </Card>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar este pago?
            {selectedPayment && (
              <Box mt={3} p={3} bg="gray.50" borderRadius="md">
                <Text>
                  <strong>Estudiante:</strong>{" "}
                  {selectedPayment.student
                    ? `${selectedPayment.student.firstName} ${selectedPayment.student.lastName}`
                    : "-"}
                </Text>
                <Text>
                  <strong>Concepto:</strong> {selectedPayment.concept}
                </Text>
                <Text>
                  <strong>Monto:</strong> S/ {Number(selectedPayment.amount).toFixed(2)}
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={handleConfirmDelete}
              isLoading={deleteMutation.isPending}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
