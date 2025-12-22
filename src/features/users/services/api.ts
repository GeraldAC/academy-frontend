import { client } from "@/api/client";
import type {
  UpdateProfileDTO,
  UpdatePasswordDTO,
  User,
  CreateUserRequest,
  UsersListResponse,
  Schedule,
  CreateScheduleRequest,
  SchedulesListResponse,
  Course
} from "../types/types";
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
  return await client.put<User>(`/users/${id}/toggle-status`, {});
};

// ========== GESTIÓN DE HORARIOS ==========

// ========== GESTIÓN DE HORARIOS ==========

export const getSchedules = async (params?: {
  dayOfWeek?: string;
  courseId?: number;
}): Promise<SchedulesListResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.courseId) queryParams.append("courseId", params.courseId.toString());
  if (params?.dayOfWeek) queryParams.append("dayOfWeek", params.dayOfWeek);

  const query = queryParams.toString();
  return await client.get<SchedulesListResponse>(`/schedules${query ? `?${query}` : ""}`);
};

export const createSchedule = async (data: CreateScheduleRequest): Promise<Schedule> => {
  return await client.post<Schedule>("/schedules", data);
};

export const updateSchedule = async (id: number, data: Partial<CreateScheduleRequest>): Promise<Schedule> => {
  return await client.put<Schedule>(`/schedules/${id}`, data);
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await client.delete<void>(`/schedules/${id}`);
};

export const getCourses = async (): Promise<Course[]> => {
  return await client.get<Course[]>("/courses");
};

export const getTeachers = async (): Promise<User[]> => {
  try {
    const response = await client.get<any>("/users?role=TEACHER");
    console.log('[DEBUG] getTeachers raw response:', response);

    // Handle the specific structure returned by the UsersModule
    // expected: { success: true, data: { users: User[], pagination: ... } }
    if (response.data && Array.isArray(response.data.users)) {
      return response.data.users;
    }

    // Fallback for other potential structures
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response)) {
      return response;
    }

    return [];
  } catch (error) {
    console.error('[DEBUG] getTeachers error:', error);
    return [];
  }
};