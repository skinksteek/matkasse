import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ results, hasSearched }) => {
  if (hasSearched && results.length === 0) {
    return (
      <div className="filter-results">
        <p>Hittade tyvärr inga rabatterade produkter 😔</p>
      </div>
    );
  }

  return (
    <ul className="grid-list-wrapper">
      {results.map((p) => (
        <li className="grid-list-item" key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
};
