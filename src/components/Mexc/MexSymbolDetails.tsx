// import { useGetMarketData } from "../../lib/mexc/api";

// const MexSymbolDetails = ({ selectedSymbol }: { selectedSymbol?: string }) => {
//   const { data: symbolDetails, isLoading, isError, error } = useGetMarketData(selectedSymbol);

//   if (!selectedSymbol) return <div>Select a symbol to view details.</div>;
//   if (isLoading) return <div>Loading details...</div>;
//   if (isError) return <div>Error: {error?.message}</div>;
//   if (!symbolDetails) return <div>No details available for {selectedSymbol}.</div>;

//   return (
//     <div>
//       <h2>{selectedSymbol} Details</h2>
//       <p>Last Price: {symbolDetails.close}</p>
//       <p>High Price 24h: {symbolDetails.high24h}</p>
//       <p>Low Price 24h: {symbolDetails.low24h}</p>
//       <p>Volume 24h: {symbolDetails.baseVol}</p>
//       <p>Turnover 24h: {symbolDetails.quoteVol}</p>
//     </div>
//   );
// };

// export default MexSymbolDetails;
