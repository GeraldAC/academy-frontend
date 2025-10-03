import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function DashboardAdmin() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Box p={8}>
      <Heading>Dashboard Estudiante</Heading>
      <Text mt={4}>Bienvenido {user?.email ?? "usuario"}</Text>
      <Button mt={6} colorScheme="red" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Box>
  );
}
