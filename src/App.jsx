import SearchProducts from "./components/SearchProducts";

function App() {
  return (
    <>
      <div>
        <div className="header">
          <a href="/">
            <h1>Matkasse</h1>
          </a>
        </div>
        <SearchProducts />
      </div>
    </>
  );
}

export default App;
