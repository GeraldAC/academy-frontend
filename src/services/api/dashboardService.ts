// src/services/api/dashboardService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Interceptor para agregar el token a todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const dashboardService = {
  // Admin Dashboard
  admin: {
    getStats: async () => {
      const response = await axios.get(`${API_URL}/admin/dashboard/stats`);
      return response.data;
    },
    getEnrollmentTrend: async () => {
      const response = await axios.get(`${API_URL}/admin/dashboard/enrollment-trend`);
      return response.data;
    },
    getCoursesDistribution: async () => {
      const response = await axios.get(`${API_URL}/admin/dashboard/courses-distribution`);
      return response.data;
    },
    getTopCourses: async () => {
      const response = await axios.get(`${API_URL}/admin/dashboard/top-courses`);
      return response.data;
    },
    getRecentActivities: async () => {
      const response = await axios.get(`${API_URL}/admin/dashboard/recent-activities`);
      return response.data;
    },
    getRevenueData: async () => {
      const response = await axios.get(`${API_URL}/admin/dashboard/revenue`);
      return response.data;
    },
  },

  // Teacher Dashboard
  teacher: {
    getStats: async (teacherId: string) => {
      const response = await axios.get(`${API_URL}/teacher/dashboard/${teacherId}/stats`);
      return response.data;
    },
    getCourses: async (teacherId: string) => {
      const response = await axios.get(`${API_URL}/teacher/dashboard/${teacherId}/courses`);
      return response.data;
    },
    getEngagement: async (teacherId: string) => {
      const response = await axios.get(`${API_URL}/teacher/dashboard/${teacherId}/engagement`);
      return response.data;
    },
    getSubmissions: async (teacherId: string) => {
      const response = await axios.get(`${API_URL}/teacher/dashboard/${teacherId}/submissions`);
      return response.data;
    },
    getUpcomingClasses: async (teacherId: string) => {
      const response = await axios.get(
        `${API_URL}/teacher/dashboard/${teacherId}/upcoming-classes`
      );
      return response.data;
    },
    getMessages: async (teacherId: string) => {
      const response = await axios.get(`${API_URL}/teacher/dashboard/${teacherId}/messages`);
      return response.data;
    },
  },

  // Student Dashboard
  student: {
    getStats: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/stats`);
      return response.data;
    },
    getCourses: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/courses`);
      return response.data;
    },
    getProgressData: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/progress`);
      return response.data;
    },
    getAssignments: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/assignments`);
      return response.data;
    },
    getGrades: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/grades`);
      return response.data;
    },
    getAchievements: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/achievements`);
      return response.data;
    },
    getRecentActivity: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/activity`);
      return response.data;
    },
    getSkillsData: async (studentId: string) => {
      const response = await axios.get(`${API_URL}/student/dashboard/${studentId}/skills`);
      return response.data;
    },
  },
};
