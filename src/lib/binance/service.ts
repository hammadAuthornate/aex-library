import { MainClient } from "binance";

const API_KEY = "bg_1800489e4f98891c6a91d2542fac61d6"; 
const API_SECRET = "37df025c8c566bae75326fc4904349608334876e8bec9e87aa507f6b510ee914"; 

const client = new MainClient({
  api_key: API_KEY,
  api_secret: API_SECRET,
  baseUrl: "https://testnet.binance.vision", // Testnet API URL
});

export class BinanceService {
  /**
   * Fetches the list of all symbols (tickers) in the spot market.
   */
  static async fetchSymbolList(): Promise<any[]> {
    try {
      const response = await client.getExchangeInfo();
      return response.symbols.map((s: any) => ({ symbol: s.symbol, ...s }));
    } catch (error) {
      console.error("Error fetching symbol list:", error);
      throw new Error("Failed to fetch Binance symbol list.");
    }
  }

  /**
   * Fetches details of a specific symbol.
   */
  static async fetchSymbolDetails(symbol: string): Promise<any | undefined> {
    try {
      const response = await client.get24hrChangeStatististics({ symbol });
      return response;
    } catch (error) {
      console.error(`Error fetching details for ${symbol}:`, error);
      throw new Error(`Failed to fetch details for ${symbol}.`);
    }
  }

  /**
   * Fetches order book data for a given symbol.
   */
  static async fetchSymbolOrderBook(symbol: string): Promise<any> {
    try {
      const response = await client.getOrderBook({ symbol, limit: 10 }); // Adjust limit as needed
      return response;
    } catch (error) {
      console.error(`Error fetching order book for ${symbol}:`, error);
      throw new Error(`Failed to fetch order book for ${symbol}.`);
    }
  }
}


// const API_KEY = "bg_cdfcb092e4ae3947c50705ebc6a66c83"; 
// const API_SECRET = "9f492ff7d4814883f3ac8fe1651f1633d6e437b9a29b19c18e317f946f1c3d49";
// const PASSPHRASE = "45657t8y89u9ipoklmnjbhgfdrgrg";
