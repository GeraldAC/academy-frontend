import { client } from "@/api/client";
import type { UpdateProfileDTO, UpdatePasswordDTO, User } from "../types/types";

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
