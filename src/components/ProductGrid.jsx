import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ results }) => (
  <ul className="grid-list-wrapper">
    {results.map((p) => (
      <li className="grid-list-item" key={p.id}>
        <ProductCard product={p} />
      </li>
    ))}
  </ul>
);
