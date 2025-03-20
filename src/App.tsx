import SymbolList from "./components/SymbolList";
import SymbolDetails from "./components/SymbolDetails";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <div className="App">
      <QueryProvider>
        <SymbolList />
        <SymbolDetails />
      </QueryProvider>
    </div>
  );
}

export default App;
