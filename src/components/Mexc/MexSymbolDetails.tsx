import { FC, useEffect, useState } from "react";
import axios from "axios";

interface SymbolDetails {
  [key: string]: any;
}

interface OrderBook {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
  timestamp: number;
}

const MexSymbolDetails: FC<{ selectedSymbol: string }> = ({
  selectedSymbol,
}) => {
  const [symbolDetails, setSymbolDetails] = useState<SymbolDetails | null>(
    null
  );
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const baseUrl = "http://localhost:3000";
  useEffect(() => {
    const fetchSymbolDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const [symbolResponse, orderBookResponse] = await Promise.all([
          axios.get(`${baseUrl}/mexc/exchangeInfo`, {
            params: { symbol: selectedSymbol },
          }),
          axios.get(`${baseUrl}/mexc/orderBook`, {
            params: { symbol: selectedSymbol, limit: 10 },
          }),
        ]);
        setSymbolDetails(symbolResponse.data);
        setOrderBook(orderBookResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSymbolDetails();
  }, [selectedSymbol]);
  if (isLoading) return <div>Loading details...</div>;
  if (isError) return <div>Error fetching details for {selectedSymbol}.</div>;
  if (!symbolDetails)
    return <div>No details available for {selectedSymbol}.</div>;
  return (
    <div>
      <h2>{symbolDetails.symbol} Details</h2>
      <table
        border={1}
        cellPadding="5"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <tbody>
          {Object.entries(symbolDetails).map(([key, value]) => (
            <tr key={key}>
              <td>
                <strong>{key}</strong>
              </td>
              <td>
                {Array.isArray(value) ? value.join(", ") : value?.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Order Book Section */}
      {orderBook && (
        <div>
          <h3>{selectedSymbol} Order Book (Top 10)</h3>
          <p>
            <strong>Last Update ID:</strong> {orderBook.lastUpdateId}
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {/* Bids Table */}
            <div>
              <h4>Bids</h4>
              <table
                border={1}
                cellPadding="5"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderBook.bids.map(([price, quantity], index) => (
                    <tr key={index}>
                      <td>{price}</td>
                      <td>{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Asks Table */}
            <div>
              <h4>Asks</h4>
              <table
                border={1}
                cellPadding="5"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderBook.asks.map(([price, quantity], index) => (
                    <tr key={index}>
                      <td>{price}</td>
                      <td>{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(orderBook.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default MexSymbolDetails;
