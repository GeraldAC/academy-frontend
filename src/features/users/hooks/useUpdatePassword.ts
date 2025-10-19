import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../services/api";
import type { UpdatePasswordDTO } from "../types/types";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (dto: UpdatePasswordDTO) => updatePassword(dto),
  });
};
