import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";
import { FC } from "react";

interface AEXQueryProviderProps
  extends Omit<QueryClientProviderProps, "client"> {
  queryClient?: QueryClient;
}

export const AexProvider: FC<AEXQueryProviderProps> = ({
  children,
  queryClient,
  ...rest
}) => {
  const client = queryClient || new QueryClient(); // Create a default client if not provided

  return (
    <QueryClientProvider client={client} {...rest}>
      {children}
    </QueryClientProvider>
  );
};
