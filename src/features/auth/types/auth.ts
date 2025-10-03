export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  role: Role;
  phone: string | null;
  isActive: boolean;
  createdAt: string; // ISO string en JSON
  updatedAt: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
  role: Role;
  phone?: string | null;
}
