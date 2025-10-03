import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/useRegister";
import { RegisterDTO } from "../types/auth";
import { RegisterFormData, registerFormSchema } from "../validations/validation";
import { MdAlternateEmail, MdLock, MdPhone } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";

export default function RegisterPage() {
  const { mutate, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const payload: RegisterDTO = {
      ...data,
      phone: data.phone || null,
    };
    mutate(payload);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>Nombre</FormLabel>
            <Input placeholder="Juan" {...register("firstName")} />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Apellido</FormLabel>
            <Input placeholder="Pérez" {...register("lastName")} />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Correo electrónico</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdAlternateEmail color="gray.400" />
            </InputLeftElement>
            <Input type="email" placeholder="correo@ejemplo.com" {...register("email")} />
          </InputGroup>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdLock color="gray.400" />
            </InputLeftElement>
            <Input type="password" placeholder="••••••••" {...register("password")} />
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.dni}>
          <FormLabel>DNI</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaIdCard color="gray.400" />
            </InputLeftElement>
            <Input maxLength={8} placeholder="01010101" {...register("dni")} />
          </InputGroup>
          <FormErrorMessage>{errors.dni?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.role}>
          <FormLabel>Rol</FormLabel>
          <Select placeholder="Selecciona tu rol" {...register("role")}>
            <option value="STUDENT">Estudiante</option>
            <option value="TEACHER">Docente</option>
            <option value="ADMIN">Administrador</option>
          </Select>
          <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Teléfono (opcional)</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdPhone color="gray.400" />
            </InputLeftElement>
            <Input placeholder="987654321" {...register("phone")} />
          </InputGroup>
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        {error && (
          <Text color="red.500" fontSize="sm">
            {(error as Error).message}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isPending}
          loadingText="Registrando..."
          width="full"
        >
          Registrarse
        </Button>
      </VStack>
    </form>
  );
}
