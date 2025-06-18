import { useState } from "react";
import { fetchProductsByQuery } from "../api/products";

/*Skapar en delay variabel så att användaren behöver vänta en halv sekund innan resultat*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SearchProducts() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await delay(500);
      const data = await fetchProductsByQuery(query.trim().toLowerCase());
      setResults(data);
    } catch (error) {
      console.error("Fel vid hämtning:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSearch}>
        <div className="search-wrapper">
          <input
            className=""
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök t.ex. kött"
          />

          <button type="submit" className="button">
            <span>Sök</span>
          </button>
        </div>

        {loading && <p>Laddar...</p>}
        {results.length > 0 && (
          <div className="list-wrapper">
            <ul className="">
              {results.map((p) => (
                <li key={p.id}>
                  {p.name} – {p.price} {p.store} {p.volume} {p.getMorePrice}
                  {p.compareOrdinaryPrice}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchProducts;
