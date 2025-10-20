import { lazy } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const DashboardAdmin = lazy(() => import("@/pages/admin/DashboardAdmin"));
const TeacherDashboard = lazy(() => import("@/pages/teacher/TeacherDashboard"));
const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const ProfilePage = lazy(() => import("@/features/users/pages/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));

export const routesConfig = [
  // Rutas públicas (sin protección)
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

  // Ruta de login (solo para usuarios NO autenticados)
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

  // Rutas protegidas - Admin
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
        element: <DashboardAdmin />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },

  // Rutas protegidas - Teacher
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
    ],
  },

  // Rutas protegidas - Student
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
    ],
  },

  // 404 - Debe estar al final
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
