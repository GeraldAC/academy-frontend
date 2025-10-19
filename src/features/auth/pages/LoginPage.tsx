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
  Container,
  Heading,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { LoginFormData, loginFormSchema } from "../validations/validation";
import { Link as RouterLink } from "react-router-dom";
import Layout from "@/components/layout/PublicLayout/Layout";

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
    <Layout showBackButton={true}>
      <Container maxW="md" py={10}>
        <VStack spacing={8}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="red.600">
              Iniciar Sesión
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Accede a tu cuenta del Centro Preuniversitario
            </Text>
          </VStack>

          <Card w="full" shadow="xl" borderRadius="xl" border="1px" borderColor="gray.100">
            <CardBody p={8}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6} align="stretch">
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel fontWeight="medium" color="gray.700">
                      Email
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <MdAlternateEmail color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        size="lg"
                        {...register("email")}
                        focusBorderColor="red.500"
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel fontWeight="medium" color="gray.700">
                      Contraseña
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <MdLock color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        size="lg"
                        {...register("password")}
                        focusBorderColor="red.500"
                      />
                    </InputGroup>
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                  </FormControl>

                  {error && (
                    <Text
                      color="red.500"
                      fontSize="sm"
                      textAlign="center"
                      bg="red.50"
                      p={2}
                      borderRadius="md"
                    >
                      {(error as Error).message}
                    </Text>
                  )}

                  <Button
                    type="submit"
                    colorScheme="red"
                    isLoading={isPending}
                    loadingText="Ingresando..."
                    size="lg"
                    height="50px"
                    fontSize="md"
                  >
                    Ingresar
                  </Button>

                  <VStack spacing={3} pt={4}>
                    <Text fontSize="sm" textAlign="center">
                      <Link
                        as={RouterLink}
                        to="/auth/forgot-password"
                        color="red.500"
                        _hover={{ color: "red.600" }}
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </Text>

                    <Text fontSize="sm" textAlign="center">
                      ¿Quieres inscribirte en la academia?{" "}
                      <Link
                        as={RouterLink}
                        to="/"
                        color="red.500"
                        fontWeight="medium"
                        _hover={{ color: "red.600" }}
                      >
                        Contáctate
                      </Link>
                    </Text>
                  </VStack>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Layout>
  );
}
