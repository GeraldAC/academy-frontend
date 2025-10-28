import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { ProfileForm } from "../components/ProfileForm";
import { PasswordForm } from "../components/PasswordForm";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { useAuthStore } from "@/stores/useAuthStore";
import type { UpdateProfileFormData } from "../validations/validation";
import type { UpdatePasswordFormData } from "../validations/validation";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const { toast } = useToast();

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
            variant: "default",
          });
        },
        onError: (error) => {
          toast({
            title: "Error al actualizar",
            description: error.message || "No se pudo actualizar tu perfil",
            variant: "destructive",
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
          variant: "default",
        });
      },
      onError: (error) => {
        toast({
          title: "Error al cambiar contraseña",
          description: error.message || "No se pudo cambiar tu contraseña",
          variant: "destructive",
        });
      },
    });
  };

  // Loading state
  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Email: <strong>{user.email}</strong> (no se puede modificar)
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
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
      </div>
    </div>
  );
}
