import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UsersIcon, CalendarIcon, DollarSignIcon, BookOpenIcon } from "lucide-react";
import type { Course } from "../types/courses.types";

interface CourseCardProps {
  course: Course;
  onViewDetails?: (courseId: string) => void;
}

const weekDayLabels: Record<string, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
};

export const CourseCard = ({ course, onViewDetails }: CourseCardProps) => {
  const enrolledCount = course._count?.enrollments || 0;
  const availableSpots = course.capacity - enrolledCount;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{course.name}</CardTitle>
            <Badge variant={course.isActive ? "default" : "secondary"}>
              {course.isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
          <Badge variant="outline" className="text-sm">
            <BookOpenIcon className="w-3 h-3 mr-1" />
            {course.subject}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {course.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium">{enrolledCount}</span>
              <span className="text-muted-foreground">/{course.capacity}</span>
              <p className="text-xs text-muted-foreground">{availableSpots} disponibles</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="font-medium">S/ {Number(course.monthlyPrice).toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">mensual</p>
            </div>
          </div>
        </div>

        {course.schedules && course.schedules.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Horarios:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.schedules.map((schedule) => (
                <Badge key={schedule.id} variant="secondary" className="text-xs">
                  {weekDayLabels[schedule.weekDay]} {schedule.startTime.slice(0, 5)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {onViewDetails && (
          <Button
            onClick={() => onViewDetails(course.id)}
            variant="outline"
            className="w-full mt-4"
          >
            Ver Detalles
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
