import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../services/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthResponse } from "../types/auth";
import { roleRedirect } from "@/app/router/roleRedirect";

export const useLogin = () => {
  const { login: loginStore } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      // Guardar en store y localStorage
      loginStore(data.user, data.token);

      // Verificar si hay una ruta previa a la que redirigir
      const from = location.state?.from?.pathname;

      if (from && from !== "/auth/login") {
        // Si venía de una ruta protegida válida, redirigir ahí
        navigate(from, { replace: true });
      } else {
        // Si no, redirigir según el rol
        roleRedirect(data.user.role, navigate);
      }
    },
    onError: (error) => {
      console.error("Login error:", error.message);
      // Aquí puedes agregar manejo de errores (toast, alert, etc.)
    },
  });
};
