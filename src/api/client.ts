import api from "./axios";

export const client = {
  get: <T>(url: string) => api.get<T>(url).then((res) => res.data),
  post: <T>(url: string, data: unknown) => api.post<T>(url, data).then((res) => res.data),
  put: <T>(url: string, data: unknown) => api.put<T>(url, data).then((res) => res.data),
  delete: <T>(url: string) => api.delete<T>(url).then((res) => res.data),
};
