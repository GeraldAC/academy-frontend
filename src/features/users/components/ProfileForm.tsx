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
  SimpleGrid,
  useBreakpointValue,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdPerson, MdPhone } from "react-icons/md";
import { UpdateProfileFormData, updateProfileSchema } from "../validations/validation";
import { useAuthStore } from "@/stores/useAuthStore";

interface ProfileFormProps {
  onSubmit: (data: UpdateProfileFormData) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const ProfileForm = ({ onSubmit, isLoading, error }: ProfileFormProps) => {
  const user = useAuthStore((state) => state.user);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    },
  });

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
      <Heading size="md" mb={4}>
        Información Personal
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel>Nombre</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdPerson color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Juan" {...register("firstName")} />
              </InputGroup>
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel>Apellido</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdPerson color="gray.400" />
                </InputLeftElement>
                <Input placeholder="Pérez" {...register("lastName")} />
              </InputGroup>
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Teléfono (opcional)</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <MdPhone color="gray.400" />
              </InputLeftElement>
              <Input placeholder="987654321" maxLength={9} {...register("phone")} />
            </InputGroup>
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
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
            loadingText="Guardando..."
            width="full"
          >
            Actualizar Información
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
