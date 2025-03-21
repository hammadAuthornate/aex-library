import BitgetSymbolList from "./components/BitgetSymbolList";
import MexSymbolList from "./components/MexSymbolList";
import SymbolList from "./components/SymbolList";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        {/* <SymbolList/> */}
        {/* <BitgetSymbolList/> */}
        <MexSymbolList/>
      </QueryProvider>
    </div>
  );
}

export default App;
