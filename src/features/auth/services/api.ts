import api from "@/api/axios";
import { AuthResponse, AuthUser } from "../types/auth";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
};

export const verifyToken = async (): Promise<boolean> => {
  try {
    const response = await api.get("/auth/verify");
    return response.data?.valid === true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

export const refreshToken = async (): Promise<{ newToken: string; user: AuthUser } | null> => {
  try {
    const response = await api.post("/auth/refresh");
    return response.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};
