import { FC, useState } from "react";
import axios from "axios";

const MexCancelOrder: FC = () => {
  const [symbol, setSymbol] = useState("");
  const [orderId, setOrderId] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const baseUrl = "http://localhost:3000";
  const handleCancelOrder = async () => {
    if (!symbol || !orderId) {
      setCancelMessage("Symbol and Order ID are required");
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setCancelMessage("");
    try {
      const response = await axios.post(`${baseUrl}/mexc/cancelOrder`, {
        symbol,
        orderId,
      });
      setCancelMessage(`Order canceled: ${JSON.stringify(response.data)}`);
    } catch (error: any) {
      console.error("Error canceling order:", error);
      setIsError(true);
      setCancelMessage("Failed to cancel order");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Cancel MEXC Order</h2>
      <div>
        <label>Symbol:</label>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter symbol"
        />
      </div>
      <div>
        <label>Order ID:</label>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
      </div>
      <button onClick={handleCancelOrder} disabled={isLoading}>
        {isLoading ? "Canceling..." : "Cancel Order"}
      </button>
      {cancelMessage && (
        <p style={{ color: isError ? "red" : "green" }}>{cancelMessage}</p>
      )}
    </div>
  );
};

export default MexCancelOrder;
