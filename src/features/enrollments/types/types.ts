export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dni: string;
    phone: string | null;
  };
  course: {
    id: string;
    name: string;
    subject: string;
  };
}

export type EnrollmentStatus = "ACTIVE" | "CANCELLED" | "COMPLETED";

export interface CreateEnrollmentDTO {
  studentId: string;
  courseId: string;
  notes?: string;
}

export interface StudentOption {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
}

export interface EnrollmentResponse {
  enrollment: Enrollment;
  message: string;
}
