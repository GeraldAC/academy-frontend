import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, BookOpenIcon } from "lucide-react";
import { useStudentCourses } from "../hooks/useCourses";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";

export default function StudentCoursesPage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useStudentCourses();

  const handleViewDetails = (courseId: string) => {
    navigate(`/student/courses/${courseId}`);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Error al cargar los cursos: {(error as Error).message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const enrolledCourses = data?.courses || [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mis Cursos</h1>
        <p className="text-muted-foreground">Cursos en los que estás matriculado</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <Alert>
          <BookOpenIcon className="h-4 w-4" />
          <AlertDescription>
            No estás matriculado en ningún curso actualmente. Contacta con la administración para
            inscribirte en un curso.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Total: {enrolledCourses.length} {enrolledCourses.length === 1 ? "curso" : "cursos"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{course.name}</CardTitle>
                      <Badge variant="default">Activo</Badge>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      <BookOpenIcon className="w-3 h-3 mr-1" />
                      {course.subject}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    {/* Validación segura para teacher */}
                    {course.teacher && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Docente:</span>
                        <span className="font-medium">
                          {course.teacher.firstName} {course.teacher.lastName}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estudiantes:</span>
                      <span className="font-medium">
                        {course._count?.enrollments || 0} / {course.capacity}
                      </span>
                    </div>

                    {/* Validación segura para schedules */}
                    {course.schedules && course.schedules.length > 0 && (
                      <div className="pt-2 border-t">
                        <span className="text-muted-foreground text-xs">Horarios:</span>
                        <div className="mt-1 space-y-1">
                          {course.schedules.slice(0, 2).map((schedule) => (
                            <div key={schedule.id} className="text-xs">
                              <span className="font-medium">{schedule.weekDay}</span>
                              {" - "}
                              <span>
                                {new Date(schedule.startTime).toLocaleTimeString("es-PE", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => handleViewDetails(course.id)}
                    variant="outline"
                    className="w-full mt-4"
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
