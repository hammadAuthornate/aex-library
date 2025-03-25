import { FC, useState } from "react";
import axios from "axios";

interface SymbolDetails {
  [key: string]: any;
}

const MexcNewOrder: FC = () => {
  const [symbol, setSymbol] = useState("MXUSDT");
  const [side, setSide] = useState("BUY");
  const [type, setType] = useState("LIMIT");
  const [quantity, setQuantity] = useState("50");
  const [price, setPrice] = useState("0.1");
  const [symbolDetails, setSymbolDetails] = useState<SymbolDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const baseUrl = "http://localhost:3000";
  const fetchSymbolDetails = async () => {
    setIsLoading(true);
    setIsError(false);
    const data = {
      symbol,
      side,
      type,
      quantity,
      price,
    };
    try {
      const response = await axios.post(`${baseUrl}/mexc/newOrder`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSymbolDetails(response.data.details);
    } catch (error) {
      console.error("Error fetching symbol details:", error);
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>New MEXC Order</h2>
      <div>
        <label>Symbol: </label>
        <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
          <option value="MXUSDT">MXUSDT</option>
          <option value="BTCUSDT">BTCUSDT</option>
          <option value="ETHUSDT">ETHUSDT</option>
        </select>
      </div>
      <div>
        <label>Side: </label>
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </div>
      <div>
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="LIMIT">LIMIT</option>
          <option value="MARKET">MARKET</option>
        </select>
      </div>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button onClick={fetchSymbolDetails} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Details"}
      </button>
      {isError && <div>Error fetching details.</div>}
      {symbolDetails && (
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
                  <td>{Array.isArray(value) ? value : value?.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MexcNewOrder;
