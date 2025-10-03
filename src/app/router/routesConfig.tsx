import { lazy } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const DashboardAdmin = lazy(() => import("@/pages/admin/DashboardAdmin"));
const TeacherDashboard = lazy(() => import("@/pages/teacher/TeacherDashboard"));
const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const routesConfig = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [{ index: true, element: <TeacherDashboard /> }],
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [{ index: true, element: <StudentDashboard /> }],
  },
  { path: "*", element: <NotFoundPage /> },
];
