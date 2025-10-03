import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/router";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuspenseFallback } from "./router/SuspenseFallback";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<SuspenseFallback />}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
