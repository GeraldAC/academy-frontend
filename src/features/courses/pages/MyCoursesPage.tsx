import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, BookOpenIcon } from "lucide-react";
import { CourseCard } from "../components/CourseCard";
import { useMyCourses } from "../hooks/useMyCourses";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useNavigate } from "react-router-dom";

export default function MyCoursesPage() {
  const { data, isLoading, error } = useMyCourses();
  const navigate = useNavigate();

  const handleViewDetails = (courseId: string) => {
    // Navegar a la página de detalle del curso
    navigate(`/teacher/courses/${courseId}`);
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

  const courses = data?.courses || [];
  const totalCourses = data?.total || 0;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mis Cursos</h1>
        <p className="text-muted-foreground">Lista de cursos asignados a tu cargo</p>
      </div>

      {totalCourses === 0 ? (
        <Alert>
          <BookOpenIcon className="h-4 w-4" />
          <AlertDescription>No tienes cursos asignados actualmente.</AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Total: {totalCourses} {totalCourses === 1 ? "curso" : "cursos"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onViewDetails={handleViewDetails} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
