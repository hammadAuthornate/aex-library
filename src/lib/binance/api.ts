import { useQuery } from "@tanstack/react-query";
import { BinanceService } from "./service";

export function useGetBinanceSymbolList() {
    return useQuery({
      queryKey: ["binance-symbol-list"],
      queryFn: BinanceService.fetchSymbolList,
    });
  }

export function useGetBinanceSymbolDetails(symbol?: string) {
  return useQuery({
    queryKey: ["binance-symbol-details", symbol],
    queryFn: () => {
      if (!symbol) {
        throw new Error("No Symbol provided");
      }
      return BinanceService.fetchSymbolDetails(symbol);
    },
    enabled: !!symbol,
  });
}

export function useGetBinanceSymbolOrderBook(symbol?: string) {
  return useQuery({
    queryKey: ["binance-symbol-orderbook", symbol],
    queryFn: () => {
      if (!symbol) {
        throw new Error("No Symbol provided");
      }
      return BinanceService.fetchSymbolOrderBook(symbol);
    },
    enabled: !!symbol,
  });
}
