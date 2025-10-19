import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const links = [
  { label: "Dashboard", to: "/admin" },
  { label: "Usuarios", to: "/admin/users" },
  { label: "Reportes", to: "/admin/reports" },
  { label: "Mi Perfil", to: "/admin/profile" },
];

export const AdminLayout = () => (
  <Flex>
    <Sidebar links={links} title="Admin" colorScheme="teal" />
    <Box flex="1">
      <Topbar title="Panel de Administración" />
      <Box p="6">
        <Outlet />
      </Box>
    </Box>
  </Flex>
);
