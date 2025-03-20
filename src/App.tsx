import SymbolList from "./components/SymbolList";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <SymbolList />
      </QueryProvider>
    </div>
  );
}

export default App;
