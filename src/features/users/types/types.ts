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
