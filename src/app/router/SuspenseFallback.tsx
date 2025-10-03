import React from "react";
import { Box, Center, Text, VStack, useColorModeValue, Progress } from "@chakra-ui/react";
import { keyframes as emotionKeyframes } from "@emotion/react";

// Animación de pulso para el texto
const pulse = emotionKeyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

// Animación de rebote para el ícono
const bounce = emotionKeyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

export const SuspenseFallback: React.FC = () => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accent = useColorModeValue("blue.500", "blue.300");

  return (
    <Center h="100vh" w="100%" bg={useColorModeValue("gray.50", "gray.900")}>
      <VStack spacing={6}>
        {/* Ícono animado */}
        <Box fontSize="5xl" animation={`${bounce} 1.5s ease-in-out infinite`} color={accent}>
          🚀
        </Box>

        {/* Texto con animación de pulso */}
        <Text
          fontSize="lg"
          fontWeight="medium"
          color={textColor}
          animation={`${pulse} 2s ease-in-out infinite`}
        >
          Cargando contenido...
        </Text>

        {/* Barra de progreso animada */}
        <Box w="200px">
          <Progress size="sm" isIndeterminate colorScheme="blue" borderRadius="full" />
        </Box>
      </VStack>
    </Center>
  );
};
