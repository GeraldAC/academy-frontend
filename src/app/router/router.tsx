import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routesConfig";

/**
 * Router principal de la aplicación
 * No necesita verificar autenticación aquí:
 * - Las rutas públicas son siempre accesibles
 * - Las rutas protegidas tienen su propio ProtectedRoute
 * - Las rutas de invitado tienen su propio GuestRoute
 */
export function AppRouter() {
  const routesElement = useRoutes(routesConfig);
  return routesElement;
}

export default AppRouter;