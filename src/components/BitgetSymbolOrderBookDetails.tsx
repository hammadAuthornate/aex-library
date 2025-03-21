import { useGetBitgetOrderBook } from "../lib/bitget/api";

const BitgetSymbolOrderBookDetails = ({ selectedSymbol }: { selectedSymbol?: string }) => {
  const { data: orderBook, isLoading, isError, error } = useGetBitgetOrderBook(selectedSymbol);

  if (!selectedSymbol) return <div>Select a symbol to view the order book.</div>;
  if (isLoading) return <div>Loading order book...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!orderBook) return <div>No order book data available for {selectedSymbol}.</div>;

  return (
    <div>
      <h3>Order Book for {selectedSymbol}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        <div>
          <h4>Asks (Sell Orders)</h4>
          <ul>
            {orderBook.asks.map(([price, quantity]: [string, string], index: number) => (
              <li key={index}>
                {price} USDT - {quantity}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Bids (Buy Orders)</h4>
          <ul>
            {orderBook.bids.map(([price, quantity]: [string, string], index: number) => (
              <li key={index}>
                {price} USDT - {quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BitgetSymbolOrderBookDetails;
