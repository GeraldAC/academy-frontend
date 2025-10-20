import { Box, SimpleGrid, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { FiBookOpen, FiCalendar, FiCheckSquare, FiDollarSign } from "react-icons/fi";
import { useAuthStore } from "@/stores/useAuthStore";
import { StatCard } from "@/components/common/StatCard";

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={2} color="gray.800">
        Bienvenido, {user?.firstName}
      </Heading>
      <Text color="gray.600" mb={8}>
        Panel de Control - Estudiante
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6} mb={8}>
        <StatCard
          icon={FiBookOpen}
          label="Cursos Inscritos"
          value="6"
          helpText="Ciclo actual"
          colorScheme="blue"
        />
        <StatCard
          icon={FiCalendar}
          label="Clases Esta Semana"
          value="15"
          helpText="2 pendientes hoy"
          colorScheme="green"
        />
        <StatCard
          icon={FiCheckSquare}
          label="Mi Asistencia"
          value="95%"
          helpText="Excelente"
          colorScheme="yellow"
        />
        <StatCard
          icon={FiDollarSign}
          label="Estado de Pagos"
          value="Al día"
          helpText="Próximo: 15 Nov"
          colorScheme="red"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.800">
              Mi Horario de Hoy
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Horario de clases del día...
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.800">
              Notificaciones Recientes
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Últimas notificaciones...
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;
