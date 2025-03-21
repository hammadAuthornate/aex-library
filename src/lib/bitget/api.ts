import { useQuery } from "@tanstack/react-query";
import { BitgetService } from "./service";

export function useGetBitgetSymbolList() {
  return useQuery({
    queryKey: ["bitget-symbol-list"],
    queryFn: BitgetService.fetchSymbolList,
  });
}

export function useGetBitgetSymbolDetails(symbol?: string) {
  return useQuery({
    queryKey: ["bitget-symbol-details", symbol],
    queryFn: () => {
      if (!symbol) throw new Error("No symbol provided");
      return BitgetService.fetchSymbolDetails(symbol);
    },
    enabled: !!symbol, // Only fetch when symbol is provided
  });
}

export function useGetBitgetOrderBook(symbol?: string) {
    return useQuery({
      queryKey: ["bitget-order-book", symbol],
      queryFn: () => {
        if (!symbol) throw new Error("No symbol provided");
        return BitgetService.fetchOrderBook(symbol);
      },
      enabled: !!symbol, // Only fetch when symbol is provided
    });
  }
