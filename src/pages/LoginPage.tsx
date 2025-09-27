import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "Email requerido").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

/** Simula una petición de autenticación.
 *  Devuelve token en caso de éxito, rechaza en error.
 *  Tiempo de respuesta simulado: 800-1400 ms.
 */
function fakeAuthApi(payload: LoginForm): Promise<{ token: string; user: { email: string } }> {
  return new Promise((resolve, reject) => {
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      // regla simple: si password === "password123" se considera éxito
      if (payload.password === "password123") {
        resolve({
          token: "demo-token-123456",
          user: { email: payload.email },
        });
      } else {
        reject(new Error("Credenciales inválidas"));
      }
    }, delay);
  });
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: LoginForm) => fakeAuthApi(data),
    onSuccess: (data) => {
      // Demo: almacenar token en localStorage (no recomendado para producción).
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      toast({
        title: "Bienvenido",
        description: "Inicio de sesión exitoso",
        status: "success",
        duration: 2500,
      });
      navigate("/dashboard");
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err?.message ?? "Error en autenticación",
        status: "error",
        duration: 3000,
      });
    },
  });

  const onSubmit = (values: LoginForm) => {
    mutation.mutate(values);
  };

  return (
    <Center minH="100vh" bg="gray.50" p={4}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Box
          bg="white"
          rounded="2xl"
          shadow="lg"
          w={{ base: "90vw", md: "420px" }}
          p={8}
          border="1px"
          borderColor="gray.100"
        >
          <VStack spacing={4} align="stretch">
            <Heading size="lg" textAlign="center">
              Iniciar sesión
            </Heading>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Usa <b>cualquier email</b> y la contraseña <code>password123</code> para demo
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={3} align="stretch">
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="tu@correo.com" {...register("email")} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Contraseña"
                      {...register("password")}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShow((s) => !s)}>
                        {show ? "Ocultar" : "Mostrar"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="blue" isDisabled={mutation.isPending}>
                  {mutation.isPending ? <Spinner size="sm" /> : "Entrar"}
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </motion.div>
    </Center>
  );
}
