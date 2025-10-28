import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoadingScreen } from "@/components/common/LoadingScreen";

interface GuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated, user, isInitialized } = useAuthStore();

  // Esperar a que se inicialice
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // Si está autenticado, redirigir a su dashboard según el rol
  if (isAuthenticated && user) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "TEACHER":
        return <Navigate to="/teacher" replace />;
      case "STUDENT":
        return <Navigate to="/student" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Usuario no autenticado puede acceder
  return <>{children}</>;
};
