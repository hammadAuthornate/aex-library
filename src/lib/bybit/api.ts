import { useMutation, useQuery } from "@tanstack/react-query";
import { ByBitService } from "./service";
import { OrderSideV5 } from "bybit-api";

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

export function useSubmitBybitOrder() {
  return useMutation({
    mutationKey: ["bybit-symbol-place-order"],
    mutationFn: ({
      symbol,
      qty,
      side,
    }: {
      symbol: string;
      qty: string;
      side: OrderSideV5;
    }) => {
      if (!symbol || !qty) {
        throw new Error("No Symbol or quantity provided");
      }
      return ByBitService.placeOrder(symbol, qty, side);
    },
  });
}
