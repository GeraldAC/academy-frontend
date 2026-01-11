// src/features/attendance/pages/AttendanceStudentPage.tsx
import { useState } from "react";
import {
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useStudentAttendance } from "../hooks/useAttendance";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { downloadStudentAttendancePDF } from "../utils/pdfDownload";
import { useToast } from "@chakra-ui/react";

const AttendanceStudentPage = () => {
  const user = useAuthStore((state) => state.user);
  const { courses } = useCourses();
  const toast = useToast();

  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);

  // Obtener datos de asistencia CON FILTROS DE FECHA
  const { history, isLoadingHistory, stats, isLoadingStats, refetch } = useStudentAttendance(
    user?.id || "",
    selectedCourse === "all" ? undefined : selectedCourse,
    dateRange.startDate,
    dateRange.endDate
  );

  // Cursos del estudiante (el backend debería filtrarlos automáticamente)
  const myCourses = courses || [];

  // Función para generar PDF
  const handleDownloadPDF = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "No se pudo identificar al usuario",
        status: "error",
        duration: 3000,
      });
      return;
    }

    if (!stats || stats.totalClasses === 0) {
      toast({
        title: "No hay datos",
        description: "No tienes registros de asistencia para descargar",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setIsDownloading(true);
    try {
      await downloadStudentAttendancePDF(user.id, {
        courseId: selectedCourse === "all" ? undefined : selectedCourse,
        startDate: dateRange.startDate || undefined,
        endDate: dateRange.endDate || undefined,
      });

      toast({
        title: "✅ PDF descargado",
        description: "Tu reporte de asistencia se ha descargado correctamente",
        status: "success",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error al descargar PDF",
        description: error.message || "No se pudo descargar el PDF",
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Función para refrescar datos
  const handleRefresh = () => {
    refetch();
  };

  // Función para limpiar filtros
  const handleClearFilters = () => {
    setSelectedCourse("all");
    setDateRange({ startDate: "", endDate: "" });
  };

  // Función para obtener color según porcentaje
  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600 bg-green-100";
    if (rate >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Obtener mensaje de estado
  const getAttendanceMessage = (rate: number) => {
    if (rate >= 90) return "¡Excelente asistencia! Sigue así 🎉";
    if (rate >= 75) return "Buena asistencia, pero puedes mejorar 👍";
    return "Necesitas mejorar tu asistencia ⚠️";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Asistencia</h1>
                <p className="text-sm text-gray-600">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading || !stats || stats.totalClasses === 0}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Descargando..." : "Descargar PDF"}
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Filtros</h3>
              </div>
              {(selectedCourse !== "all" || dateRange.startDate || dateRange.endDate) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Curso</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">Todos los cursos</option>
                  {myCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} - {course.subject}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  min={dateRange.startDate || undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? (
                <span className="animate-pulse">...</span>
              ) : (
                stats?.totalClasses || 0
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Clases totales</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Presentes</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? (
                <span className="animate-pulse">...</span>
              ) : (
                stats?.presentClasses || 0
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Asistencias</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Ausentes</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? (
                <span className="animate-pulse">...</span>
              ) : (
                stats?.absentClasses || 0
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Inasistencias</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Porcentaje</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {isLoadingStats ? (
                <span className="animate-pulse">...</span>
              ) : (
                `${stats?.attendanceRate?.toFixed(1) || 0}%`
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Asistencia</p>
          </div>
        </div>

        {/* Barra de progreso con mensaje motivacional */}
        {stats && stats.totalClasses > 0 && (
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

            <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  stats.attendanceRate >= 90
                    ? "bg-green-500"
                    : stats.attendanceRate >= 75
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${Math.min(stats.attendanceRate, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mb-3">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>

            {/* Mensaje motivacional */}
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                stats.attendanceRate >= 90
                  ? "bg-green-50"
                  : stats.attendanceRate >= 75
                    ? "bg-yellow-50"
                    : "bg-red-50"
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 ${
                  stats.attendanceRate >= 90
                    ? "text-green-600"
                    : stats.attendanceRate >= 75
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  stats.attendanceRate >= 90
                    ? "text-green-700"
                    : stats.attendanceRate >= 75
                      ? "text-yellow-700"
                      : "text-red-700"
                }`}
              >
                {getAttendanceMessage(stats.attendanceRate)}
              </p>
            </div>
          </div>
        )}

        {/* Mensaje si no hay datos */}
        {stats && stats.totalClasses === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <p className="text-blue-700 font-medium">Aún no tienes registros de asistencia</p>
            <p className="text-blue-600 text-sm mt-1">
              Los registros aparecerán aquí cuando tu profesor registre la asistencia
            </p>
          </div>
        )}

        {/* Historial de Asistencia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Historial de Clases
              {history && history.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({history.length} {history.length === 1 ? "registro" : "registros"})
                </span>
              )}
            </h3>
            {(dateRange.startDate || dateRange.endDate) && history && history.length > 0 && (
              <span className="text-sm text-gray-600">
                Filtrado {dateRange.startDate && `desde ${dateRange.startDate}`}
                {dateRange.endDate && ` hasta ${dateRange.endDate}`}
              </span>
            )}
          </div>

          {isLoadingHistory ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className="text-gray-600">Cargando historial...</p>
            </div>
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
                      Observaciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {format(new Date(record.classDate), "dd/MM/yyyy", { locale: es })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {record.course?.name}
                          </div>
                          <div className="text-xs text-gray-500">{record.course?.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.present ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Presente
                          </span>
                        ) : record.notes?.toUpperCase().includes("PERMISO") ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Permiso
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
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-medium">No hay registros de asistencia</p>
              <p className="text-gray-400 text-sm mt-1">
                {selectedCourse !== "all" || dateRange.startDate || dateRange.endDate
                  ? "Intenta cambiar los filtros para ver más resultados"
                  : "Los registros aparecerán aquí cuando se registre tu asistencia"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceStudentPage;
