import React from "react";
import { Center, Box, useColorModeValue } from "@chakra-ui/react";
import { keyframes as emotionKeyframes } from "@emotion/react";

// Rotación horaria
const rotateClockwise = emotionKeyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Rotación antihoraria
const rotateCounterClockwise = emotionKeyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

// Desvanecimiento y aparición
const fadeInOut = emotionKeyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

export const LoadingScreen: React.FC = () => {
  const bg = useColorModeValue("white", "gray.900");
  const redColor = useColorModeValue("red.500", "red.400");
  const yellowColor = useColorModeValue("yellow.400", "yellow.300");
  const grayColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Center h="100vh" w="100%" bg={bg}>
      <Box position="relative" w="100px" h="100px">
        {/* Spinner exterior - Rotación antihoraria lenta + fade */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          border="4px solid transparent"
          borderTopColor={redColor}
          borderRightColor={redColor}
          borderRadius="full"
          animation={`${rotateCounterClockwise} 2s linear infinite, ${fadeInOut} 3s ease-in-out infinite`}
        />

        {/* Spinner medio - Rotación horaria rápida */}
        <Box
          position="absolute"
          top="15%"
          left="15%"
          w="70%"
          h="70%"
          border="4px solid transparent"
          borderTopColor={yellowColor}
          borderLeftColor={yellowColor}
          borderRadius="full"
          animation={`${rotateClockwise} 1.2s linear infinite`}
        />

        {/* Spinner interior - Rotación antihoraria muy rápida + fade invertido */}
        <Box
          position="absolute"
          top="30%"
          left="30%"
          w="40%"
          h="40%"
          border="3px solid transparent"
          borderBottomColor={grayColor}
          borderRightColor={grayColor}
          borderRadius="full"
          animation={`${rotateCounterClockwise} 0.8s linear infinite, ${fadeInOut} 3s ease-in-out infinite reverse`}
        />
      </Box>
    </Center>
  );
};
