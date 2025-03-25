import { FC, useState } from "react";
import axios from "axios";

interface OrderData {
  [key: string]: string | number | boolean;
}

const MexQueryOrder: FC<{ selectedSymbol: string }> = ({ selectedSymbol }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderId, setOrderId] = useState("");
  const [origClientOrderId, setOrigClientOrderId] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const baseUrl = "http://localhost:3000";
  const fetchOrderData = async () => {
    if (!orderId && !origClientOrderId) {
      alert("Please enter either Order ID or Client Order ID");
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(`${baseUrl}/mexc/queryOrder`, {
        params: {
          symbol: selectedSymbol,
          orderId: orderId || undefined,
          origClientOrderId: origClientOrderId || undefined,
        },
      });
      setOrderData(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Order Details for {selectedSymbol}</h2>
      <div>
        <label>Order ID: </label>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div>
        <label>Client Order ID: </label>
        <input
          type="text"
          placeholder="Client Order ID"
          value={origClientOrderId}
          onChange={(e) => setOrigClientOrderId(e.target.value)}
        />
      </div>
      <button onClick={fetchOrderData}>Fetch Order</button>
      {isLoading && <div>Loading order data...</div>}
      {isError && <div>Error fetching order data.</div>}
      {orderData && (
        <table
          border={1}
          cellPadding="5"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <tbody>
            {Object.entries(orderData)
              .reduce((rows, [key, value], index, arr) => {
                if (index % 2 === 0) {
                  rows.push([
                    [key, value],
                    arr[index + 1] ? arr[index + 1] : ["", ""],
                  ]);
                }
                return rows;
              }, [] as [[string, any], [string, any]][])
              .map(([col1, col2], idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{col1[0]}</strong>: {col1[1].toString()}
                  </td>
                  <td>
                    <strong>{col2[0]}</strong>: {col2[1].toString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MexQueryOrder;
