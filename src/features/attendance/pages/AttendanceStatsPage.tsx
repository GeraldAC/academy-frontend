import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Filter, RefreshCw } from "lucide-react";
import { attendanceService } from "../services/api";
import { AttendanceStatsCard } from "../components/AttendanceStatsCard";
import { useCourses } from "@/features/courses/hooks/useCourses";

const AttendanceStatsPage = () => {
    const { courses } = useCourses();
    const [selectedCourse, setSelectedCourse] = useState<string>("all");
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
    });

    const { data: stats, isLoading, refetch } = useQuery({
        queryKey: ["attendance-stats", selectedCourse, dateRange],
        queryFn: () =>
            attendanceService.getStats({
                courseId: selectedCourse === "all" ? undefined : selectedCourse,
                startDate: dateRange.startDate || undefined,
                endDate: dateRange.endDate || undefined,
            }),
    });

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Estadísticas de Asistencia</h1>
                <p className="text-gray-600">Resumen general de asistencia y participación</p>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Filter className="w-4 h-4 inline mr-1" />
                            Curso
                        </label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="all">Todos los cursos</option>
                            {courses?.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input
                            type="date"
                            value={dateRange.startDate}
                            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                            type="date"
                            value={dateRange.endDate}
                            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Actualizar
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            {stats && <AttendanceStatsCard stats={stats} isLoading={isLoading} />}
        </div>
    );
};

export default AttendanceStatsPage;
