import axios from "axios";
import { SymbolDetails } from "../../types/bybit";

export class ByBitService {
  static async fetchSymbolList(): Promise<string[]> {
    const response = await axios.get(
      "https://api.bybit.com/v5/market/tickers",
      {
        params: {
          category: "spot",
        },
      }
    );
    return response.data.result.list.map(
      (item: { symbol: string }) => item.symbol
    );
  }

  static async fetchSymbolDetails(symbol: string): Promise<SymbolDetails> {
    const response = await axios.get(
      "https://api.bybit.com/v5/market/tickers",
      {
        params: {
          category: "spot",
          symbol: symbol,
        },
      }
    );
    return response.data.result.list[0];
  }
}
