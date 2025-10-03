import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { AuthResponse, RegisterDTO } from "../types/auth";

export const useRegister = () => {
  const { login: loginStore } = useAuthStore();
  const navigate = useNavigate();

  return useMutation<AuthResponse, Error, RegisterDTO>({
    mutationFn: (data) => register(data),
    onSuccess: (data) => {
      loginStore(data.user, data.token);

      if (data.user.role === "ADMIN") navigate("/admin");
      else if (data.user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    },
  });
};
