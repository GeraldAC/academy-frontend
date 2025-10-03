import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthResponse } from "../types/auth";

export const useLogin = () => {
  const { login: loginStore } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      loginStore(data.user, data.token);

      if (data.user.role === "ADMIN") navigate("/admin");
      else if (data.user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    },
  });
};
