import { Spot, Market } from "mexc-api-sdk";

const API_KEY = "your_api_key"; // Replace with your actual MEXC API Key
const API_SECRET = "your_api_secret"; // Replace with your actual MEXC API Secret

const client = new Spot(API_KEY, API_SECRET);


export class MEXCService {
  /**
   * Create a Spot Order
   */
  static async createOrder(order: {
    symbol: string;
    side: "BUY" | "SELL";
    type: "LIMIT" | "MARKET";
    quantity: number;
    price?: number;
  }) {
    return client.newOrder(order.symbol, order.side, order.type, {
      quantity: order.quantity,
      price: order.price,
    });
  }

  /**
   * Cancel an Order
   */
  static async cancelOrder(symbol: string, orderId: string) {
    return client.cancelOrder(symbol, orderId);
  }

  /**
   * Get Market Data (Ticker Price)
   */
  static async getMarketData() {
    return client.bookTicker();
  }

}
