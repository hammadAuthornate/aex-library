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
    enabled: !!symbol,
  });
}

export function useGetBybitSymbolOrderBook(symbol?: string) {
  return useQuery({
    queryKey: ["bybit-symbol-orderbook", symbol],
    queryFn: () => {
      if (!symbol) {
        throw new Error("No Symbol provided");
      }
      return ByBitService.fetchSymbolOrderBook(symbol);
    },
    enabled: !!symbol,
  });
}
