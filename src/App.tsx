import BitgetSymbolList from "./components/BitgetSymbolList";
import ByBitSymbolList from "./components/ByBit/ByBitSymbolList";
import MexSymbolList from "./components/MexSymbolList";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <ByBitSymbolList/>
        <BitgetSymbolList/>
        <MexSymbolList/>
      </QueryProvider>
    </div>
  );
}

export default App;
