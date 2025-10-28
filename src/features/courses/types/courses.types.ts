export interface AvailableUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export interface Course {
  id: string;
  name: string;
  description: string | null;
  subject: string;
  teacherId: string;
  capacity: number;
  monthlyPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
  _count?: {
    enrollments: number;
  };
  availableCapacity?: number;
}

export interface CreateCourseInput {
  name: string;
  description?: string;
  subject: string;
  teacherId: string;
  capacity: number;
  monthlyPrice: number;
}

export interface UpdateCourseInput {
  name?: string;
  description?: string | null;
  subject?: string;
  teacherId?: string;
  capacity?: number;
  monthlyPrice?: number;
  isActive?: boolean;
}

export interface CourseFilters {
  subject?: string;
  isActive?: "true" | "false";
  teacherId?: string;
  search?: string;
}
