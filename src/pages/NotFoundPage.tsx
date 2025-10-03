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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdHome, MdSupport } from "react-icons/md";

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
  const accent = useColorModeValue("blue.500", "blue.300");

  return (
    <Box minH="100vh" bg={bg} position="relative" overflow="hidden">
      {/* Decorative gradient ribbon */}
      <Box
        position="absolute"
        top={{ base: "-40%", md: "-30%" }}
        left="-20%"
        w="140%"
        h="60%"
        bgGradient="linear(to-r, teal.400, blue.500, purple.500)"
        filter="blur(48px)"
        opacity={0.15}
        animation={`${shine} 16s ease-in-out infinite`}
      />
      <StarField />

      <Center minH="100vh" px={6} zIndex={1} position="relative">
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
            boxShadow="lg"
            p={{ base: 8, md: 10 }}
            textAlign="center"
            flex="1"
          >
            <VStack spacing={4}>
              <Heading
                as="h1"
                size="4xl"
                letterSpacing="tight"
                lineHeight="1"
                bgClip="text"
                bgGradient="linear(to-r, teal.400, blue.500)"
              >
                404
              </Heading>

              <Text fontSize="lg" color={subtle}>
                La página que buscas se perdió entre las rutas.
              </Text>

              <FloatingEmojis />

              <Text fontSize="sm" color={subtle} maxW="md">
                Puede que el enlace haya cambiado, esté temporalmente inactivo, o nunca existió.
                Vuelve al inicio o cuéntanos qué pasó.
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
                  colorScheme="blue"
                  size="md"
                >
                  Ir al inicio
                </Button>
                <Button
                  as={RouterLink}
                  to="/support"
                  leftIcon={<Icon as={MdSupport} />}
                  variant="outline"
                  size="md"
                >
                  Reportar problema
                </Button>
              </Flex>
            </VStack>
          </Box>

          {/* Accent side card */}
          <Box flex="1" bg={cardBg} borderRadius="2xl" boxShadow="lg" p={{ base: 6, md: 8 }}>
            <VStack align="start" spacing={4}>
              <Heading size="md">Sugerencias rápidas</Heading>
              <VStack align="start" spacing={2} color={subtle}>
                <Text>
                  • Revisa la URL — pequeñas diferencias importan: mayúsculas, guiones y barras.
                </Text>
                <Text>• Si llegaste desde otra sección, prueba volver y navegar nuevamente.</Text>
                <Text>• ¿Crees que esto es un error? Usa “Reportar problema”.</Text>
              </VStack>

              <Button
                as={RouterLink}
                to="/search"
                variant="ghost"
                colorScheme="blue"
                alignSelf="flex-start"
              >
                Buscar contenido
              </Button>

              <Text fontSize="xs" color={subtle}>
                Código: NF-{new Date().getFullYear()}-
                {String(new Date().getMonth() + 1).padStart(2, "0")}
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Center>

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
      >
        Ruta no encontrada
        <Box as="span" ml={2} color={accent}>
          *
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

/* ----- Helpers ----- */

const FloatingEmojis: React.FC = () => {
  const animation = `${float} 4s ease-in-out infinite`;
  const subtle = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex gap={3} justify="center" pt={2} color={subtle}>
      <Box fontSize="2xl" animation={animation}>
        🧭
      </Box>
      <Box fontSize="2xl" animation={`${float} 5s ease-in-out infinite`}>
        🗺️
      </Box>
      <Box fontSize="2xl" animation={`${float} 3.5s ease-in-out infinite`}>
        🚀
      </Box>
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
