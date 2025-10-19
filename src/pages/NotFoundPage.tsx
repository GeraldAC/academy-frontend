import React from "react";
import { keyframes } from "@emotion/react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdHome, MdSupport, MdArrowBack } from "react-icons/md";
import { FaCompass, FaGlobeAmericas, FaRocket } from "react-icons/fa";
import Layout from "@/components/layout/PublicLayout/Layout";

// Animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const shine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const NotFoundPage: React.FC = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const subtle = useColorModeValue("gray.600", "gray.300");
  const accent = useColorModeValue("red.500", "red.300");

  return (
    <Layout showBackButton={true}>
      <Box
        minH="70vh"
        bg={bg}
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
      >
        {/* Decorative gradient ribbon */}
        <Box
          position="absolute"
          top={{ base: "-40%", md: "-30%" }}
          left="-20%"
          w="140%"
          h="60%"
          bgGradient="linear(to-r, red.400, yellow.400, red.500)"
          filter="blur(48px)"
          opacity={0.15}
          animation={`${shine} 16s ease-in-out infinite`}
        />
        <StarField />

        <Container maxW="container.xl">
          <Center px={6} zIndex={1} position="relative">
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={8}
              align="center"
              w="full"
              maxW="1000px"
            >
              {/* Playful 404 badge */}
              <Box
                bg={cardBg}
                borderRadius="2xl"
                boxShadow="xl"
                p={{ base: 8, md: 10 }}
                textAlign="center"
                flex="1"
                border="1px"
                borderColor="gray.100"
              >
                <VStack spacing={4}>
                  <Heading
                    as="h1"
                    size="4xl"
                    letterSpacing="tight"
                    lineHeight="1"
                    bgClip="text"
                    bgGradient="linear(to-r, red.400, red.600)"
                  >
                    404
                  </Heading>

                  <Text fontSize="lg" color={subtle}>
                    La página que buscas se perdió entre las rutas.
                  </Text>

                  <FloatingEmojis />

                  <Text fontSize="sm" color={subtle} maxW="md">
                    Puede que el enlace haya cambiado, esté temporalmente inactivo, o nunca existió.
                    Vuelve al inicio o contáctanos para reportar el problema.
                  </Text>

                  <Flex
                    gap={3}
                    direction={{ base: "column", sm: "row" }}
                    w="full"
                    justify="center"
                    pt={2}
                  >
                    <Button
                      as={RouterLink}
                      to="/"
                      leftIcon={<Icon as={MdHome} />}
                      colorScheme="red"
                      size="md"
                    >
                      Ir al inicio
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/about"
                      leftIcon={<Icon as={MdSupport} />}
                      variant="outline"
                      colorScheme="red"
                      size="md"
                    >
                      Contactar soporte
                    </Button>
                  </Flex>
                </VStack>
              </Box>

              {/* Accent side card */}
              <Box
                flex="1"
                bg={cardBg}
                borderRadius="2xl"
                boxShadow="xl"
                p={{ base: 6, md: 8 }}
                border="1px"
                borderColor="gray.100"
              >
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="red.600">
                    Sugerencias rápidas
                  </Heading>
                  <VStack align="start" spacing={2} color={subtle}>
                    <Text>
                      • Revisa la URL — pequeñas diferencias importan: mayúsculas, guiones y barras.
                    </Text>
                    <Text>
                      • Si llegaste desde otra sección, prueba volver y navegar nuevamente.
                    </Text>
                    <Text>• ¿Crees que esto es un error? Contacta al equipo de soporte.</Text>
                  </VStack>

                  <Button
                    as={RouterLink}
                    to="/auth/login"
                    variant="ghost"
                    colorScheme="red"
                    alignSelf="flex-start"
                    leftIcon={<Icon as={MdArrowBack} />}
                  >
                    Volver al Login
                  </Button>

                  <Text fontSize="xs" color={subtle}>
                    El Gran Andino - Código: NF-{new Date().getFullYear()}-
                    {String(new Date().getMonth() + 1).padStart(2, "0")}
                  </Text>
                </VStack>
              </Box>
            </Flex>
          </Center>
        </Container>

        {/* Corner badge */}
        <Box
          position="fixed"
          bottom={4}
          right={4}
          px={3}
          py={2}
          borderRadius="md"
          bg={cardBg}
          boxShadow="md"
          fontSize="xs"
          color={subtle}
          border="1px"
          borderColor="gray.200"
        >
          Ruta no encontrada
          <Box as="span" ml={2} color={accent}>
            *
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default NotFoundPage;

/* ----- Helpers ----- */

const FloatingEmojis: React.FC = () => {
  const animation = `${float} 4s ease-in-out infinite`;
  const subtle = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex gap={3} justify="center" pt={2} color={subtle}>
      <Icon as={FaCompass} boxSize={7} color="red.600" animation={animation} />
      <Icon
        as={FaGlobeAmericas}
        boxSize={7}
        color="yellow.500" // dorado
        animation={`${float} 5s ease-in-out infinite`}
      />
      <Icon
        as={FaRocket}
        boxSize={7}
        color="gray.700" // negro/gris oscuro
        animation={`${float} 3.5s ease-in-out infinite`}
      />
    </Flex>
  );
};

const StarField: React.FC = () => {
  const starColor = useColorModeValue("rgba(0,0,0,0.05)", "rgba(255,255,255,0.06)");

  return (
    <Box
      position="absolute"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundImage: `
          radial-gradient(${starColor} 1px, transparent 1px),
          radial-gradient(${starColor} 1px, transparent 1px)
        `,
        backgroundPosition: "0 0, 20px 20px",
        backgroundSize: "40px 40px",
      }}
    />
  );
};
