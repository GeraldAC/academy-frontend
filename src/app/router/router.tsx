import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routesConfig";

export function AppRouter() {
  return useRoutes(routesConfig);
}
