import { IconType } from "react-icons";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiCheckSquare,
  FiDollarSign,
  FiBarChart2,
  FiUser,
  FiBell,
  FiClock,
} from "react-icons/fi";

export interface NavItem {
  label: string;
  icon: IconType;
  path?: string;
  children?: Array<{
    label: string;
    path: string;
  }>;
}

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/admin",
  },
  {
    label: "Usuarios",
    icon: FiUsers,
    children: [
      { label: "Lista de Usuarios", path: "/admin/usuarios" },
      { label: "Crear Usuario", path: "/admin/usuarios/crear" },
      { label: "Perfil de Usuario", path: "/admin/usuarios/perfil" },
    ],
  },
  {
    label: "Cursos",
    icon: FiBookOpen,
    children: [
      { label: "Lista de Cursos", path: "/admin/courses" },
      { label: "Crear Curso", path: "/admin/courses/create" },
      { label: "Gestión de Horarios", path: "/admin/courses/schedules" },
    ],
  },
  {
    label: "Asistencia",
    icon: FiCheckSquare,
    children: [
      { label: "Reporte General", path: "/admin/attendance" },
      { label: "Estadísticas", path: "/admin/attendance/stats" },
    ],
  },
  {
    label: "Pagos",
    icon: FiDollarSign,
    children: [
      { label: "Lista de Pagos", path: "/admin/payments" },
      { label: "Registrar Pago", path: "/admin/payments/create" },
      { label: "Reportes Financieros", path: "/admin/payments/reports" },
      { label: "Pagos de Reservas", path: "/admin/reservation/payments" },
      { label: "Pagar Reserva", path: "/admin/reservation/payments/create" },
    ],
  },
  {
    label: "Reportes",
    icon: FiBarChart2,
    children: [
      { label: "Reportes por Estudiante", path: "/admin/reports/students" },
      { label: "Reportes por Curso", path: "/admin/reports/courses" },
      { label: "Analíticas Generales", path: "/admin/reports/analytics" },
    ],
  },
  {
    label: "Perfil",
    icon: FiUser,
    path: "/admin/profile",
  },
];

export const teacherNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/teacher",
  },
  {
    label: "Mis Cursos",
    icon: FiBookOpen,
    children: [
      { label: "Lista de Cursos Asignados", path: "/teacher/courses" },
      { label: "Detalle de Curso", path: "/teacher/courses/detail" },
      { label: "Estudiantes Inscritos", path: "/teacher/courses/students" },
    ],
  },
  {
    label: "Horarios",
    icon: FiCalendar,
    children: [
      { label: "Mi Horario Semanal", path: "/teacher/schedule" },
      { label: "Próximas Clases", path: "/teacher/schedule/upcoming" },
    ],
  },
  {
    label: "Asistencia",
    icon: FiCheckSquare,
    children: [
      { label: "Registrar Asistencia", path: "/teacher/attendance" },
      { label: "Historial de Asistencia", path: "/teacher/attendance/history" },
      { label: "Reportes por Curso", path: "/teacher/attendance/reports" },
    ],
  },
  {
    label: "Reservas",
    icon: FiClock,
    children: [
      { label: "Clases de Reforzamiento", path: "/teacher/bookings" },
      { label: "Estudiantes Reservados", path: "/teacher/bookings/students" },
    ],
  },
  {
    label: "Perfil",
    icon: FiUser,
    path: "/teacher/profile",
  },
];

export const studentNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/student",
  },
  {
    label: "Mis Cursos",
    icon: FiBookOpen,
    children: [
      { label: "Cursos Inscritos", path: "/student/courses" },
      { label: "Detalles de Curso", path: "/student/courses/detail" },
    ],
  },
  {
    label: "Horario",
    icon: FiCalendar,
    children: [
      { label: "Mi Horario Semanal", path: "/student/schedule" },
      { label: "Próximas Clases", path: "/student/schedule/upcoming" },
    ],
  },
  {
    label: "Asistencia",
    icon: FiCheckSquare,
    children: [
      { label: "Mi Historial", path: "/student/attendance" },
      { label: "Reporte para Padres", path: "/student/attendance/report" },
    ],
  },
  {
    label: "Reservas",
    icon: FiClock,
    children: [
      { label: "Reservar Clases", path: "/student/bookings" },
      { label: "Mis Reservas", path: "/student/bookings/my-bookings" },
      { label: "Cancelar Reservas", path: "/student/bookings/cancel" },
    ],
  },
  {
    label: "Pagos",
    icon: FiDollarSign,
    children: [
      { label: "Estado de Pagos", path: "/student/payments" },
      { label: "Historial de Pagos", path: "/student/payments/history" },
      { label: "Reporte para Padres", path: "/student/payments/report" },
    ],
  },
  {
    label: "Notificaciones",
    icon: FiBell,
    path: "/student/notifications",
  },
  {
    label: "Perfil",
    icon: FiUser,
    path: "/student/profile",
  },
];

export const getNavItemsByRole = (role: string): NavItem[] => {
  switch (role) {
    case "ADMIN":
      return adminNavItems;
    case "TEACHER":
      return teacherNavItems;
    case "STUDENT":
      return studentNavItems;
    default:
      return [];
  }
};
