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
  const [filters, setFilters] = useState({ store: "", sortOrder: "" });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;
  const [hasSearched, setHasSearched] = useState(false);

  // Reset page när filter ändras
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Hämta produkter när query, page eller filters ändras
  useEffect(() => {
    fetchAndSetResults(query, page, filters);
  }, [query, page, filters]);

  // Funktionen för att hämta produkter
  async function fetchAndSetResults(currentQuery, currentPage, currentFilters) {
    setLoading(true);
    try {
      await delay(400);
      const { data, count } = await fetchProductsByQuery(
        currentQuery.trim().toLowerCase(),
        currentPage,
        limit,
        currentFilters.store,
        currentFilters.sortOrder
      );

      setResults(data);
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.error("Fel vid hämtning:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(inputValue);
    setHasSearched(true);
  };

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

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
        <div className="filter-sort">
          <SortControl
            sortOrder={filters.sortOrder}
            setSortOrder={(sortOrder) => setFilters({ ...filters, sortOrder })}
          />
        </div>
      </div>

      <ProductGrid
        results={results}
        loading={loading}
        hasSearched={hasSearched}
      />

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
