import { useQuery, useMutation } from "@tanstack/react-query";
import { MEXCService } from "./service";

/**
 * Hook to create an order
 */
export function useCreateOrder() {
  return useMutation({
    mutationFn: (order: {
      symbol: string;
      side: "BUY" | "SELL";
      type: "LIMIT" | "MARKET";
      quantity: number;
      price?: number;
    }) => MEXCService.createOrder(order),
  });
}

/**
 * Hook to cancel an order
 */
export function useCancelOrder() {
  return useMutation({
    mutationFn: ({ symbol, orderId }: { symbol: string; orderId: string }) =>
      MEXCService.cancelOrder(symbol, orderId),
  });
}

/**
 * Hook to get market data
 */
export function useGetMarketDefaultSymbols() {
  return useQuery({
    queryKey: ["marketData"],
    queryFn: () => MEXCService.getMarketData(), // Ensure the function is called properly
  });
}
