import { useQuery } from "@tanstack/react-query";
import { source } from "../types/common";
import { BinanceService } from "./binance/service";
import { BitgetService } from "./bitget/service";
import { ByBitService } from "./bybit/service";

export function useGetSymbolList(source: source) {
  return useQuery({
    queryKey: ["symbol-list"],
    queryFn: () => {
      switch (source) {
        case "binance":
          BinanceService.fetchSymbolList();
          break;
        case "bitget":
          BitgetService.fetchSymbolList();
          break;
        case "bybit":
          ByBitService.fetchSymbolList();
          break;
        case "mexc":
          //   BinanceService.fetchSymbolList();
          break;

        default:
          break;
      }
    },
  });
}