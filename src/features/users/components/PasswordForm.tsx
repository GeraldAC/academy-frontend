import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, type UpdatePasswordFormData } from "../validations/validation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface PasswordFormProps {
  onSubmit: (data: UpdatePasswordFormData) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const PasswordForm = ({ onSubmit, isLoading, error }: PasswordFormProps) => {
  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleFormSubmit = (data: UpdatePasswordFormData) => {
    onSubmit(data);
    form.reset(); // Limpiar formulario después de enviar
  };

  return (
    <Card className="max-w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cambiar Contraseña</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Contraseña actual */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="password" placeholder="••••••••" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nueva contraseña */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="password" placeholder="••••••••" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirmar nueva contraseña */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input type="password" placeholder="••••••••" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error general */}
            {error && <p className="text-sm text-red-500">{error.message}</p>}

            {/* Botón de envío */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
