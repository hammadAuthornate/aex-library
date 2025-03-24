import {
  QueryClient,
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";

interface AEXQueryProviderProps
  extends Omit<QueryClientProviderProps, "client"> {
  queryClient?: QueryClient;
}

export const AexProvider: React.FC<AEXQueryProviderProps> = ({
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
