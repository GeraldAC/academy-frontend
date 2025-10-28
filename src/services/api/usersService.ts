// src/services/api/usersService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Configurar interceptor para agregar token automáticamente
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Tipos
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dni: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  phone?: string;
}

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
  isActive?: boolean;
}

export interface UsersFilters {
  role?: 'STUDENT' | 'TEACHER' | 'ADMIN';
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export const usersService = {
  createUser: async (data: CreateUserData) => {
    const response = await axios.post(`${API_URL}/users`, data);
    return response.data;
  },

  getUsers: async (filters?: UsersFilters) => {
    const params = new URLSearchParams();
    
    if (filters?.role) params.append('role', filters.role);
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await axios.get(`${API_URL}/users?${params.toString()}`);
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: UpdateUserData) => {
    const response = await axios.put(`${API_URL}/users/${id}`, data);
    return response.data;
  },

  toggleUserStatus: async (id: string) => {
    const response = await axios.patch(`${API_URL}/users/${id}/toggle-status`);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  },

  resetPassword: async (id: string, newPassword: string) => {
    const response = await axios.post(`${API_URL}/users/${id}/reset-password`, { newPassword });
    return response.data;
  },

  getUserStats: async () => {
    const response = await axios.get(`${API_URL}/users/stats`);
    return response.data;
  }
};