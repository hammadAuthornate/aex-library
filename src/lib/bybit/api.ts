import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SymbolDetails } from "../../types/bybit";

export function useFetchSymbolList() {
  return useQuery({
    queryKey: ["bybit-symbol-list"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.bybit.com/v5/market/tickers",
        {
          params: {
            category: "spot",
          },
        }
      );
      const symbols: string[] = response.data.result.list.map(
        (item: { symbol: string }) => item.symbol
      );
      return symbols;
    },
  });
}

export function useFetchSymbolDetails(symbol?: string) {
  return useQuery({
    queryKey: ["bybit-symbol-details", symbol],
    queryFn: async () => {
      if (!symbol) {
        throw Error("No Symbol provided");
      }
      const response = await axios.get(
        "https://api.bybit.com/v5/market/tickers",
        {
          params: {
            category: "spot",
            symbol: symbol,
          },
        }
      );
      const symbolDetails: SymbolDetails = response.data.result.list[0];
      return symbolDetails;
    },
  });
}
