import { FC, useState, useEffect } from "react";
import axios from "axios";

interface SymbolDetailsProps {
  symbol: string;
}

const BinanceSymbolDetails: FC<SymbolDetailsProps> = ({ symbol }) => {
  const [details, setDetails] = useState<any>(null);
  const [orderBook, setOrderBook] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const baseUrl = "http://localhost:3000";
  useEffect(() => {
    const fetchSymbolDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/binance/symbol`, {
          params: { symbol: symbol },
        });
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching symbol details:", error);
      }
    };

    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(`${baseUrl}/binance/orderbook`, {
          params: {
            symbol: symbol,
          },
        });
        setOrderBook(response.data);
      } catch (error) {
        console.error("Error fetching order book:", error);
      }
    };

    if (symbol) {
      fetchSymbolDetails();
      fetchOrderBook();
    }

    setLoading(false);
  }, [symbol]);

  if (loading) return <p>Loading {symbol} details...</p>;
  if (!details) return <p>No data available for {symbol}</p>;

  return (
    <div style={{ padding: "10px", borderRadius: "8px", marginTop: "10px" }}>
      <h3>{details.symbol} Details</h3>
      <ul>
        <li>
          <strong>Last Price:</strong> {details.lastPrice}
        </li>
        <li>
          <strong>24h Price Change:</strong> {details.priceChange} (
          {details.priceChangePercent}%)
        </li>
        <li>
          <strong>High Price:</strong> {details.highPrice}
        </li>
        <li>
          <strong>Low Price:</strong> {details.lowPrice}
        </li>
        <li>
          <strong>Open Price:</strong> {details.openPrice}
        </li>
        <li>
          <strong>Prev Close Price:</strong> {details.prevClosePrice}
        </li>
        <li>
          <strong>Weighted Avg Price:</strong> {details.weightedAvgPrice}
        </li>
        <li>
          <strong>Bid Price:</strong> {details.bidPrice}
        </li>
        <li>
          <strong>Bid Quantity:</strong> {details.bidQty}
        </li>
        <li>
          <strong>Ask Price:</strong> {details.askPrice}
        </li>
        <li>
          <strong>Ask Quantity:</strong> {details.askQty}
        </li>
        <li>
          <strong>Volume:</strong> {details.volume}
        </li>
        <li>
          <strong>Quote Volume:</strong> {details.quoteVolume}
        </li>
        <li>
          <strong>Open Time:</strong>{" "}
          {new Date(details.openTime).toLocaleString()}
        </li>
        <li>
          <strong>Close Time:</strong>{" "}
          {new Date(details.closeTime).toLocaleString()}
        </li>
        <li>
          <strong>First Trade ID:</strong> {details.firstId}
        </li>
        <li>
          <strong>Last Trade ID:</strong> {details.lastId}
        </li>
        <li>
          <strong>Trade Count:</strong> {details.count}
        </li>
      </ul>

      {/* ORDER BOOK */}
      <h3>Order Book</h3>
      {orderBook ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>
            <h4>Asks</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {orderBook.asks
                .slice(0, 10)
                .map(([price, qty]: [string, string], index: number) => (
                  <li key={`ask-${index}`} style={{ color: "red" }}>
                    {price} - {qty}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4>Bids</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {orderBook.bids
                .slice(0, 10)
                .map(([price, qty]: [string, string], index: number) => (
                  <li key={`bid-${index}`} style={{ color: "green" }}>
                    {price} - {qty}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading order book...</p>
      )}
    </div>
  );
};

export default BinanceSymbolDetails;
