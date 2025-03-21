import BitgetSymbolList from "./components/BitgetSymbolList";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <BitgetSymbolList/>
      </QueryProvider>
    </div>
  );
}

export default App;
