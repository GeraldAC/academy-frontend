import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const links = [
  { label: "Inicio", to: "/teacher" },
  { label: "Clases", to: "/teacher/classes" },
  { label: "Evaluaciones", to: "/teacher/exams" },
];

export const TeacherLayout = () => (
  <Flex>
    <Sidebar links={links} title="Profesor" colorScheme="green" />
    <Box flex="1">
      <Topbar title="Panel del Profesor" />
      <Box p="6">
        <Outlet />
      </Box>
    </Box>
  </Flex>
);
