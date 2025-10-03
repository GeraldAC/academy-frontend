import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const links = [
  { label: "Inicio", to: "/student" },
  { label: "Mis Cursos", to: "/student/courses" },
  { label: "Tareas", to: "/student/tasks" },
];

export const StudentLayout = () => (
  <Flex>
    <Sidebar links={links} title="Estudiante" colorScheme="teal" />
    <Box flex="1">
      <Topbar title="Panel del Estudiante" />
      <Box p="6">
        <Outlet />
      </Box>
    </Box>
  </Flex>
);
