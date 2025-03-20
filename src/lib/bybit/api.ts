import { useQuery } from "@tanstack/react-query";
import { ByBitService } from "./service";

export function useGetBybitSymbolList() {
  return useQuery({
    queryKey: ["bybit-symbol-list"],
    queryFn: ByBitService.fetchSymbolList,
  });
}

export function useGetBybitSymbolDetails(symbol?: string) {
  return useQuery({
    queryKey: ["bybit-symbol-details", symbol],
    queryFn: () => {
      if (!symbol) {
        throw new Error("No Symbol provided");
      }
      return ByBitService.fetchSymbolDetails(symbol);
    },
    enabled: !!symbol, // Ensure the query only runs when a symbol is provided
  });
}
