import { useState, useRef } from "react";
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
  Spinner,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiMoreVertical, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import { CapacityBadge } from "../components/CapacityBadge";
import { CourseFilters } from "../types/courses.types";
import { PageContainer } from "../components/PageContainer";

const CoursesListPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CourseFilters>({ isActive: "true" });
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"deactivate" | "activate">("deactivate");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const {
    courses,
    isLoadingCourses,
    deactivateCourse,
    isDeactivating,
    updateCourse,
    isUpdating,
    subjects,
    isLoadingSubjects,
  } = useCourses(filters);

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

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

  if (isLoadingCourses || isLoadingSubjects) {
    return (
      <Flex justify="center" align="center" minH="400px">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Flex>
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
      {/* Panel de filtros mejorado */}
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
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                _focus={{ bg: "white", borderColor: "blue.400" }}
              />
            </InputGroup>
          </Box>

          <Box minW="200px">
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
              Materia
            </Text>

            {subjects && subjects.length > 0 ? (
              <Select
                placeholder="Todas las materias"
                value={filters.subject || ""}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
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
            <Select
              placeholder="Todas las materias"
              value={filters.subject || ""}
              onChange={(e) => handleFilterChange("subject", e.target.value)}
              bg="gray.50"
              border="1px"
              borderColor="gray.200"
              _hover={{ borderColor: "gray.300" }}
            >
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Lenguaje">Lenguaje</option>
              <option value="Biología">Biología</option>
              <option value="Biología">Razonamiento</option>
              <option value="Biología">Historia</option>
              <option value="Biología">Geografía</option>
            </Select>
          </Box>

          <Box minW="180px">
            <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
              Estado
            </Text>
            <Select
              placeholder="Todos los estados"
              value={filters.isActive || ""}
              onChange={(e) => handleFilterChange("isActive", e.target.value)}
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

      {/* Tabla mejorada */}
      <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
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

      {/* Alert Dialog mejorado */}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {actionType === "deactivate" ? "Desactivar Curso" : "Activar Curso"}
            </AlertDialogHeader>

            <AlertDialogBody>
              {actionType === "deactivate" ? (
                <>
                  ¿Estás seguro de desactivar este curso? Los estudiantes ya inscritos podrán
                  continuar, pero no se permitirán nuevas inscripciones.
                </>
              ) : (
                <>
                  ¿Estás seguro de activar este curso? Estará disponible nuevamente para
                  inscripciones de estudiantes.
                </>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isProcessing}>
                Cancelar
              </Button>
              <Button
                colorScheme={actionType === "deactivate" ? "red" : "green"}
                onClick={confirmAction}
                ml={3}
                isLoading={isProcessing}
              >
                {actionType === "deactivate" ? "Desactivar" : "Activar"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </PageContainer>
  );
};

export default CoursesListPage;
