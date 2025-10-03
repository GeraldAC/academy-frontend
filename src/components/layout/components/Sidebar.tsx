import { Box, VStack, Text, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  links: { label: string; to: string }[];
  title: string;
  colorScheme?: string;
}

export const Sidebar = ({ links, title, colorScheme = "blue" }: SidebarProps) => (
  <Box bg={`${colorScheme}.600`} color="white" w="60" p="5" minH="100vh">
    <Text fontSize="2xl" fontWeight="bold" mb="6">
      {title}
    </Text>
    <VStack align="start" spacing="4">
      {links.map((link) => (
        <Link
          as={NavLink}
          key={link.to}
          to={link.to}
          _hover={{ textDecoration: "underline" }}
          _activeLink={{ fontWeight: "bold", color: `${colorScheme}.200` }}
        >
          {link.label}
        </Link>
      ))}
    </VStack>
  </Box>
);
