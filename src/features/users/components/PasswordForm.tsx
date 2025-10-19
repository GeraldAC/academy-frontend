import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdLock } from "react-icons/md";
import { UpdatePasswordFormData, updatePasswordSchema } from "../validations/validation";

interface PasswordFormProps {
  onSubmit: (data: UpdatePasswordFormData) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const PasswordForm = ({ onSubmit, isLoading, error }: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleFormSubmit = (data: UpdatePasswordFormData) => {
    onSubmit(data);
    reset(); // Limpiar formulario después de enviar
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
      <Heading size="md" mb={4}>
        Cambiar Contraseña
      </Heading>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.currentPassword}>
            <FormLabel>Contraseña Actual</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdLock color="gray.400" />
              </InputLeftElement>
              <Input type="password" placeholder="••••••••" {...register("currentPassword")} />
            </InputGroup>
            <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.newPassword}>
            <FormLabel>Nueva Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdLock color="gray.400" />
              </InputLeftElement>
              <Input type="password" placeholder="••••••••" {...register("newPassword")} />
            </InputGroup>
            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirmar Nueva Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdLock color="gray.400" />
              </InputLeftElement>
              <Input type="password" placeholder="••••••••" {...register("confirmPassword")} />
            </InputGroup>
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error.message}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Cambiando..."
            width="full"
          >
            Cambiar Contraseña
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
