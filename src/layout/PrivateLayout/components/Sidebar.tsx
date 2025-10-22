import { Box, Flex, Text, VStack, Icon, Collapse, useDisclosure } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { NavItem } from "../config/navConfig";

interface SidebarProps {
  navItems: NavItem[];
  isCollapsed: boolean;
}

const NavItemComponent = ({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === location.pathname;
  const isChildActive = item.children?.some((child) => child.path === location.pathname);

  const handleClick = () => {
    if (hasChildren) {
      onToggle();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <Box w="full">
      <Flex
        align="center"
        p={3}
        cursor="pointer"
        borderRadius="md"
        bg={isActive || isChildActive ? "red.50" : "transparent"}
        color={isActive || isChildActive ? "red.600" : "gray.700"}
        fontWeight={isActive || isChildActive ? "semibold" : "medium"}
        _hover={{
          bg: isActive || isChildActive ? "red.100" : "gray.100",
        }}
        transition="all 0.2s"
        onClick={handleClick}
        justify={isCollapsed ? "center" : "space-between"}
      >
        <Flex align="center" gap={3}>
          <Icon as={item.icon} boxSize={5} />
          {!isCollapsed && <Text fontSize="sm">{item.label}</Text>}
        </Flex>
        {!isCollapsed && hasChildren && (
          <Icon
            as={isOpen ? FiChevronDown : FiChevronRight}
            boxSize={4}
            transition="transform 0.2s"
          />
        )}
      </Flex>

      {hasChildren && !isCollapsed && (
        <Collapse in={isOpen} animateOpacity>
          <VStack align="stretch" pl={8} mt={1} spacing={1}>
            {item.children?.map((child, idx) => (
              <Text
                key={idx}
                fontSize="sm"
                py={2}
                px={3}
                cursor="pointer"
                borderRadius="md"
                bg={child.path === location.pathname ? "red.50" : "transparent"}
                color={child.path === location.pathname ? "red.600" : "gray.600"}
                fontWeight={child.path === location.pathname ? "semibold" : "normal"}
                _hover={{
                  bg: child.path === location.pathname ? "red.100" : "gray.50",
                }}
                transition="all 0.2s"
                onClick={() => navigate(child.path)}
              >
                {child.label}
              </Text>
            ))}
          </VStack>
        </Collapse>
      )}
    </Box>
  );
};

export const Sidebar = ({ navItems, isCollapsed }: SidebarProps) => {
  return (
    <Box
      h="full"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#CBD5E0",
          borderRadius: "2px",
        },
      }}
    >
      <VStack align="stretch" spacing={1} p={2}>
        {navItems.map((item, idx) => (
          <NavItemComponent key={idx} item={item} isCollapsed={isCollapsed} />
        ))}
      </VStack>
    </Box>
  );
};
