import { OrderbookResponseV5, RestClientV5, TickerSpotV5 } from "bybit-api";

const client = new RestClientV5({ testnet: true });

export class ByBitService {
  static async fetchSymbolList(): Promise<TickerSpotV5[]> {
    const response = await client.getTickers({ category: "spot" });
    return response.result.list;
  }

  static async fetchSymbolDetails(
    symbol: string
  ): Promise<TickerSpotV5 | undefined> {
    const response = await client.getTickers({
      category: "spot",
      symbol: symbol,
    });
    return response.result.list?.at(0);
  }

  static async fetchSymbolOrderBook(symbol: string): Promise<OrderbookResponseV5> {
    const response = await client.getOrderbook({
      category: "spot",
      symbol: symbol,
    });
    return response.result;
  }
}
