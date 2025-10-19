import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/api";
import { useAuthStore } from "@/stores/useAuthStore";
import type { UpdateProfileDTO } from "../types/types";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user, login } = useAuthStore();

  return useMutation({
    mutationFn: (dto: UpdateProfileDTO) => updateProfile(dto),
    onSuccess: (updatedUser) => {
      // Actualizar el store de autenticación con los nuevos datos
      const currentToken = useAuthStore.getState().token;
      if (user && currentToken) {
        login(
          {
            ...user,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone ?? null,
          },
          currentToken
        );
      }
      // Invalidar query del perfil para refrescar datos
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
