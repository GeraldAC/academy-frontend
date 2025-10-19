import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";

import { FaLock, FaInfoCircle } from "react-icons/fa";
import { FaChevronUp, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <Box as="header" bg="white" shadow="sm" py={4} position="sticky" top={0} zIndex={10}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={3}>
            <Box
              w="40px"
              h="40px"
              bg="red.600"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src="../../public/OnlySymbolRec.png"
                alt="El Gran Andino Logo"
                h="40px"
                w="auto"
                borderRadius="md"
              />
            </Box>
            <VStack spacing={0} align="start">
              <Heading size="md" color="red.600">
                El Gran Andino
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Centro Preuniversitario
              </Text>
            </VStack>
          </HStack>

          <HStack spacing={4}>
            {showBackButton && (
              <Button
                leftIcon={<FaArrowLeft />}
                colorScheme="red"
                variant="ghost"
                onClick={() => navigate("/")}
              >
                Volver al Inicio
              </Button>
            )}

            <Button
              leftIcon={<FaChevronUp />}
              colorScheme="red"
              variant={isActiveRoute("/") ? "solid" : "ghost"}
              onClick={scrollToTop}
            >
              Inicio
            </Button>

            <Button
              leftIcon={<FaLock />}
              colorScheme="red"
              variant={isActiveRoute("/auth/login") ? "solid" : "outline"}
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>

            <Button
              leftIcon={<FaInfoCircle />}
              colorScheme="red"
              variant={isActiveRoute("/about") ? "solid" : "outline"}
              onClick={() => navigate("/about")}
            >
              Sobre Nosotros
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
