import { useState, useEffect } from "react";
import { fetchProductsByQuery } from "../api/products";
import { ProductCard } from "./ProductCard";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SearchProducts() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchAndSetResults(query, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query, page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  async function fetchAndSetResults(currentQuery, currentPage) {
    setLoading(true);
    try {
      await delay(500);
      const { data, count } = await fetchProductsByQuery(
        currentQuery.trim().toLowerCase(),
        currentPage,
        limit
      );
      setResults(data);
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.error("Fel vid hämtning:", error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1); // useEffect trigger
    setQuery(inputValue);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSearch}>
        <div className="search-wrapper">
          <input
            className=""
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Sök t.ex. kött"
          />
          <button type="submit" className="button">
            <span>Sök</span>
          </button>
          {loading && <span className="loader"></span>}
        </div>
      </form>
      <ul className="grid-list-wrapper">
        {results.map((p) => (
          <li className="grid-list-item" key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>

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
