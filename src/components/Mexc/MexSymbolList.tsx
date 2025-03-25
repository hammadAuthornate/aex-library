import { FC, useEffect, useState } from "react";
import axios from "axios";
import MexSymbolDetails from "./MexSymbolDetails";

const MexSymbolList: FC = () => {
  const [allSymbols, setAllSymbols] = useState<any>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const baseUrl = "http://localhost:3000";
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await axios.get(`${baseUrl}/mexc/symbols`);
        setAllSymbols(response.data);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };
    fetchSymbols();
  }, []);

  return (
    <div>
      <h2>MEXC Spot Trading Symbols</h2>
      <ul style={{ maxHeight: "450px", overflowY: "scroll" }}>
        {allSymbols?.data?.map((symbol: string) => (
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

      {selectedSymbol && <MexSymbolDetails selectedSymbol={selectedSymbol} />}
    </div>
  );
};

export default MexSymbolList;
