import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "react";

export const ProductGrid = ({ results, hasSearched, query }) => {
  const [errorKey, setErrorKey] = useState(0);

  useEffect(() => {
    if (hasSearched && results.length === 0) {
      setErrorKey((prev) => prev + 1);
    }
  }, [results, hasSearched, query]);

  if (hasSearched && results.length === 0) {
    return (
      <div className="filter-results">
        <p key={`${errorKey}-${query}`}>
          Hittade tyvärr inga rabatterade produkter 😔
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="list-top-anchor" />
      <ul className="grid-list-wrapper">
        {results.map((p) => (
          <li className="grid-list-item" key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </>
  );
};
