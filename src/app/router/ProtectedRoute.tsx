import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "TEACHER" | "STUDENT";
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isInitialized } = useAuthStore();
  const location = useLocation();

  // Esperar a que se inicialice la autenticación
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Si hay un rol requerido y el usuario no lo tiene, redirigir a su dashboard
  if (requiredRole && user.role !== requiredRole) {
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

  // Usuario autenticado con el rol correcto
  return <>{children}</>;
};
