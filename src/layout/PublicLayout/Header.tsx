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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { FaLock, FaInfoCircle, FaChevronUp, FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { roleRedirect } from "@/app/router/roleRedirect";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  const handleLoginClick = () => {
    if (isAuthenticated && user) {
      // Si está autenticado, ir a su dashboard
      roleRedirect(user.role, navigate);
    } else {
      // Si no está autenticado, ir a login
      navigate("/auth/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
                src="/OnlySymbolRec.png"
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

            {/* Botón de Login o Dashboard según autenticación */}
            {isAuthenticated && user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  colorScheme="red"
                  variant="solid"
                  rightIcon={<FaChevronDown />}
                >
                  <HStack spacing={2}>
                    <Avatar size="xs" name={`${user.firstName} ${user.lastName}`} />
                    <Text>{user.firstName}</Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLoginClick}>Ir a mi Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                leftIcon={<FaLock />}
                colorScheme="red"
                variant={isActiveRoute("/auth/login") ? "solid" : "outline"}
                onClick={handleLoginClick}
              >
                Iniciar Sesión
              </Button>
            )}

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
