// src/app/router/routesConfig.tsx
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

// Layouts
import { PublicLayout } from "@/layout/PublicLayout";
import { AdminLayout } from "@/layout/PrivateLayout";
import { TeacherLayout } from "@/layout/PrivateLayout";
import { StudentLayout } from "@/layout/PrivateLayout";

// Secure Redirect
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

// Dummy Page
import { PlaceholderPage } from "@/components/common/PlaceholderPage";

// Public Pages
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Admin Pages
const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage"));
const CoursesListPage = lazy(() => import("@/features/courses/pages/CoursesListPage"));
const CreateCoursePage = lazy(() => import("@/features/courses/pages/CreateCoursePage"));
const EditCoursePage = lazy(() => import("@/features/courses/pages/EditCoursePage"));
const UsersManagementPage = lazy(() => import("@/pages/admin/UsersManagementPage"));
const UserCreatePage = lazy(() => import("@/features/users/pages/UserCreatePage"));
const ScheduleManagementPage = lazy(() => import("@/pages/admin/ScheduleManagementPage"));

// Teacher Pages
const TeacherDashboard = lazy(() => import("@/pages/teacher/DashboardPage"));
const MyCoursesPage = lazy(() => import("@/features/courses/pages/MyCoursesPage"));
const CourseDetailPage = lazy(() => import("@/features/courses/pages/CourseDetailPage"));
const TeacherCourseDetailSelector = lazy(
  () => import("@/features/courses/pages/TeacherCourseDetailSelector")
);

// Student Pages
const StudentDashboard = lazy(() => import("@/pages/student/DashboardPage"));
const StudentCoursesPage = lazy(() => import("@/features/courses/pages/StudentCoursesPage"));
const StudentCourseDetailPage = lazy(
  () => import("@/features/courses/pages/StudentCourseDetailPage")
);

// Shared Pages
const ProfilePage = lazy(() => import("@/features/users/pages/ProfilePage"));

// Admin Course Detail
const AdminCourseDetailPage = lazy(() => import("@/features/courses/pages/AdminCourseDetailPage"));

// Attendance Pages
const AttendanceRecordPage = lazy(() => import("@/features/attendance/pages/AttendanceRecordPage"));
const AttendanceStudentPage = lazy(
  () => import("@/features/attendance/pages/AttendanceStudentPage")
);
const AttendanceStatsPage = lazy(() => import("@/features/attendance/pages/AttendanceStatsPage"));
const AttendanceReportPage = lazy(() => import("@/features/attendance/pages/AttendanceReportPage"));

