import {
  AccountOrderV5,
  OrderbookResponseV5,
  OrderResultV5,
  RestClientV5,
  TickerSpotV5,
} from "bybit-api";

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

  static async fetchSymbolOrderBook(
    symbol: string
  ): Promise<OrderbookResponseV5> {
    const response = await client.getOrderbook({
      category: "spot",
      symbol: symbol,
    });
    return response.result;
  }

  static async placeOrder(symbol: string): Promise<OrderResultV5> {
    const response = await client.submitOrder({
      category: "spot",
      symbol: symbol,
      side: "Buy",
      orderType: "Market",
      qty: "1",
    });
    return response.result;
  }

  static async amendOrder(
    symbol: string,
    orderId: string
  ): Promise<OrderResultV5> {
    const response = await client.amendOrder({
      category: "spot",
      symbol: symbol,
      orderId: orderId,
    });
    return response.result;
  }

  static async cancelOrder(
    symbol: string,
    orderId: string
  ): Promise<OrderResultV5> {
    const response = await client.cancelOrder({
      category: "spot",
      symbol: symbol,
      orderId: orderId,
    });
    return response.result;
  }

  static async getOrderStatus(
    symbol: string,
    orderId: string
  ): Promise<AccountOrderV5 | undefined> {
    const response = await client.getActiveOrders({
      category: "spot",
      symbol: symbol,
      orderId: orderId,
    });
    return response.result.list?.at(0);
  }
}
