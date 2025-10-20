import { DashboardLayout } from "./DashboardLayout";
import { getNavItemsByRole } from "./config/navConfig";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  if (!user) return null;

  return (
    <DashboardLayout navItems={getNavItemsByRole("ADMIN")} user={user} onLogout={handleLogout} />
  );
};
