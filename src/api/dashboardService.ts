import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const dashboardService = {
  // Admin
  getAdminStats: async () => {
    const response = await axios.get(`${API_URL}/admin/stats`);
    return response.data;
  },

  // Teacher
  getTeacherStats: async (teacherId: string) => {
    const response = await axios.get(`${API_URL}/teacher/${teacherId}/stats`);
    return response.data;
  },

  // Student
  getStudentStats: async (studentId: string) => {
    const response = await axios.get(`${API_URL}/student/${studentId}/stats`);
    return response.data;
  },
};
