export class BitgetService {
  /**
   * Fetch list of all spot trading symbols from Bitget
   */
  static async fetchSymbolList(): Promise<{ symbol: string }[]> {
    try {
      const response = await fetch( 
        "https://api.bitget.com/api/spot/v1/public/products"
      );
      const data = await response.json();

      if (!data.data) {
        throw new Error("Invalid response from Bitget API");
      }

      return data.data.map((s: any) => ({
        symbol: s.symbol,
      }));
    } catch (error) {
      console.error("Error fetching Bitget symbol list:", error);
      throw new Error("Failed to fetch Bitget symbol list.");
    }
  }

  /**
   * Fetch details of a specific symbol
   */
  static async fetchSymbolDetails(symbol: string): Promise<any> {
    try {
      const response = await fetch(
        `https://api.bitget.com/api/spot/v1/market/ticker?symbol=${symbol}`
      );
      const data = await response.json();

      if (!data.data) {
        throw new Error(`No data found for symbol: ${symbol}`);
      }

      return data.data;
    } catch (error) {
      console.error(`Error fetching details for ${symbol}:`, error);
      throw new Error(`Failed to fetch details for ${symbol}`);
    }
  }
  /**
   * Fetch order book for a specific symbol
   */
  static async fetchOrderBook(symbol: string): Promise<any> {
    try {
      const response = await fetch(
        `https://api.bitget.com/api/spot/v1/market/depth?symbol=${symbol}&limit=10`
      );
      const data = await response.json();

      if (!data.data) {
        throw new Error(`No order book found for symbol: ${symbol}`);
      }

      return data.data;
    } catch (error) {
      console.error(`Error fetching order book for ${symbol}:`, error);
      throw new Error(`Failed to fetch order book for ${symbol}`);
    }
  }
}
