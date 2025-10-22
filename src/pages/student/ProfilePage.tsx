import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  SimpleGrid,
  Avatar,
  Flex,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { useAuthStore } from "@/stores/useAuthStore";

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <Box>
      <Heading size="lg" mb={6} color="gray.800">
        Mi Perfil
      </Heading>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        <Card>
          <CardBody>
            <Flex direction="column" align="center" textAlign="center">
              <Avatar size="2xl" name={`${user.firstName} ${user.lastName}`} bg="red.500" mb={4} />
              <Heading size="md" mb={1}>
                {user.firstName} {user.lastName}
              </Heading>
              <Badge colorScheme="green" mb={4}>
                Estudiante
              </Badge>
              <Text color="gray.600" fontSize="sm">
                {user.email}
              </Text>
            </Flex>
          </CardBody>
        </Card>

        <Card gridColumn={{ base: "1", lg: "span 2" }}>
          <CardBody>
            <Heading size="md" mb={4}>
              Información Personal
            </Heading>
            <Divider mb={4} />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Nombre Completo
                </Text>
                <Text fontWeight="medium">
                  {user.firstName} {user.lastName}
                </Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  DNI
                </Text>
                <Text fontWeight="medium">{user.dni}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Email
                </Text>
                <Text fontWeight="medium">{user.email}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Teléfono
                </Text>
                <Text fontWeight="medium">{user.phone || "No registrado"}</Text>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Estado
                </Text>
                <Badge colorScheme={user.isActive ? "green" : "red"}>
                  {user.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  Miembro desde
                </Text>
                <Text fontWeight="medium">
                  {new Date(user.createdAt).toLocaleDateString("es-PE")}
                </Text>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
