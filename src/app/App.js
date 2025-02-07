"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persistor } from "@/store-redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ApiRequestProvider } from "@/provider/InterceptorProvider";

export default function App({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // cacheTime: 3000,
        retryDelay: 3000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ApiRequestProvider>{children}</ApiRequestProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
