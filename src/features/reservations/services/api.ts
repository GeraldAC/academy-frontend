// src/features/reservations/services/api.ts
import axios from "@/api/axios";
import {
  Reservation,
  CreateReservationDto,
  Payment,
  CreatePaymentDto,
  UpdatePaymentDto,
  PaymentFilters,
  Enrollment,
} from "../types";

export const reservationsApi = {
  create: async (data: CreateReservationDto): Promise<Reservation> => {
    const response = await axios.post("/reservations", data);
    return response.data.data;
  },

  getMyReservations: async (): Promise<Reservation[]> => {
    const response = await axios.get("/reservations/my-reservations");
    return response.data.data;
  },

  cancel: async (id: string): Promise<Reservation> => {
    const response = await axios.patch(`/reservations/${id}/cancel`);
    return response.data.data;
  },

  getTeacherCourseReservations: async (courseId: string): Promise<Reservation[]> => {
    const response = await axios.get(`/reservations/teacher/courses/${courseId}`);
    return response.data.data;
  },

  getAllTeacherReservations: async (): Promise<Reservation[]> => {
    const response = await axios.get("/reservations/teacher/all");
    return response.data.data;
  },

  getAllReservations: async (): Promise<Reservation[]> => {
    const response = await axios.get("/reservations/admin/all");
    return response.data.data;
  },
};

export const paymentsApi = {
  create: async (data: CreatePaymentDto): Promise<Payment> => {
    const response = await axios.post("/reservations/payments", data);
    return response.data.data;
  },

  getAll: async (filters?: PaymentFilters): Promise<Payment[]> => {
    const response = await axios.get("/reservations/payments", { params: filters });
    return response.data.data;
  },

  getById: async (id: string): Promise<Payment> => {
    const response = await axios.get(`/reservations/payments/${id}`);
    return response.data.data;
  },

  update: async (id: string, data: UpdatePaymentDto): Promise<Payment> => {
    const response = await axios.patch(`/reservations/payments/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`/reservations/payments/${id}`);
  },

  getMyPayments: async (): Promise<Payment[]> => {
    const response = await axios.get("/reservations/payments/student/my-payments");
    return response.data.data;
  },
};

export const enrollmentsApi = {
  getMyEnrollments: async (): Promise<Enrollment[]> => {
    const response = await axios.get("/reservations/my-enrollments");
    return response.data.data;
  },
};
