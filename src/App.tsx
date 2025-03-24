import BinanceSymbolList from "./components/Binance/BinanceSymbolList";
import BitgetSymbolList from "./components/Bitget/BitgetSymbolList";
import ByBitSymbolList from "./components/ByBit/ByBitSymbolList";
import MexSymbolList from "./components/Mexc/MexSymbolList";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        {/* <ByBitSymbolList /> */}
        {/* <BitgetSymbolList /> */}
        <MexSymbolList />
        {/* <BinanceSymbolList/> */}
      </QueryProvider>
    </div>
  );
}

export default App;
