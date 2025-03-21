import { FC, useState } from "react";
import { useGetBitgetSymbolList } from "../lib/bitget/api";
import BitgetSymbolDetails from "./BitgetSymbolDetails";

const BitgetSymbolList: FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>(undefined);

  const { data: symbols, isLoading, isError, error } = useGetBitgetSymbolList();
console.log(symbols)
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2>Bitget Spot Trading Symbols</h2>
      <ul style={{ maxHeight: "450px", overflowY: "scroll" }}>
        {symbols?.map(({ symbol }) => (
          <li
            key={symbol}
            onClick={() => setSelectedSymbol(symbol)}
            style={{
              cursor: "pointer",
              fontWeight: selectedSymbol === symbol ? "bold" : "normal",
              padding: "5px",
            }}
          >
            {symbol}
          </li>
        ))}
      </ul>
      {selectedSymbol && <BitgetSymbolDetails selectedSymbol={selectedSymbol} />}
    </div>
  );
};

export default BitgetSymbolList;
