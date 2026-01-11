//src\features\attendance\pages\AttendanceStatsPage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Filter, RefreshCw, TrendingUp } from "lucide-react";
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

  const {
    data: stats,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["attendance-stats", selectedCourse, dateRange],
    queryFn: () =>
      attendanceService.getStats({
        courseId: selectedCourse === "all" ? undefined : selectedCourse,
        startDate: dateRange.startDate || undefined,
        endDate: dateRange.endDate || undefined,
      }),
    // Refetch cuando el componente se monta para asegurar datos frescos
    refetchOnMount: "always",
    // Refetch cuando la ventana se enfoca
    refetchOnWindowFocus: true,
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleClearFilters = () => {
    setSelectedCourse("all");
    setDateRange({ startDate: "", endDate: "" });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Estadísticas de Asistencia</h1>
            <p className="text-gray-600">Resumen general de asistencia y participación</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
          {(selectedCourse !== "all" || dateRange.startDate || dateRange.endDate) && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Curso</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            >
              <option value="all">Todos los cursos</option>
              {courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} - {course.subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha inicio</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha fin</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              min={dateRange.startDate || undefined}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button
            onClick={handleRefresh}
            disabled={isFetching}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {isLoading && !stats ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      ) : stats ? (
        <>
          {/* Indicador de datos actualizados */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>
              Datos actualizados{" "}
              {selectedCourse !== "all" ? "para el curso seleccionado" : "para todos los cursos"}
              {dateRange.startDate && ` desde ${dateRange.startDate}`}
              {dateRange.endDate && ` hasta ${dateRange.endDate}`}
            </span>
          </div>

          <AttendanceStatsCard stats={stats} isLoading={isLoading} />
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700">No se pudieron cargar las estadísticas</p>
          <button
            onClick={handleRefresh}
            className="mt-3 text-sm text-yellow-600 hover:text-yellow-700 hover:underline"
          >
            Intentar nuevamente
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceStatsPage;
