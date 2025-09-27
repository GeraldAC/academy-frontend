import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth_user") || "null") : null;

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    navigate("/login");
  };

  return (
    <Box p={8}>
      <Heading>Dashboard</Heading>
      <Text mt={4}>Bienvenido {user?.email ?? "usuario"}</Text>
      <Button mt={6} colorScheme="red" onClick={logout}>
        Cerrar sesión
      </Button>
    </Box>
  );
}
