import SearchProducts from "./components/SearchProducts";
import logo from "./assets/images/logo-transparent.png";
import useMobileZoomGuard from "./hooks/useMobileZoomGuard";

function App() {
  useMobileZoomGuard();
  return (
    <div>
      <div className="header">
        <a href="/matkasse/">
          <img className="logo" src={logo} alt="Matkasse Logo" />
        </a>
      </div>
      <SearchProducts />
    </div>
  );
}

export default App;
