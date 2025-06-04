import { useState } from "react";
import { fetchProductsByQuery } from "../api/products";

function SearchProducts() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    try {
      const data = await fetchProductsByQuery(query.trim().toLowerCase());
      setResults(data);
    } catch (error) {
      console.error("Fel vid hämtning:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <input
        className=""
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Sök t.ex. kött"
      />
      <button onClick={handleSearch} className="">
        Sök
      </button>
      {loading && <p>Laddar...</p>}
      {!loading && results.length === 0 && query !== "" && (
        <p>Inga produkter matchar din sökning.</p>
      )}
      {results.length > 0 && (
        <ul className="">
          {results.map((p) => (
            <li key={p.id}>
              {p.name} – {p.price} kr/{p.unit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchProducts;