// ==================== ROUTES CONFIG ====================
export const routesConfig: RouteObject[] = [
  // ========== PUBLIC ROUTES ==========
  {
    path: "/",
    element: (
      <PublicLayout>
        <LandingPage />
      </PublicLayout>
    ),
  },
  {
    path: "/about",
    element: (
      <PublicLayout showBackButton={true} showTeamFooter={true}>
        <AboutPage />
      </PublicLayout>
    ),
  },
  // Ruta de login
  {
    path: "/auth/login",
    element: (
      <GuestRoute>
        <PublicLayout showBackButton={true}>
          <LoginPage />
        </PublicLayout>
      </GuestRoute>
    ),
  },

  // ========== ADMIN ROUTES ==========
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      // ========== USUARIOS ==========
      {
        path: "usuarios",
        element: <UsersManagementPage />,
      },
      {
        path: "usuarios/crear",
        element: <UserCreatePage />,
      },
      {
        path: "usuarios/perfil",
        element: <PlaceholderPage title="Perfil de Usuario" />,
      },
      // ========== CURSOS ==========
      {
        path: "courses",
        element: <CoursesListPage />,
      },
      {
        path: "courses/create",
        element: <CreateCoursePage />,
      },
      {
        path: "courses/:id",
        element: <AdminCourseDetailPage />,
      },
      {
        path: "courses/edit/:id",
        element: <EditCoursePage />,
      },
      {
        path: "courses/schedules",
        element: <ScheduleManagementPage />,
      },
      // ========== ASISTENCIA ==========
      {
        path: "attendance",
        element: <AttendanceRecordPage />,
      },
      {
        path: "attendance/stats",
        element: <AttendanceStatsPage />,
      },
      // ========== PAGOS ==========
      {
        path: "payments",
        element: <PlaceholderPage title="Lista de Pagos" />,
      },
      {
        path: "payments/create",
        element: <PlaceholderPage title="Registrar Pago" />,
      },
      {
        path: "payments/reports",
        element: <PlaceholderPage title="Reportes Financieros" />,
      },
      // ========== REPORTES ==========
      {
        path: "reports/students",
        element: <AttendanceReportPage initialMode="student" />,
      },
      {
        path: "reports/courses",
        element: <AttendanceReportPage initialMode="course" />,
      },
      {
        path: "reports/analytics",
        element: <AttendanceStatsPage />,
      },
    ],
  },

  // ========== TEACHER ROUTES ==========
  {
    path: "/teacher",
    element: (
      <ProtectedRoute requiredRole="TEACHER">
        <TeacherLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      // Cursos
      {
        path: "courses",
        element: <MyCoursesPage />,
      },
      {
        path: "courses/:id",
        element: <CourseDetailPage />,
      },
      {
        path: "course-detail",
        element: <TeacherCourseDetailSelector />,
      },
      {
        path: "courses/students",
        element: <PlaceholderPage title="Estudiantes Inscritos" />,
      },
      // Horarios
      {
        path: "schedule",
        element: <PlaceholderPage title="Mi Horario Semanal" />,
      },
      {
        path: "schedule/upcoming",
        element: <PlaceholderPage title="Próximas Clases" />,
      },
      // Asistencia
      {
        path: "attendance",
        element: <AttendanceRecordPage />,
      },
      {
        path: "attendance/history",
        element: <PlaceholderPage title="Historial de Asistencia" />,
      },
      {
        path: "attendance/stats",
        element: <AttendanceStatsPage />,
      },
      {
        path: "attendance/reports",
        element: <AttendanceReportPage initialMode="course" />,
      },
      // Reservas
      {
        path: "bookings",
        element: <PlaceholderPage title="Clases de Reforzamiento" />,
      },
      {
        path: "bookings/students",
        element: <PlaceholderPage title="Estudiantes Reservados" />,
      },
    ],
  },

  // ========== STUDENT ROUTES ==========
  {
    path: "/student",
    element: (
      <ProtectedRoute requiredRole="STUDENT">
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      // Cursos
      {
        path: "courses",
        element: <StudentCoursesPage />,
      },
      {
        path: "courses/:id",
        element: <StudentCourseDetailPage />,
      },
      // Horario
      {
        path: "schedule",
        element: <PlaceholderPage title="Mi Horario Semanal" />,
      },
      {
        path: "schedule/upcoming",
        element: <PlaceholderPage title="Próximas Clases" />,
      },
      // Asistencia
      {
        path: "attendance",
        element: <AttendanceStudentPage />,
      },
      {
        path: "attendance/report",
        element: <AttendanceStudentPage />,
      },
      // Reservas
      {
        path: "bookings",
        element: <PlaceholderPage title="Reservar Clases" />,
      },
      {
        path: "bookings/my-bookings",
        element: <PlaceholderPage title="Mis Reservas" />,
      },
      {
        path: "bookings/cancel",
        element: <PlaceholderPage title="Cancelar Reservas" />,
      },
      // Pagos
      {
        path: "payments",
        element: <PlaceholderPage title="Estado de Pagos" />,
      },
      {
        path: "payments/history",
        element: <PlaceholderPage title="Historial de Pagos" />,
      },
      {
        path: "payments/report",
        element: <PlaceholderPage title="Reporte de Pagos para Padres" />,
      },
      // Notificaciones
      {
        path: "notifications",
        element: <PlaceholderPage title="Notificaciones" />,
      },
    ],
  },

  // ========== 404 NOT FOUND ==========
  {
    path: "*",
    element: (
      <PublicLayout showBackButton={true}>
        <NotFoundPage />
      </PublicLayout>
    ),
  },
];
