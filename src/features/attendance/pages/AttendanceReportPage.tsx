import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    FileText,
    Filter,
    Download,
    Calendar,
    CheckCircle,
    XCircle,
    Search,
} from "lucide-react";
import { attendanceService } from "../services/api";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { Button } from "@/components/ui/Button";

interface AttendanceReportPageProps {
    initialMode?: "student" | "course" | "general";
}

const AttendanceReportPage = ({ initialMode = "general" }: AttendanceReportPageProps) => {
    const { courses } = useCourses();
    const [filters, setFilters] = useState({
        courseId: "",
        studentId: "", // Podría ser un input de búsqueda por DNI o Nombre
        startDate: "",
        endDate: "",
    });

    const { data: reportData, isLoading, refetch } = useQuery({
        queryKey: ["attendance-report", filters],
        queryFn: () =>
            attendanceService.getAttendanceReport({
                courseId: filters.courseId || undefined,
                studentId: filters.studentId || undefined, // El backend debe soportar filtrado por ID parcial o exacto si es UUID
                startDate: filters.startDate || undefined,
                endDate: filters.endDate || undefined,
            }),
    });

    const handleDownload = () => {
        // Aquí se implementaría la lógica de descarga real (CSV/PDF)
        // Por ahora simulamos
        console.log("Descargando reporte...", reportData);
        alert("Descarga de reporte iniciada (Simulación)");
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {initialMode === "student"
                        ? "Reporte por Estudiante"
                        : initialMode === "course"
                            ? "Reporte por Curso"
                            : "Reportes y Analíticas"}
                </h1>
                <p className="text-gray-600">
                    Genera y descarga reportes detallados de asistencia.
                </p>
            </div>

            {/* Filtros */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    {/* Filtro Curso */}
                    {(initialMode === "course" || initialMode === "general") && (
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <Filter className="w-4 h-4 inline mr-1" />
                                Curso
                            </label>
                            <select
                                value={filters.courseId}
                                onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Todos los cursos</option>
                                {courses?.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Filtro Estudiante (ID por ahora, idealmente un search autocomplete) */}
                    {(initialMode === "student" || initialMode === "general") && (
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <Search className="w-4 h-4 inline mr-1" />
                                ID Estudiante (UUID)
                            </label>
                            <input
                                type="text"
                                placeholder="Pegar ID de estudiante..."
                                value={filters.studentId}
                                onChange={(e) => setFilters({ ...filters, studentId: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    )}

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Desde
                        </label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Hasta
                        </label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => refetch()}>
                        Filtrar Resultados
                    </Button>
                    {reportData && (
                        <Button onClick={handleDownload}>
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Datos
                        </Button>
                    )}
                </div>
            </div>

            {/* Resultados */}
            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Cargando datos...</div>
            ) : reportData ? (
                <div className="space-y-6">
                    {/* Card Resumen */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-500">Total Clases</p>
                            <p className="text-2xl font-bold">{reportData.stats.totalClasses}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-500">Asistencias</p>
                            <p className="text-2xl font-bold text-green-600">{reportData.stats.presentClasses}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-500">Faltas</p>
                            <p className="text-2xl font-bold text-red-600">{reportData.stats.absentClasses}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <p className="text-sm text-gray-500">% Asistencia</p>
                            <p className="text-2xl font-bold text-blue-600">{reportData.stats.attendanceRate}%</p>
                        </div>
                    </div>

                    {/* Tabla Detallada */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-500" />
                                Registros Detallados ({reportData.attendances.length})
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Fecha</th>
                                        <th className="px-6 py-3">Estudiante</th>
                                        <th className="px-6 py-3">DNI</th>
                                        <th className="px-6 py-3">Curso</th>
                                        <th className="px-6 py-3 text-center">Estado</th>
                                        <th className="px-6 py-3">Notas</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {reportData.attendances.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                {format(new Date(record.classDate), "dd/MM/yyyy", { locale: es })}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {record.student?.firstName} {record.student?.lastName}
                                            </td>
                                            <td className="px-6 py-4">{record.student?.dni}</td>
                                            <td className="px-6 py-4">{record.course?.name}</td>
                                            <td className="px-6 py-4 text-center">
                                                {record.present ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <CheckCircle className="w-3 h-3 mr-1" /> Presente
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <XCircle className="w-3 h-3 mr-1" /> Ausente
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate">{record.notes}</td>
                                        </tr>
                                    ))}
                                    {reportData.attendances.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No se encontraron registros con los filtros seleccionados
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                    <p>Selecciona filtros para generar un reporte</p>
                </div>
            )}
        </div>
    );
};

export default AttendanceReportPage;
