// src/features/users/pages/UserCreatePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/api";
import type { CreateUserRequest } from "../types/types";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  // Estado del formulario
  const [formData, setFormData] = useState<CreateUserRequest>({
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
  });

  // Estado para validaciones
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Mutación para crear usuario
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/admin/usuarios");
    },
    onError: (error: any) => {
      toast({
        title: "Error al crear usuario",
        description: error.response?.data?.message || "Ocurrió un error inesperado",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  // Validar formulario
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 3) {
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (formData.dni && !/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener 8 dígitos";
    }

    if (formData.phone && !/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = "El teléfono debe tener 9 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createMutation.mutate(formData);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/usuarios")}
        mb={4}
        variant="ghost"
      >
        Volver a Usuarios
      </Button>

      <Card>
        <CardHeader>
          <Heading size="lg">Crear Nuevo Usuario</Heading>
          <Text color="gray.600" mt={2}>
            Complete el formulario para registrar un nuevo usuario en el sistema
          </Text>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Rol */}
              <FormControl isRequired isInvalid={!!errors.role}>
                <FormLabel>Rol</FormLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Seleccione un rol"
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="TEACHER">Profesor</option>
                  <option value="STUDENT">Estudiante</option>
                </Select>
                <FormErrorMessage>{errors.role}</FormErrorMessage>
              </FormControl>

              {/* Nombre de usuario */}
              <FormControl isRequired isInvalid={!!errors.username}>
                <FormLabel>Nombre de Usuario</FormLabel>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ej: jperez"
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              {/* Email */}
              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ej: usuario@ejemplo.com"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              {/* Contraseña */}
              <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              {/* Nombre */}
              <FormControl isRequired isInvalid={!!errors.firstName}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ej: Juan"
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              {/* Apellido */}
              <FormControl isRequired isInvalid={!!errors.lastName}>
                <FormLabel>Apellido</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ej: Pérez"
                />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>

              {/* DNI */}
              <FormControl isInvalid={!!errors.dni}>
                <FormLabel>DNI (Opcional)</FormLabel>
                <Input
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Ej: 12345678"
                  maxLength={8}
                />
                <FormErrorMessage>{errors.dni}</FormErrorMessage>
              </FormControl>

              {/* Teléfono */}
              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Teléfono (Opcional)</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej: 987654321"
                  maxLength={9}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>

              {/* Botones */}
              <Stack direction={{ base: "column", sm: "row" }} spacing={3} pt={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={createMutation.isPending}
                  loadingText="Creando..."
                  flex={1}
                >
                  Crear Usuario
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/usuarios")}
                  isDisabled={createMutation.isPending}
                  flex={1}
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}