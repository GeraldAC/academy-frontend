import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { DashboardLayout } from "./DashboardLayout";
import { getNavItemsByRole } from "./config/navConfig";

export const StudentLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (!user) return null;

  return (
    <DashboardLayout navItems={getNavItemsByRole("STUDENT")} user={user} onLogout={handleLogout} />
  );
};
