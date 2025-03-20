import { useFetchSymbolDetails } from "../lib/bybit/api";

export default function SymbolDetails({
  selectedSymbol,
}: {
  selectedSymbol?: string;
}) {
  const {
    data: symbolDetails,
    isLoading,
    isError,
    error,
  } = useFetchSymbolDetails(selectedSymbol);
  if (!selectedSymbol) {
    return <div>Select a symbol to view details.</div>;
  }

  if (isLoading) {
    return <div>Loading details...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message?.toString()}</div>;
  }

  if (!symbolDetails) {
    return <div>No details available for {selectedSymbol}.</div>;
  }

  return (
    <div>
      <h2>{selectedSymbol} Details</h2>
      <p>Last Price: {symbolDetails.lastPrice}</p>
      <p>High Price 24h: {symbolDetails.highPrice24h}</p>
      <p>Low Price 24h: {symbolDetails.lowPrice24h}</p>
      <p>Volume 24h: {symbolDetails.volume24h}</p>
      <p>Turnover 24h: {symbolDetails.turnover24h}</p>
      {/* Add more details as needed */}
    </div>
  );
}
