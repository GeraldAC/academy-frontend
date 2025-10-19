import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../services/api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
