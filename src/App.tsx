import BitgetSymbolList from "./components/BitgetSymbolList";
import ByBitSymbolList from "./components/ByBit/ByBitSymbolList";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <ByBitSymbolList />
        <BitgetSymbolList/>
      </QueryProvider>
    </div>
  );
}

export default App;
