import { useState } from "react";
import { useGetBybitSymbolList } from "../../lib/bybit/api";
import ByBitSymbolDetails from "./ByBitSymbolDetails";

export default function ByBitSymbolList() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>(
    undefined
  );

  const { data: symbols, isLoading, isError, error } = useGetBybitSymbolList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message?.toString()}</div>;
  }

  return (
    <div>
      <h2>ByBit Spot Trading Symbols</h2>
      <ul style={{ maxHeight: "450px", overflowY: "scroll" }}>
        {symbols?.map(({ symbol }) => (
          <li
            key={symbol}
            onClick={() => setSelectedSymbol(symbol)}
            style={{
              cursor: "pointer",
              fontWeight: selectedSymbol === symbol ? "bold" : "normal",
            }}
          >
            {symbol}
          </li>
        ))}
      </ul>
      <ByBitSymbolDetails selectedSymbol={selectedSymbol} />
    </div>
  );
}
