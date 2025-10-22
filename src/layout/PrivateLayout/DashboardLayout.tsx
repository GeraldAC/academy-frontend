import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  useBreakpointValue,
  Icon,
  Image,
} from "@chakra-ui/react";

import { Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiLogOut, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Sidebar } from "./components/Sidebar";
import { NavItem } from "./config/navConfig";
import { AuthUser } from "@/features/auth/types/auth";

interface DashboardLayoutProps {
  navItems: NavItem[];
  user: AuthUser;
  onLogout: () => void;
}

export const DashboardLayout = ({ navItems, user, onLogout }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const sidebarWidth = isCollapsed ? "70px" : "260px";

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrador";
      case "TEACHER":
        return "Profesor";
      case "STUDENT":
        return "Estudiante";
      default:
        return role;
    }
  };

  const handleProfileClick = () => {
    const profilePath = `/${user.role.toLowerCase()}/profile`;
    navigate(profilePath);
  };

  return (
    <Flex h="100vh" overflow="hidden" bg="gray.50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          w={sidebarWidth}
          bg="white"
          borderRight="1px"
          borderColor="gray.200"
          transition="width 0.3s"
          position="relative"
        >
          {/* Logo Section */}
          <Flex
            h="70px"
            align="center"
            justify="center"
            borderBottom="1px"
            borderColor="gray.200"
            px={4}
          >
            {!isCollapsed && (
              <Image
                src="/AcademyHorizontalLogoRec.png"
                alt="Academy Logo"
                height="50px" // ajusta según el espacio disponible
                objectFit="contain"
              />
            )}
            {isCollapsed && (
              <Image
                src="/OnlySymbolRec.png"
                alt="Academy Symbol"
                height="40px"
                objectFit="contain"
              />
            )}
          </Flex>

          {/* Collapse Button */}
          <IconButton
            icon={<Icon as={isCollapsed ? FiChevronRight : FiChevronLeft} />}
            aria-label="Toggle sidebar"
            size="sm"
            position="absolute"
            right="-12px"
            top="85px"
            bg="white"
            border="1px"
            borderColor="red.200"
            borderRadius="full"
            zIndex={2}
            onClick={() => setIsCollapsed(!isCollapsed)}
            _hover={{ bg: "gray.50" }}
          />

          {/* Sidebar Navigation */}
          <Box h="calc(100vh - 70px)">
            <Sidebar navItems={navItems} isCollapsed={isCollapsed} />
          </Box>
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Flex h="70px" align="center" justify="center" borderBottom="1px" borderColor="gray.200">
            <Text fontSize="xl" fontWeight="bold" color="red.600">
              PreUni
            </Text>
          </Flex>
          <DrawerBody p={0}>
            <Sidebar navItems={navItems} isCollapsed={false} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Flex flex={1} direction="column" overflow="hidden">
        {/* Topbar */}
        <Flex
          h="70px"
          bg="white"
          borderBottom="1px"
          borderColor="gray.200"
          align="center"
          justify="space-between"
          px={6}
        >
          {isMobile && (
            <IconButton
              icon={<Icon as={FiMenu} />}
              aria-label="Open menu"
              variant="ghost"
              onClick={onOpen}
            />
          )}

          <Box flex={1} />

          {/* User Menu */}
          <Menu>
            <MenuButton>
              <Flex align="center" gap={3} cursor="pointer">
                <Box textAlign="right" display={{ base: "none", md: "block" }}>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {getRoleLabel(user.role)}
                  </Text>
                </Box>
                <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} bg="red.500" />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<Icon as={FiUser} />} onClick={handleProfileClick}>
                Mi Perfil
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<Icon as={FiLogOut} />} onClick={onLogout}>
                Cerrar Sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Page Content */}
        <Box flex={1} overflowY="auto" p={6}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};
