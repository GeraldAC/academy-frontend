import { Box, SimpleGrid, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { FiUsers, FiBookOpen, FiCheckSquare, FiDollarSign } from "react-icons/fi";
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
        Panel de Control - Administrador
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={6} mb={8}>
        <StatCard
          icon={FiUsers}
          label="Total Usuarios"
          value="245"
          helpText="+12% vs mes anterior"
          colorScheme="blue"
        />
        <StatCard
          icon={FiBookOpen}
          label="Cursos Activos"
          value="18"
          helpText="3 por iniciar"
          colorScheme="green"
        />
        <StatCard
          icon={FiCheckSquare}
          label="Asistencia Promedio"
          value="87%"
          helpText="Esta semana"
          colorScheme="yellow"
        />
        <StatCard
          icon={FiDollarSign}
          label="Ingresos del Mes"
          value="S/ 45,200"
          helpText="+8% vs mes anterior"
          colorScheme="red"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.800">
              Actividad Reciente
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Contenido de actividad reciente...
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4} color="gray.800">
              Acciones Rápidas
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Enlaces rápidos a tareas comunes...
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;
