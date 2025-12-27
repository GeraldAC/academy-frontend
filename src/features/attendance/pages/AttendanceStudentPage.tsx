import { useState } from "react";
import {
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  BarChart3,
  Download,
  Filter,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useStudentAttendance, useAttendanceReport } from "../hooks/useAttendance";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AttendanceStudentPage = () => {
  const user = useAuthStore((state) => state.user);
  const { courses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Obtener datos de asistencia
  const { history, isLoadingHistory, stats, isLoadingStats } = useStudentAttendance(
    user?.id || "",
    selectedCourse === "all" ? undefined : selectedCourse
  );

  // Obtener datos para reporte PDF
  const { report, isLoadingReport } = useAttendanceReport({
    studentId: user?.id,
    courseId: selectedCourse === "all" ? undefined : selectedCourse,
    startDate: dateRange.startDate ? new Date(dateRange.startDate).toISOString() : undefined,
    endDate: dateRange.endDate ? new Date(dateRange.endDate).toISOString() : undefined,
  });

  // Mostrar todos los cursos (el backend filtrará los del estudiante)
  const myCourses = courses || [];

  // Función para generar PDF (placeholder)
  const handleDownloadPDF = () => {
    if (!report) return;
    alert("Función de descarga PDF - Por implementar");
    console.log("Datos del reporte:", report);
  };

  // Función para obtener color según porcentaje
  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600 bg-green-100";
    if (rate >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Asistencia</h1>
                <p className="text-sm text-gray-600"></p>
              </div>
            </div>
            <Button
              onClick={handleDownloadPDF}
              disabled={isLoadingReport || !report}
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar PDF
            </Button>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Curso
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los cursos</option>
                {myCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? "..." : stats?.totalClasses || 0}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Clases totales</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Presentes</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? "..." : stats?.presentClasses || 0}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Asistencias</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Ausentes</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? "..." : stats?.absentClasses || 0}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Inasistencias</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Porcentaje</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? "..." : `${stats?.attendanceRate.toFixed(1) || 0}%`}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Asistencia</p>
          </div>
        </div>

        {/* Barra de progreso */}
        {stats && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Progreso de Asistencia</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(
                  stats.attendanceRate
                )}`}
              >
                {stats.attendanceRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  stats.attendanceRate >= 90
                    ? "bg-green-500"
                    : stats.attendanceRate >= 75
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${stats.attendanceRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Historial de Asistencia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Historial de Clases ({history?.length || 0})
          </h3>

          {isLoadingHistory ? (
            <div className="text-center py-8 text-gray-500">Cargando historial...</div>
          ) : history && history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notas
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(record.classDate), "dd/MM/yyyy", { locale: es })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.course?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.present ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Presente
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle className="w-4 h-4 mr-1" />
                            Ausente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{record.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay registros de asistencia disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceStudentPage;
