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

export const useAuthStore = create<AuthState>((set, get) => {
  const { user, token } = loadFromStorage();

  // Auto-inicializar al crear el store
  const initializeAuth = async () => {
    const { token, user, isInitialized } = get();

    // Si ya se inicializó, no hacer nada
    if (isInitialized) return;

    // Si no hay token o user en storage, marcar como inicializado
    if (!token || !user) {
      set({ isInitialized: true, isAuthenticated: false });
      return;
    }

    try {
      const isValid = await verifyTokenService();

      if (!isValid) {
        clearStorage();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      } else {
        set({ isAuthenticated: true, isInitialized: true });
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

  // Inicializar automáticamente si hay token
  if (token && user) {
    initializeAuth();
  }

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isInitialized: !token || !user, // Si no hay token, ya está inicializado

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
