import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export const useAuthCheck = () => {
  const { isInitialized, initializeAuth } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  return { isInitialized };
};
