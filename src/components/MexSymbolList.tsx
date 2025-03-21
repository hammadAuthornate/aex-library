import { FC, useEffect, useState } from "react";
import { useGetMarketDefaultSymbols } from "../lib/mexc/api";

const MexSymbolList: FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>();
  const {
    data: symbols,
    isLoading,
    isError,
    error,
  } = useGetMarketDefaultSymbols(); // Fetch all symbols
  const BASE_URL = "https://api.mexc.com";
  const endpoint = "/api/v3/defaultSymbols";
  useEffect(() => {
    const marketTokens = async () => {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      console.log(response)
    };
    marketTokens()
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h2>MEXC Spot Trading Symbols</h2>
      <ul style={{ maxHeight: "450px", overflowY: "scroll" }}>
        {symbols?.map(({ symbol }: { symbol: string }) => (
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
    </div>
  );
};

export default MexSymbolList;
