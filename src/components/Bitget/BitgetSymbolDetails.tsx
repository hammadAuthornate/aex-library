import { useGetBitgetSymbolDetails } from "../../lib/bitget/api";
import BitgetSymbolOrderBookDetails from "./BitgetSymbolOrderBookDetails";

const BitgetSymbolDetails = ({ selectedSymbol }: { selectedSymbol?: string }) => {
  const { data: symbolDetails, isLoading, isError, error } = useGetBitgetSymbolDetails(selectedSymbol);
  console.log(symbolDetails)
  if (!selectedSymbol) return <div>Select a symbol to view details.</div>;
  if (isLoading) return <div>Loading details...</div>;
  if (isError) return <div>Error fetching details for {selectedSymbol}.</div>;
  if (!symbolDetails) return <div>No details available for {selectedSymbol}.</div>;

  return (
    <div>
      <h2>{selectedSymbol} Details</h2>
      <p>Last Price: {symbolDetails.close}</p>
      <p>High Price 24h: {symbolDetails.high24h}</p>
      <p>Low Price 24h: {symbolDetails.low24h}</p>
      <p>Volume 24h: {symbolDetails.baseVol}</p>
      <p>Turnover 24h: {symbolDetails.quoteVol}</p>
      <BitgetSymbolOrderBookDetails selectedSymbol={selectedSymbol} />
    </div>
  );
};

export default BitgetSymbolDetails;
