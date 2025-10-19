import { lazy } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { StudentLayout } from "@/components/layout/StudentLayout";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const DashboardAdmin = lazy(() => import("@/pages/admin/DashboardAdmin"));
const TeacherDashboard = lazy(() => import("@/pages/teacher/TeacherDashboard"));
const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));

export const routesConfig = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
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
