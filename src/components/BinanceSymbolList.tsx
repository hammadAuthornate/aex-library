import { FC, useState } from "react";
import { useGetBinanceSymbolList } from "../lib/binance/api";

const BinanceSymbolList: FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>(undefined);

  const { data: symbols, isLoading, isError, error } = useGetBinanceSymbolList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <h2>Spot Trading Symbols</h2>
      <ul style={{ maxHeight: "450px", overflowY: "scroll", listStyle: "none", padding: 0 }}>
        {symbols?.map(({ symbol }: { symbol: string }) => (
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
    </div>
  );
};

export default BinanceSymbolList;
