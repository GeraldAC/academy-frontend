// src/features/attendance/pages/StudentHistoryPage.tsx
import { useState } from "react";
import {
  Users,
  Calendar,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Search,
} from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useQuery } from "@tanstack/react-query";
import { enrollmentsService } from "@/features/enrollments/services/api";
import { useStudentAttendance } from "../hooks/useAttendance";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { downloadStudentAttendancePDF } from "../utils/pdfDownload";
import { useToast } from "@chakra-ui/react";

const StudentHistoryPage = () => {
  const user = useAuthStore((state) => state.user);
  const { courses } = useCourses();
  const toast = useToast();

  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [isDownloading, setIsDownloading] = useState(false);

  // Filtrar cursos del profesor
  const myCourses =
    user?.role === "ADMIN"
      ? courses || []
      : courses?.filter((course) => course.teacherId === user?.id) || [];

  // Obtener estudiantes del curso seleccionado
  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ["course-students", selectedCourse],
    queryFn: async () => {
      if (!selectedCourse) return [];
      const enrollments = await enrollmentsService.getEnrollmentsByCourse(selectedCourse);
      return enrollments.map((e) => ({
        id: e.studentId,
        firstName: e.student.firstName,
        lastName: e.student.lastName,
        email: e.student.email,
        dni: e.student.dni,
      }));
    },
    enabled: !!selectedCourse,
  });

  // Obtener datos de asistencia del estudiante seleccionado
  const { history, isLoadingHistory, stats, isLoadingStats } = useStudentAttendance(
    selectedStudent || "",
    selectedCourse || undefined,
    dateRange.startDate,
    dateRange.endDate
  );

  // Función para descargar PDF
  const handleDownloadPDF = async () => {
    if (!selectedStudent) {
      toast({
        title: "Selecciona un estudiante",
        description: "Debes seleccionar un estudiante primero",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setIsDownloading(true);
    try {
      await downloadStudentAttendancePDF(selectedStudent, {
        courseId: selectedCourse || undefined,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });

      toast({
        title: "✅ PDF descargado",
        description: "El reporte se ha descargado correctamente",
        status: "success",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error al descargar PDF",
        description: error.message,
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Función para limpiar filtros
  const handleClearFilters = () => {
    setSelectedCourse("");
    setSelectedStudent("");
    setDateRange({ startDate: "", endDate: "" });
  };

  // Función para obtener color según porcentaje
  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600 bg-green-100";
    if (rate >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Estudiante seleccionado
  const selectedStudentData = students?.find((s) => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Historial de Estudiante</h1>
                <p className="text-sm text-gray-600">
                  Consulta el historial de asistencia de tus estudiantes
                </p>
              </div>
            </div>
            {selectedStudent && (
              <Button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                {isDownloading ? "Descargando..." : "Descargar PDF"}
              </Button>
            )}
          </div>

          {/* Filtros */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Filtros</h3>
              </div>
              {(selectedCourse || selectedStudent || dateRange.startDate || dateRange.endDate) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Curso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Curso</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedStudent(""); // Reset student when course changes
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Seleccionar curso</option>
                  {myCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} - {course.subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estudiante */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  disabled={!selectedCourse || isLoadingStudents}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Seleccionar estudiante</option>
                  {students?.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha Inicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Fecha Fin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  min={dateRange.startDate || undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        {!selectedStudent ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <p className="text-blue-700 font-medium text-lg mb-2">
              Selecciona un estudiante para ver su historial
            </p>
            <p className="text-blue-600 text-sm">
              Primero selecciona un curso, luego elige un estudiante de la lista
            </p>
          </div>
        ) : (
          <>
            {/* Información del Estudiante */}
            {selectedStudentData && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información del Estudiante
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre Completo</p>
                    <p className="font-medium text-gray-900">
                      {selectedStudentData.firstName} {selectedStudentData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">DNI</p>
                    <p className="font-medium text-gray-900">{selectedStudentData.dni}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedStudentData.email}</p>
                  </div>
                </div>
              </div>
            )}

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
                  {isLoadingStats ? "..." : `${stats?.attendanceRate?.toFixed(1) || 0}%`}
                </h3>
                <p className="text-sm text-gray-600 mt-1">Asistencia</p>
              </div>
            </div>

            {/* Barra de progreso */}
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

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      stats.attendanceRate >= 90
                        ? "bg-green-500"
                        : stats.attendanceRate >= 75
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(stats.attendanceRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Historial */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Historial de Clases
                {history && history.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({history.length} {history.length === 1 ? "registro" : "registros"})
                  </span>
                )}
              </h3>

              {isLoadingHistory ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-indigo-600 mb-4"></div>
                  <p className="text-gray-600">Cargando historial...</p>
                </div>
              ) : history && history.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Curso
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Observaciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {history.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {format(new Date(record.classDate), "dd/MM/yyyy", { locale: es })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {record.course?.name}
                            </div>
                            <div className="text-xs text-gray-500">{record.course?.subject}</div>
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
                    {dateRange.startDate || dateRange.endDate
                      ? "Intenta cambiar el rango de fechas"
                      : "Aún no se ha registrado asistencia para este estudiante"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentHistoryPage;
