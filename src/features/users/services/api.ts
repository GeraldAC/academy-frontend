import { client } from "@/api/client";
import type { UpdateProfileDTO, UpdatePasswordDTO, User,CreateUserRequest,UsersListResponse } from "../types/types";

// Obtener el perfil del usuario autenticado
export const getMyProfile = async (): Promise<User> => {
  return await client.get<User>("/users/me");
};

// Actualizar perfil (nombre, apellido, teléfono)
export const updateProfile = async (dto: UpdateProfileDTO): Promise<User> => {
  return await client.put<User>("/users/me", dto);
};

// Cambiar contraseña
export const updatePassword = async (dto: UpdatePasswordDTO): Promise<void> => {
  await client.put<void>("/users/me/password", dto);
};

// ... tus funciones existentes ...

// ========== GESTIÓN DE USUARIOS (ADMIN) ==========

// Obtener lista de usuarios (con paginación y filtros)
export const getUsers = async (params?: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
}): Promise<UsersListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.role) queryParams.append("role", params.role);
  if (params?.search) queryParams.append("search", params.search);

  const query = queryParams.toString();
  return await client.get<UsersListResponse>(`/users${query ? `?${query}` : ""}`);
};

// Crear nuevo usuario
export const createUser = async (data: CreateUserRequest): Promise<User> => {
  return await client.post<User>("/users", data);
};

// Obtener usuario por ID
export const getUserById = async (id: number): Promise<User> => {
  return await client.get<User>(`/users/${id}`);
};

// Actualizar usuario
export const updateUser = async (id: number, data: Partial<CreateUserRequest>): Promise<User> => {
  return await client.put<User>(`/users/${id}`, data);
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<void> => {
  await client.delete<void>(`/users/${id}`);
};

// Cambiar estado del usuario (activar/desactivar)
export const toggleUserStatus = async (id: number): Promise<User> => {
  return await client.put<User>(`/users/${id}/toggle-status`,{});
};
