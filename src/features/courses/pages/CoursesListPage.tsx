import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
  IconButton,
  Text,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiMoreVertical, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import { useDebounce } from "../hooks/useDebounce";
import { CapacityBadge } from "../components/CapacityBadge";
import { CourseActionDialog } from "../components/CourseActionDialog";
import { CoursesTableSkeleton } from "../components/CoursesTableSkeleton";
import { CourseFilters } from "../types/courses.types";
import { PageContainer } from "../components/PageContainer";

const CoursesListPage = () => {
  const navigate = useNavigate();

  // Estados controlados con valores iniciales válidos
  const [searchInput, setSearchInput] = useState<string>("");
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("true");

  // Debounce solo para el search
  const debouncedSearch = useDebounce(searchInput, 500);

  // Filtros aplicados
  const filters: CourseFilters = {
    search: debouncedSearch || undefined,
    subject: subjectFilter || undefined,
    isActive: activeFilter as "true" | "false" | undefined,
  };

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"deactivate" | "activate">("deactivate");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    courses,
    coursesQuery,
    deactivateCourse,
    isDeactivating,
    updateCourse,
    isUpdating,
    subjects,
    isLoadingSubjects,
  } = useCourses(filters);

  // Diferenciamos carga inicial (primera vez sin datos) vs refetching
  const isInitialLoading = coursesQuery.isLoading && !coursesQuery.data;
  const isFetching = coursesQuery.isFetching && !isInitialLoading;

  const handleAction = (courseId: string, action: "deactivate" | "activate") => {
    setSelectedCourseId(courseId);
    setActionType(action);
    onOpen();
  };

  const confirmAction = () => {
    if (!selectedCourseId) return;

    if (actionType === "deactivate") {
      deactivateCourse(selectedCourseId);
    } else {
      updateCourse({ id: selectedCourseId, input: { isActive: true } });
    }
    onClose();
  };

  const isProcessing = isDeactivating || isUpdating;

  // Skeleton SOLO en carga inicial (primera vez, sin datos previos)
  if (isInitialLoading || isLoadingSubjects) {
    return (
      <PageContainer
        title="Gestión de Cursos"
        actions={
          <Button
            leftIcon={<FiPlus />}
            colorScheme="red"
            size="md"
            onClick={() => navigate("/admin/courses/create")}
            shadow="sm"
          >
            Nuevo Curso
          </Button>
        }
      >
        <Box bg="white" p={5} borderRadius="lg" boxShadow="sm" mb={6}>
          <Flex gap={4} wrap="wrap" align="flex-end">
            <Box flex="1" minW="250px">
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                Búsqueda
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray" />
                </InputLeftElement>
                <Input
                  placeholder="Buscar por nombre o materia..."
                  isDisabled
                  bg="gray.50"
                  border="1px"
                  borderColor="gray.200"
                />
              </InputGroup>
            </Box>
            <Box minW="200px">
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                Materia
              </Text>
              <Select isDisabled bg="gray.50" border="1px" borderColor="gray.200">
                <option>Cargando...</option>
              </Select>
            </Box>
            <Box minW="180px">
              <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                Estado
              </Text>
              <Select isDisabled bg="gray.50" border="1px" borderColor="gray.200">
                <option>Cargando...</option>
              </Select>
            </Box>
          </Flex>
        </Box>
        <CoursesTableSkeleton rows={5} />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Gestión de Cursos"
      actions={
        <Button
          leftIcon={<FiPlus />}
          colorScheme="red"
          size="md"
          onClick={() => navigate("/admin/courses/create")}
          shadow="sm"
        >
          Nuevo Curso
        </Button>
      }
    >
      {/* Panel de filtros - siempre visible */}
      <Box bg="white" p={5} borderRadius="lg" boxShadow="sm" mb={6}>
        <Flex gap={4} wrap="wrap" align="flex-end">
          <Box flex="1" minW="250px">
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
              Búsqueda
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Buscar por nombre o materia..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                _focus={{ bg: "white", borderColor: "blue.400" }}
              />
              {isFetching && searchInput && (
                <InputRightElement>
                  <Spinner size="sm" color="blue.500" />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>

          <Box minW="200px">
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
              Materia
            </Text>
            {subjects && subjects.length > 0 ? (
              <Select
                placeholder="Todas las materias"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </Select>
            ) : (
              <Select
                placeholder="No hay materias disponibles"
                isDisabled
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
              />
            )}
          </Box>

          <Box minW="180px">
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
              Estado
            </Text>
            <Select
              placeholder="Todos los estados"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              bg="gray.50"
              border="1px"
              borderColor="gray.200"
              _hover={{ borderColor: "gray.300" }}
            >
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </Select>
          </Box>
        </Flex>
      </Box>

      {/* Tabla */}
      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden" position="relative">
        {/* Barra de progreso sutil durante refetch */}
        {isFetching && (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            height="3px"
            bg="blue.500"
            zIndex="1"
            sx={{
              animation: "shimmer 1.5s infinite",
              "@keyframes shimmer": {
                "0%": { transform: "translateX(-100%)" },
                "100%": { transform: "translateX(100%)" },
              },
            }}
          />
        )}

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead bg="gray.50">
              <Tr>
                <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                  Nombre del Curso
                </Th>
                <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                  Materia
                </Th>
                <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                  Docente
                </Th>
                <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                  Disponibilidad
                </Th>
                <Th
                  color="gray.600"
                  fontWeight="semibold"
                  textTransform="none"
                  fontSize="sm"
                  isNumeric
                >
                  Precio/Mes
                </Th>
                <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                  Estado
                </Th>
                <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses && courses.length > 0 ? (
                courses.map((course) => (
                  <Tr key={course.id} _hover={{ bg: "gray.50" }} transition="background 0.2s">
                    <Td fontWeight="medium" color="gray.800">
                      {course.name}
                    </Td>
                    <Td>
                      <Badge colorScheme="purple" variant="subtle" px={2} py={1} borderRadius="md">
                        {course.subject}
                      </Badge>
                    </Td>
                    <Td color="gray.700">
                      {course.teacher.firstName} {course.teacher.lastName}
                    </Td>
                    <Td>
                      <CapacityBadge
                        available={course.availableCapacity || 0}
                        total={course.capacity}
                      />
                    </Td>
                    <Td isNumeric fontWeight="medium" color="gray.800">
                      S/ {course.monthlyPrice.toFixed(2)}
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={course.isActive ? "green" : "gray"}
                        variant="subtle"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        {course.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </Td>
                    <Td>
                      <Flex gap={1}>
                        <Tooltip label="Editar curso" fontSize="xs">
                          <IconButton
                            aria-label="Editar curso"
                            icon={<FiEdit />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                          />
                        </Tooltip>

                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Más opciones"
                            icon={<FiMoreVertical />}
                            size="sm"
                            variant="ghost"
                          />
                          <MenuList>
                            {course.isActive ? (
                              <MenuItem
                                icon={<FiTrash2 />}
                                color="red.600"
                                onClick={() => handleAction(course.id, "deactivate")}
                              >
                                Desactivar curso
                              </MenuItem>
                            ) : (
                              <MenuItem
                                icon={<FiCheckCircle />}
                                color="green.600"
                                onClick={() => handleAction(course.id, "activate")}
                              >
                                Activar curso
                              </MenuItem>
                            )}
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center" py={12}>
                    <Text color="gray.500" fontSize="lg">
                      No se encontraron cursos
                    </Text>
                    <Text color="gray.400" fontSize="sm" mt={1}>
                      Intenta ajustar los filtros o crear un nuevo curso
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>

      <CourseActionDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmAction}
        actionType={actionType}
        isLoading={isProcessing}
      />
    </PageContainer>
  );
};

export default CoursesListPage;
