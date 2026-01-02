// src/features/reservations/types/index.ts
export interface Reservation {
  id: string;
  studentId: string;
  courseId: string;
  classDate: string;
  notes?: string;
  isCancelled: boolean;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  course?: {
    name: string;
    subject: string;
    teacher?: {
      firstName: string;
      lastName: string;
    };
  };
  student?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}

export interface CreateReservationDto {
  courseId: string;
  classDate: string;
  notes?: string;
}

// -- Payments

export type PaymentStatus = "PENDING" | "PAID" | "OVERDUE";

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  concept: string;
  paymentDate: string;
  dueDate?: string;
  status: PaymentStatus;
  paymentMethod?: string;
  receiptNumber?: string;
  notes?: string;
  recordedBy?: string;
  createdAt: string;
  updatedAt: string;
  student?: {
    firstName: string;
    lastName: string;
    email: string;
    dni: string;
  };
  recorder?: {
    firstName: string;
    lastName: string;
  };
}

export interface CreatePaymentDto {
  studentId: string;
  amount: number;
  concept: string;
  dueDate?: string;
  paymentMethod?: string;
  notes?: string;
  status?: PaymentStatus;
}

export interface UpdatePaymentDto {
  amount?: number;
  concept?: string;
  dueDate?: string;
  status?: PaymentStatus;
  paymentMethod?: string;
  receiptNumber?: string;
  notes?: string;
}

export interface PaymentFilters {
  status?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
}

// -- Enrollments

interface Schedule {
  id: string | number;
  classType: string;
  isActive: boolean;
  weekDay: string;
  startTime: string;
  endTime: string;
  classroom?: string;
}

interface Course {
  id: string | number;
  name: string;
  subject: string;
  schedules?: Schedule[];
}

export interface Enrollment {
  course: Course;
  status: string;
}
