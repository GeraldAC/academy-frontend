import { create } from "zustand";

import type { AuthUser } from "@/features/auth/types/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const loadFromStorage = (): { user: AuthUser | null; token: string | null } => {
  try {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? (JSON.parse(userStr) as AuthUser) : null;
    return { user, token };
  } catch {
    return { user: null, token: null };
  }
};

export const useAuthStore = create<AuthState>((set) => {
  const { user, token } = loadFromStorage();

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login: (user, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, token, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});
