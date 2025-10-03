import api from "@/api/axios";
import { AuthResponse, RegisterDTO } from "../types/auth";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
};

export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
};
