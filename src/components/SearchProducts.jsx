import { useState, useEffect } from "react";
import { fetchProductsByQuery } from "../api/products";

/*Skapar en delay variabel så att användaren behöver vänta en halv sekund innan resultat*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SearchProducts() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchProductsByQuery(query.trim().toLowerCase(), page, limit)
      .then(({ data, count }) => {
        setResults(data);
        setTotalPages(Math.ceil(count / limit));
      })
      .catch((error) => {
        console.error("Fel vid hämtning:", error.message);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, query]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  async function handleSearch(e, newPage = 1) {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await delay(500);
      const { data, count } = await fetchProductsByQuery(
        query.trim().toLowerCase(),
        newPage,
        limit
      );
      setResults(data);

      setPage(newPage);
      setTotalPages(Math.ceil(count / limit));
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
              {p.imageURL && (
                <img className="product-image" src={p.imageURL} alt={p.name} />
              )}
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
      {results.length > 0 && (
        <div className="pagination">
          <button
            className="button-pagination"
            onClick={() => handlePrev()}
            disabled={page <= 1}
          >
            <span>Föregående</span>
          </button>
          <span>
            Sida {page} av {totalPages}
          </span>
          <button
            className="button-pagination"
            onClick={() => handleNext()}
            disabled={page >= totalPages}
          >
            <span>Nästa</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchProducts;
