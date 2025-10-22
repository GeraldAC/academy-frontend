import { create } from "zustand";
import type { AuthUser } from "@/features/auth/types/auth";
import { verifyToken as verifyTokenService } from "@/features/auth/services/api";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

// Helpers locales
const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const loadFromStorage = (): { user: AuthUser | null; token: string | null } => {
  try {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? (JSON.parse(userStr) as AuthUser) : null;
    return { user, token };
  } catch {
    clearStorage();
    return { user: null, token: null };
  }
};

// Store Zustand
export const useAuthStore = create<AuthState>((set, get) => {
  const { user, token } = loadFromStorage();

  const initializeAuth = async () => {
    const state = get();

    // Evitar múltiples inicializaciones
    if (state.isInitialized) return;

    // Si no hay token ni user almacenado → marcar como no autenticado
    if (!state.token || !state.user) {
      set({ isInitialized: true, isAuthenticated: false });
      return;
    }

    try {
      // Verifica el token con el backend
      const isValid = await verifyTokenService();

      if (isValid) {
        set({
          isAuthenticated: true,
          isInitialized: true,
        });
      } else {
        clearStorage();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      clearStorage();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  };

  // Retor el estado inicial del store
  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isInitialized: false, // Siempre parte en "no inicializado"

    login: (user, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isInitialized: true });
    },

    logout: () => {
      clearStorage();
      set({ user: null, token: null, isAuthenticated: false });
    },

    initializeAuth,
  };
});
