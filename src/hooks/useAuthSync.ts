import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Hook para sincronizar el estado de autenticación entre pestañas
 * Detecta cuando se hace logout en otra pestaña y actualiza el estado
 */
export const useAuthSync = () => {
  const { logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Si se eliminó el token en otra pestaña, hacer logout en esta
      if (e.key === "token" && e.newValue === null && isAuthenticated) {
        logout();
        window.location.href = "/auth/login";
      }

      // Si se agregó un token en otra pestaña, recargar la página
      if (e.key === "token" && e.newValue !== null && !isAuthenticated) {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [logout, isAuthenticated]);
};
