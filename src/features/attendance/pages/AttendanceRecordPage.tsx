// src\features\attendance\pages\AttendanceRecordPage.tsx
import { useState, useEffect } from "react";
import { ClipboardCheck, Calendar, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useAttendance } from "../hooks/useAttendance";
import { Button } from "@/components/ui/Button";

type AttendanceStatus = "PRESENT" | "ABSENT" | "PERMISSION";

const AttendanceRecordPage = () => {
  const user = useAuthStore((state) => state.user);
  const { courses, isLoadingCourses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const [attendanceData, setAttendanceData] = useState<Map<string, AttendanceStatus>>(new Map());

  const {
    students,
    isLoadingStudents,
    registerAttendance,
    isRegistering,
    courseAttendance,
    isLoadingCourseAttendance,
  } = useAttendance(selectedCourse, selectedDate);

  // Sincronizar datos de asistencia cuando se cargan
  useEffect(() => {
    if (!students || students.length === 0) {
      setAttendanceData(new Map());
      return;
    }

    const newMap = new Map<string, AttendanceStatus>();

    // Si hay asistencia registrada, usarla
    if (courseAttendance && courseAttendance.length > 0) {
      // Crear un mapa de asistencia por studentId para acceso rápido
      const attendanceMap = new Map(courseAttendance.map((record) => [record.studentId, record]));

      students.forEach((student) => {
        const existingRecord = attendanceMap.get(student.id);

        if (existingRecord) {
          // Determinar el estado basado en los datos existentes
          if (existingRecord.present) {
            newMap.set(student.id, "PRESENT");
          } else if (existingRecord.notes?.toUpperCase().includes("PERMISO")) {
            newMap.set(student.id, "PERMISSION");
          } else {
            newMap.set(student.id, "ABSENT");
          }
        } else {
          // No hay registro, default a ausente
          newMap.set(student.id, "ABSENT");
        }
      });
    } else {
      // No hay asistencia registrada, todos ausentes por defecto
      students.forEach((student) => {
        newMap.set(student.id, "ABSENT");
      });
    }

    setAttendanceData(newMap);
  }, [students, courseAttendance, selectedCourse, selectedDate]);

  // Filtrar cursos dependiendo del rol
  const myCourses =
    user?.role === "ADMIN"
      ? courses || []
      : courses?.filter((course) => course.teacherId === user?.id) || [];

  // Cambio de estado individual
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData((prev) => {
      const newMap = new Map(prev);
      newMap.set(studentId, status);
      return newMap;
    });
  };

  // Enviar asistencia
  const handleSubmit = () => {
    if (!selectedCourse || !selectedDate || !students || students.length === 0) {
      return;
    }

    const attendances = students.map((student) => {
      const status = attendanceData.get(student.id) || "ABSENT";

      let present = false;
      let notes: string | undefined = undefined;

      if (status === "PRESENT") {
        present = true;
      } else if (status === "PERMISSION") {
        present = false;
        notes = "PERMISO";
      } else {
        present = false;
      }

      return {
        studentId: student.id,
        present,
        notes,
      };
    });

    registerAttendance({
      courseId: selectedCourse,
      classDate: selectedDate,
      attendances,
    });
  };

  // Marcar todos
  const handleMarkAll = (status: AttendanceStatus) => {
    if (!students) return;
    const newData = new Map<string, AttendanceStatus>();
    students.forEach((student) => {
      newData.set(student.id, status);
    });
    setAttendanceData(newData);
  };

  // Calcular resumen
  const summary = students
    ? students.reduce(
        (acc, student) => {
          const status = attendanceData.get(student.id) || "ABSENT";
          acc[status]++;
          return acc;
        },
        { PRESENT: 0, ABSENT: 0, PERMISSION: 0 }
      )
    : { PRESENT: 0, ABSENT: 0, PERMISSION: 0 };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ClipboardCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Registro de Asistencia</h1>
              <p className="text-sm text-gray-600">
                Registra la asistencia de estudiantes por curso y fecha
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Curso
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoadingCourses}
              >
                <option value="">Seleccionar curso</option>
                {myCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} - {course.subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Fecha de Clase
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Lista de Estudiantes */}
        {selectedCourse && selectedDate && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Resumen y Acciones Rápidas */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Estudiantes ({students?.length || 0})
                </h2>
                {students && students.length > 0 && (
                  <div className="flex gap-3 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      {summary.PRESENT} Presentes
                    </span>
                    <span className="flex items-center gap-1 text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      {summary.PERMISSION} Permisos
                    </span>
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle className="w-4 h-4" />
                      {summary.ABSENT} Ausentes
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAll("PRESENT")}
                  disabled={isLoadingStudents || !students || students.length === 0}
                >
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Todos Presentes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAll("PERMISSION")}
                  disabled={isLoadingStudents || !students || students.length === 0}
                >
                  <ClipboardCheck className="w-4 h-4 mr-1 text-orange-500" />
                  Todos Permiso
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAll("ABSENT")}
                  disabled={isLoadingStudents || !students || students.length === 0}
                >
                  <XCircle className="w-4 h-4 mr-1 text-red-500" />
                  Todos Ausentes
                </Button>
              </div>
            </div>

            {isLoadingStudents || isLoadingCourseAttendance ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-purple-600"></div>
                <p className="text-gray-500 mt-4">Cargando estudiantes...</p>
              </div>
            ) : students && students.length > 0 ? (
              <>
                <div className="space-y-2 mb-6">
                  {students.map((student) => {
                    const status = attendanceData.get(student.id) || "ABSENT";
                    return (
                      <div
                        key={student.id}
                        className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                          status === "PRESENT"
                            ? "border-green-300 bg-green-50 shadow-sm"
                            : status === "PERMISSION"
                              ? "border-orange-300 bg-orange-50 shadow-sm"
                              : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            DNI: {student.dni} • {student.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusChange(student.id, "PRESENT")}
                            className={`p-2 rounded-lg transition-all ${
                              status === "PRESENT"
                                ? "bg-green-500 text-white shadow-md"
                                : "bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600"
                            }`}
                            title="Presente"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, "PERMISSION")}
                            className={`p-2 rounded-lg transition-all ${
                              status === "PERMISSION"
                                ? "bg-orange-500 text-white shadow-md"
                                : "bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-600"
                            }`}
                            title="Permiso"
                          >
                            <ClipboardCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, "ABSENT")}
                            className={`p-2 rounded-lg transition-all ${
                              status === "ABSENT"
                                ? "bg-red-500 text-white shadow-md"
                                : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600"
                            }`}
                            title="Ausente"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button onClick={handleSubmit} disabled={isRegistering} className="w-full">
                  {isRegistering ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Asistencia"
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No hay estudiantes matriculados en este curso</p>
                <p className="text-sm mt-1">Verifica que el curso tenga estudiantes inscritos</p>
              </div>
            )}
          </div>
        )}

        {!selectedCourse && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <ClipboardCheck className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <p className="text-blue-700 font-medium">
              Selecciona un curso y una fecha para comenzar a registrar asistencia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceRecordPage;
