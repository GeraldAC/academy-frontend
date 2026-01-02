export interface AvailableUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  dni?: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}
export interface Schedule {
  id: string;
  courseId: string;
  weekDay: WeekDay;
  startTime: string;
  endTime: string;
  classType: ClassType;
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
  teacher?: Teacher;
  availableCapacity?: number;
  _count?: {
    enrollments: number;
  };
  schedules?: Schedule[];
}

export type WeekDay = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

export type ClassType = "REGULAR" | "REINFORCEMENT";

export interface MyCoursesResponse {
  courses: Course[];
  total: number;
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
