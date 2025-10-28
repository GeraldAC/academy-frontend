import { Box, Spinner, Flex, Text, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import { CourseForm } from "../components/CourseForm";
import { CourseFormData } from "../validations/courses.validations";
import { PageContainer } from "../components/PageContainer";

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { teachers, isLoadingTeachers, createCourse, isCreating } = useCourses();

  const handleSubmit = (data: CourseFormData) => {
    createCourse(data, {
      onSuccess: () => {
        navigate("/admin/courses");
      },
    });
  };

  const handleCancel = () => {
    navigate("/admin/courses");
  };

  if (isLoadingTeachers) {
    return (
      <PageContainer
        title="Nuevo Curso"
        breadcrumbs={[
          { label: "Dashboard", path: "/admin" },
          { label: "Cursos", path: "/admin/courses" },
          { label: "Nuevo" },
        ]}
      >
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Flex>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Nuevo Curso"
      breadcrumbs={[
        { label: "Dashboard", path: "/admin" },
        { label: "Cursos", path: "/admin/courses" },
        { label: "Nuevo" },
      ]}
    >
      {!teachers || teachers.length === 0 ? (
        <Alert
          status="warning"
          borderRadius="lg"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minH="200px"
          bg="orange.50"
          border="1px"
          borderColor="orange.200"
        >
          <AlertIcon boxSize="40px" mr={0} mb={4} color="orange.500" />
          <AlertDescription maxW="md" fontSize="md" color="gray.700">
            <Text fontWeight="semibold" mb={2}>
              No hay docentes disponibles
            </Text>
            <Text>Por favor, registra o activa al menos un docente antes de crear un curso.</Text>
          </AlertDescription>
        </Alert>
      ) : (
        <Box bg="white" p={8} borderRadius="lg" boxShadow="md" maxW="900px" mx="auto">
          <Text color="gray.600" mb={6}>
            Completa la información del nuevo curso. Los campos marcados son obligatorios.
          </Text>
          <CourseForm
            teachers={teachers}
            isSubmitting={isCreating}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Box>
      )}
    </PageContainer>
  );
};

export default CreateCoursePage;
