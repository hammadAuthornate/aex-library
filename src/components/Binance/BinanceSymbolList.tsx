import { FC, useState, useEffect } from "react";
import axios from "axios";
import BinanceSymbolDetails from "./BinanceSymbolDetails";

const BinanceSymbolList: FC = () => {
  const [symbols, setSymbols] = useState<{ symbol: string }[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const baseUrl = "http://localhost:5000";
  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await axios.get(`${baseUrl}/binance/api/exchangeInfo`);
        setSymbols(response.data);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      }
    };
    fetchSymbols();
  }, []);

  return (
    <div>
      <h2>Binance Spot Trading Symbols</h2>
      <ul style={{ maxHeight: "450px", overflowY: "scroll", padding: 0 }}>
        {symbols.map(({ symbol }) => (
          <li
            key={symbol}
            onClick={() => setSelectedSymbol(symbol)}
            style={{
              cursor: "pointer",
              padding: "5px",
              fontWeight: selectedSymbol === symbol ? "bold" : "normal",
            }}
          >
            {symbol}
          </li>
        ))}
      </ul>

      {selectedSymbol && <BinanceSymbolDetails symbol={selectedSymbol} />}
    </div>
  );
};

export default BinanceSymbolList;
