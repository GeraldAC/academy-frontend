import { lazy } from "react";

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
// const AdminProfile = lazy(() => import("@/pages/admin/ProfilePage"));
const CoursesListPage = lazy(() => import("@/features/courses/pages/CoursesListPage"));
const CreateCoursePage = lazy(() => import("@/features/courses/pages/CreateCoursePage"));
const EditCoursePage = lazy(() => import("@/features/courses/pages/EditCoursePage"));

// Teacher Pages
const TeacherDashboard = lazy(() => import("@/pages/teacher/DashboardPage"));
// const TeacherProfile = lazy(() => import("@/pages/teacher/ProfilePage"));

// Student Pages
const StudentDashboard = lazy(() => import("@/pages/student/DashboardPage"));
// const StudentProfile = lazy(() => import("@/pages/student/ProfilePage"));

// Shared Pages
const ProfilePage = lazy(() => import("@/features/users/pages/ProfilePage"));

export const routesConfig = [
  // Rutas públicas
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
      // Usuarios
      {
        path: "users",
        element: <PlaceholderPage title="Lista de Usuarios" />,
      },
      {
        path: "users/create",
        element: <PlaceholderPage title="Crear Usuario" />,
      },
      {
        path: "users/profile",
        element: <PlaceholderPage title="Perfil de Usuario" />,
      },
      // Cursos
      {
        path: "courses",
        element: <CoursesListPage />,
      },
      {
        path: "courses/create",
        element: <CreateCoursePage />,
      },
      {
        path: "courses/edit/:id",
        element: <EditCoursePage />,
      },
      {
        path: "courses/schedules",
        element: <PlaceholderPage title="Gestión de Horarios" />,
      },
      // Asistencia
      {
        path: "attendance",
        element: <PlaceholderPage title="Reporte General de Asistencia" />,
      },
      {
        path: "attendance/stats",
        element: <PlaceholderPage title="Estadísticas de Asistencia" />,
      },
      // Pagos
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
      // Reportes
      {
        path: "reports/students",
        element: <PlaceholderPage title="Reportes por Estudiante" />,
      },
      {
        path: "reports/courses",
        element: <PlaceholderPage title="Reportes por Curso" />,
      },
      {
        path: "reports/analytics",
        element: <PlaceholderPage title="Analíticas Generales" />,
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
        element: <PlaceholderPage title="Lista de Cursos Asignados" />,
      },
      {
        path: "courses/detail",
        element: <PlaceholderPage title="Detalle de Curso" />,
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
        element: <PlaceholderPage title="Registrar Asistencia" />,
      },
      {
        path: "attendance/history",
        element: <PlaceholderPage title="Historial de Asistencia" />,
      },
      {
        path: "attendance/reports",
        element: <PlaceholderPage title="Reportes por Curso" />,
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
        element: <PlaceholderPage title="Cursos Inscritos" />,
      },
      {
        path: "courses/detail",
        element: <PlaceholderPage title="Detalles de Curso" />,
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
        element: <PlaceholderPage title="Mi Historial de Asistencia" />,
      },
      {
        path: "attendance/report",
        element: <PlaceholderPage title="Reporte para Padres" />,
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

  // 404
  {
    path: "*",
    element: (
      <PublicLayout showBackButton={true}>
        <NotFoundPage />
      </PublicLayout>
    ),
  },
];
