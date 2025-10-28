import axios from "@/api/axios";
import {
  Course,
  CreateCourseInput,
  UpdateCourseInput,
  CourseFilters,
  AvailableUser,
} from "../types/courses.types";

export const coursesService = {
  // Obtener todos los cursos con filtros opcionales
  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    const { data } = await axios.get<Course[]>("/courses", {
      params: filters,
    });
    return data;
  },

  // Obtener un curso por ID
  async getCourseById(id: string): Promise<Course> {
    const { data } = await axios.get<Course>(`/courses/${id}`);
    return data;
  },

  // Crear un nuevo curso
  async createCourse(input: CreateCourseInput): Promise<Course> {
    const { data } = await axios.post<Course>("/courses", input);
    return data;
  },

  // Actualizar un curso
  async updateCourse(id: string, input: UpdateCourseInput): Promise<Course> {
    const { data } = await axios.patch<Course>(`/courses/${id}`, input);
    return data;
  },

  // Desactivar un curso (soft delete)
  async deactivateCourse(id: string): Promise<Course> {
    const { data } = await axios.patch<Course>(`/courses/${id}`, {
      isActive: false,
    });
    return data;
  },

  // Obtener docentes activos para el selector
  async getAvailableUsers(role?: string, isActive?: boolean): Promise<AvailableUser[]> {
    const { data } = await axios.get<AvailableUser[]>("/courses/users/available", {
      params: { role, isActive },
    });
    return data;
  },

  async getAvailableSubjects(): Promise<string[]> {
    const { data } = await axios.get<string[]>("/courses/subjects/available");
    return data;
  },
};
