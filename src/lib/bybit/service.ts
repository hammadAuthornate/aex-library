import { RestClientV5, TickerSpotV5 } from "bybit-api";

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
}
