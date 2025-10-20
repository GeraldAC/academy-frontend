import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Hook que asegura que la autenticación esté inicializada
 * Solo necesario si el store no se inicializó automáticamente
 */
export const useAuthCheck = () => {
  const { isInitialized, initializeAuth } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  return { isInitialized };
};
