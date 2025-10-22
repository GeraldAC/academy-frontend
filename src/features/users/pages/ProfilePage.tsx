import { Box, Heading, VStack, useToast, Alert, AlertIcon } from "@chakra-ui/react";
import { ProfileForm } from "../components/ProfileForm";
import { PasswordForm } from "../components/PasswordForm";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { useAuthStore } from "@/stores/useAuthStore";
import type { UpdateProfileFormData } from "../validations/validation";
import type { UpdatePasswordFormData } from "../validations/validation";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const toast = useToast();

  // Mutación para actualizar perfil
  const {
    mutate: updateProfile,
    isPending: isUpdatingProfile,
    error: profileError,
  } = useUpdateProfile();

  // Mutación para cambiar contraseña
  const {
    mutate: updatePassword,
    isPending: isUpdatingPassword,
    error: passwordError,
  } = useUpdatePassword();

  // Handler para actualizar información personal
  const handleProfileSubmit = (data: UpdateProfileFormData) => {
    updateProfile(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || null,
      },
      {
        onSuccess: () => {
          toast({
            title: "Perfil actualizado",
            description: "Tu información ha sido actualizada correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        onError: (error) => {
          toast({
            title: "Error al actualizar",
            description: error.message || "No se pudo actualizar tu perfil",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  // Handler para cambiar contraseña
  const handlePasswordSubmit = (data: UpdatePasswordFormData) => {
    updatePassword(data, {
      onSuccess: () => {
        toast({
          title: "Contraseña cambiada",
          description: "Tu contraseña ha sido actualizada correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error al cambiar contraseña",
          description: error.message || "No se pudo cambiar tu contraseña",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  // Loading state
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Heading mb={6}>Mi Perfil</Heading>

      <Alert status="info" mb={6} borderRadius="md">
        <AlertIcon />
        Email: <strong>{user.email}</strong> (no se puede modificar)
      </Alert>

      <VStack spacing={6} align="stretch">
        <ProfileForm
          onSubmit={handleProfileSubmit}
          isLoading={isUpdatingProfile}
          error={profileError}
        />

        <PasswordForm
          onSubmit={handlePasswordSubmit}
          isLoading={isUpdatingPassword}
          error={passwordError}
        />
      </VStack>
    </Box>
  );
}
