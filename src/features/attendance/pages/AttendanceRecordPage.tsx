import { useState, useEffect } from "react";
import { ClipboardCheck, Calendar, Users, CheckCircle, XCircle } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { useAttendance } from "../hooks/useAttendance";
import { Button } from "@/components/ui/Button";

const AttendanceRecordPage = () => {
  const user = useAuthStore((state) => state.user);
  const { courses, isLoadingCourses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

  type AttendanceStatus = "PRESENT" | "ABSENT" | "PERMISSION";
  const [attendanceData, setAttendanceData] = useState<Map<string, AttendanceStatus>>(new Map());

  const {
    students,
    isLoadingStudents,
    registerAttendance,
    isRegistering,
    courseAttendance,
    isLoadingCourseAttendance,
  } = useAttendance(selectedCourse, selectedDate);

  // Sync attendance data when courseAttendance loads
  useEffect(() => {
    if (courseAttendance && courseAttendance.length > 0) {
      const initialMap = new Map<string, AttendanceStatus>();
      courseAttendance.forEach((record) => {
        if (record.present) {
          initialMap.set(record.studentId, "PRESENT");
        } else if (record.notes === "PERMISO") {
          initialMap.set(record.studentId, "PERMISSION");
        } else {
          initialMap.set(record.studentId, "ABSENT");
        }
      });
      setAttendanceData(initialMap);
    } else {
      setAttendanceData(new Map());
    }
  }, [courseAttendance, selectedCourse, selectedDate]);

  // Filtrar cursos dependiendo del rol
  const myCourses =
    user?.role === "ADMIN"
      ? courses || []
      : courses?.filter((course) => course.teacherId === user?.id) || [];

  // Cambio de estado individual
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData(new Map(attendanceData.set(studentId, status)));
  };

  // Enviar asistencia
  const handleSubmit = () => {
    if (!selectedCourse || !selectedDate || !students || students.length === 0) {
      return;
    }

    const attendances = students.map((student) => {
      const status = attendanceData.get(student.id) ?? (student.present ? "PRESENT" : "ABSENT");

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
              <p className="text-sm text-gray-600"></p>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Estudiantes ({students?.length || 0})
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAll("PRESENT")}
                  disabled={isLoadingStudents}
                >
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Todos Presentes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAll("PERMISSION")}
                  disabled={isLoadingStudents}
                >
                  <ClipboardCheck className="w-4 h-4 mr-1 text-orange-500" />
                  Todos Permiso
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkAll("ABSENT")}
                  disabled={isLoadingStudents}
                >
                  <XCircle className="w-4 h-4 mr-1 text-red-500" />
                  Todos Ausentes
                </Button>
              </div>
            </div>

            {isLoadingStudents || isLoadingCourseAttendance ? (
              <div className="text-center py-8 text-gray-500">Cargando estudiantes...</div>
            ) : students && students.length > 0 ? (
              <>
                <div className="space-y-2 mb-6">
                  {students.map((student) => {
                    const status =
                      attendanceData.get(student.id) ?? (student.present ? "PRESENT" : "ABSENT");
                    return (
                      <div
                        key={student.id}
                        className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                          status === "PRESENT"
                            ? "border-green-200 bg-green-50"
                            : status === "PERMISSION"
                              ? "border-orange-200 bg-orange-50"
                              : "border-red-200 bg-red-50"
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
                            className={`p-2 rounded-lg transition-colors ${
                              status === "PRESENT"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-500"
                            }`}
                            title="Presente"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, "PERMISSION")}
                            className={`p-2 rounded-lg transition-colors ${
                              status === "PERMISSION"
                                ? "bg-orange-500 text-white"
                                : "bg-gray-100 text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                            }`}
                            title="Permiso"
                          >
                            <ClipboardCheck className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(student.id, "ABSENT")}
                            className={`p-2 rounded-lg transition-colors ${
                              status === "ABSENT"
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500"
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
                  {isRegistering ? "Guardando..." : "Guardar Asistencia"}
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay estudiantes matriculados en este curso
              </div>
            )}
          </div>
        )}

        {!selectedCourse && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-700">
              Selecciona un curso y una fecha para comenzar a registrar asistencia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceRecordPage;
