import { useQuery } from "@tanstack/react-query";
import { coursesService } from "../services/courses.service";

export const useMyCourses = () => {
  return useQuery({
    queryKey: ["my-courses"],
    queryFn: () => coursesService.getMyCourses(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
