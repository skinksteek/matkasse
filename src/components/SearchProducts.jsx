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
        {loading && <span className="loader"></span>}
      </form>

      {results.length > 0 && (
        <ul className="grid-list-wrapper">
          {results.map((p) => (
            <li className="grid-list-item" key={p.id}>
              <img className="product-image" src={p.imageURL} alt={p.name} />
              <h2 className="product-name">{p.name}</h2>
              <h3 className="product-price">
                {p.price}kr - {p.volume}
              </h3>
              <span>{p.getMorePrice} - </span>
              <span>{p.compareOrdinaryPrice}</span>
              <p>{p.store}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchProducts;
