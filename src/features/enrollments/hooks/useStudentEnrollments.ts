import { useQuery } from "@tanstack/react-query";
import { enrollmentsService } from "../services/api";

export const useStudentEnrollments = () => {
    return useQuery({
        queryKey: ["my-enrollments"],
        queryFn: () => enrollmentsService.getMyEnrollments(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
