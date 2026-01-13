// Tus interfaces existentes...
export interface UpdateProfileDTO {
  firstName: string;
  lastName: string;
  phone?: string | null;
}

export interface UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone?: string | null;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  firstName: string;
  lastName: string;
  dni?: string;
  phone?: string;
}

export interface UsersListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

// ========== HORARIOS (NUEVOS) ==========

export interface Schedule {
  id: string;
  courseId: string;
  teacherId: string;
  dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string;
  endTime: string;
  classroom?: string;

  course?: {
    id: number;
    name: string;
    code: string;
    subject: string;
  };
  teacher?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleRequest {
  courseId: string | number;
  teacherId: string | number;
  dayOfWeek: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string;
  endTime: string;
  classroom?: string;
}

export interface Course {
  id: number;
  name: string;
  code?: string; // Opcional
  subject?: string; // Agregar esto
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SchedulesListResponse {
  data: Schedule[];
  total: number;
}
