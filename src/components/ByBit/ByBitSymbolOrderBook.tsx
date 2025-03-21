import {
  useGetBybitSymbolOrderBook,
  useSubmitBybitOrder,
} from "../../lib/bybit/api";

export default function ByBitSymbolOrderBookDetails({
  selectedSymbol,
}: {
  selectedSymbol?: string;
}) {
  const {
    data: orderBookDetails,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetBybitSymbolOrderBook(selectedSymbol);

  const { mutate } = useSubmitBybitOrder();
  if (!selectedSymbol) {
    return <div>Select a symbol to view details.</div>;
  }

  if (isLoading) {
    return <div>Loading details...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message?.toString()}</div>;
  }

  if (!orderBookDetails) {
    return <div>No details available for {selectedSymbol}.</div>;
  }

  return (
    <div>
      <h2>OrderBook for {selectedSymbol}</h2>
      <div>Bids:</div>
      <button
        onClick={() =>
          mutate(
            { qty: "1", side: "Buy", symbol: selectedSymbol },
            { onSuccess: () => refetch() }
          )
        }
      >
        Place test bid
      </button>
      <div>
        {orderBookDetails?.b?.length === 0 && <div>No Bids available</div>}
        {orderBookDetails?.b?.map((bids, index) => (
          <div key={index}>
            Bid {index + 1}: price {bids?.at(0)} size {bids?.at(1)}
          </div>
        ))}
      </div>
      <div>Asking:</div>
      <div>
        {orderBookDetails?.a?.length === 0 && <div>No Asking available</div>}
        {orderBookDetails?.a?.map((asks, index) => (
          <div key={index}>
            Ask {index + 1}: price {asks?.at(0)} size {asks?.at(1)}
          </div>
        ))}
      </div>
    </div>
  );
}
