import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface CourseActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  actionType: "deactivate" | "activate";
  isLoading: boolean;
}

export const CourseActionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  actionType,
  isLoading,
}: CourseActionDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {actionType === "deactivate" ? "Desactivar Curso" : "Activar Curso"}
          </AlertDialogHeader>

          <AlertDialogBody>
            {actionType === "deactivate" ? (
              <>
                ¿Estás seguro de desactivar este curso? Los estudiantes ya inscritos podrán
                continuar, pero no se permitirán nuevas inscripciones.
              </>
            ) : (
              <>
                ¿Estás seguro de activar este curso? Estará disponible nuevamente para inscripciones
                de estudiantes.
              </>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
              Cancelar
            </Button>
            <Button
              colorScheme={actionType === "deactivate" ? "red" : "green"}
              onClick={onConfirm}
              ml={3}
              isLoading={isLoading}
            >
              {actionType === "deactivate" ? "Desactivar" : "Activar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
