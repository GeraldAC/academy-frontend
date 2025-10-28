import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { useAuthSync } from "@/hooks/useAuthSync";
import { useAuthCheck } from "@/hooks/useAuthCheck";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  // Inicializar autenticación
  useAuthCheck();

  // Sincronizar autenticación entre pestañas
  useAuthSync();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppRouter />
    </Suspense>
  );
}

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
