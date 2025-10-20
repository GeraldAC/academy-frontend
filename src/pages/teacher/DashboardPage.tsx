import { Box, SimpleGrid, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { FiBookOpen, FiCalendar, FiCheckSquare, FiClock } from "react-icons/fi";
import { useAuthStore } from "@/stores/useAuthStore";
import { StatCard } from "@/components/common/StatCard";

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Heading size="lg" mb={2} color="gray.800">
        Bienvenido, Prof. {user?.lastName}
      </Heading>
      <Text color="gray.600" mb={8}>
        Panel de Control - Profesor
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6} mb={8}>
        <StatCard
          icon={FiBookOpen}
          label="Mis Cursos"
          value="5"
          helpText="Cursos asignados"
          colorScheme="blue"
        />
        <StatCard
          icon={FiCalendar}
          label="Clases Esta Semana"
          value="12"
          helpText="3 pendientes hoy"
          colorScheme="green"
        />
        <StatCard
          icon={FiCheckSquare}
          label="Asistencia Promedio"
          value="92%"
          helpText="Tus cursos"
          colorScheme="yellow"
        />
        <StatCard
          icon={FiClock}
          label="Reservas Pendientes"
          value="8"
          helpText="Por confirmar"
          colorScheme="red"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.800">
              Próximas Clases
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Calendario de clases próximas...
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.800">
              Tareas Pendientes
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Lista de tareas y pendientes...
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;
