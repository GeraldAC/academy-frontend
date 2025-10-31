import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, isValidElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageContainerProps {
  title?: ReactNode; // 👈 ahora puede ser texto o JSX
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
}

export const PageContainer = ({ title, breadcrumbs, actions, children }: PageContainerProps) => {
  const separatorColor = useColorModeValue("gray.500", "gray.400");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box w="full">
      {/* ===== Breadcrumbs ===== */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb
          spacing="8px"
          separator={<FiChevronRight color={separatorColor} />}
          mb={4}
          fontSize="sm"
        >
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={index} isCurrentPage={!crumb.path}>
              {crumb.path ? (
                <BreadcrumbLink
                  as={RouterLink}
                  to={crumb.path}
                  color="blue.600"
                  _hover={{ textDecoration: "underline" }}
                >
                  {crumb.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink color="gray.500" cursor="default">
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}

      {/* ===== Header con título y acciones ===== */}

      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={4}
        flexDir={{ base: "column", md: "row" }}
        gap={3}
      >
        {isValidElement(title) ? (
          title
        ) : (
          <Heading size="lg" color={headingColor}>
            {title}
          </Heading>
        )}
        {actions && <Box>{actions}</Box>}
      </Flex>

      {/* ===== Contenido ===== */}
      <Box>{children}</Box>
    </Box>
  );
};
