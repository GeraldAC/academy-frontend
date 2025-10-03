import { Outlet } from "react-router-dom";
import { Box, Heading, Flex, Text, useColorModeValue, VStack, Icon } from "@chakra-ui/react";
import { SiCyberdefenders } from "react-icons/si";

export function AuthLayout() {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, gray.100)",
    "linear(to-br, gray.900, gray.800)"
  );

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient={bgGradient} px={4}>
      <Box bg={cardBg} boxShadow={cardShadow} borderRadius="xl" p={8} my={8} w="full" maxW="md">
        <VStack spacing={6} align="center">
          {/* Logo opcional */}
          <Icon as={SiCyberdefenders} boxSize="60px" color="teal.400" />

          <Box textAlign="center">
            <Heading size="lg" mb={1}>
              Bienvenido a Academia
            </Heading>
            <Text fontSize="md" color="gray.500">
              Inicia sesión o regístrate para continuar
            </Text>
          </Box>
          <Box w="100%">
            <Outlet />
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default AuthLayout;
