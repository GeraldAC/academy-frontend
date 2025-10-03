import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { LoginFormData, loginFormSchema } from "../validations/validation";
import { Link as RouterLink } from "react-router-dom";

export default function LoginPage() {
  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormData) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdAlternateEmail color="gray.400" />
            </InputLeftElement>
            <Input type="email" placeholder="tucorreo@ejemplo.com" {...register("email")} />
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

        {error && (
          <Text color="red.500" fontSize="sm">
            {(error as Error).message}
          </Text>
        )}

        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isPending}
          loadingText="Ingresando..."
          width="full"
        >
          Ingresar
        </Button>

        <Text fontSize="sm" textAlign="center">
          <Link as={RouterLink} to="/auth/forgot-password" color="teal.500">
            ¿Olvidaste tu contraseña?
          </Link>
        </Text>

        <Text fontSize="sm" textAlign="center">
          ¿No tienes cuenta?{" "}
          <Link as={RouterLink} to="/auth/register" color="teal.500">
            Regístrate aquí
          </Link>
        </Text>
      </VStack>
    </form>
  );
}
