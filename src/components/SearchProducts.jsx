import { useState, useEffect } from "react";
import { fetchProductsByQuery } from "../api/products";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";
import { FilterControl } from "./FilterControl";
import { SortControl } from "./SortControl";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SearchProducts() {
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState({ store: "" });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

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
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={handleSearch}
        loading={loading}
      />
      <div className="filter-controls">
        <FilterControl filters={filters} setFilters={setFilters} />
        <SortControl
          sortOrder={filters.sortOrder}
          setSortOrder={(sortOrder) => setFilters({ ...filters, sortOrder })}
        />
      </div>

      <ProductGrid results={results} />

      {results.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
}

export default SearchProducts;
