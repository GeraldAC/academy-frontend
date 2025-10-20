import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { Spinner, Box } from "@chakra-ui/react";

/**
 * Componente que redirige al usuario a su dashboard según su rol
 * Si no está autenticado, lo envía a login
 */
export const AuthRedirect = () => {
  const { isAuthenticated, user, isInitialized } = useAuthStore();

  // Esperar a que se inicialice
  if (!isInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  // Si no está autenticado, ir a login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirigir según el rol
  switch (user.role) {
    case "ADMIN":
      return <Navigate to="/admin" replace />;
    case "TEACHER":
      return <Navigate to="/teacher" replace />;
    case "STUDENT":
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/auth/login" replace />;
  }
};
