export const ProductCard = ({ product }) => {
  // Formatera pris
  const hasNumPrice =
    typeof product.price === "number" && !Number.isNaN(product.price);
  const formatted = hasNumPrice
    ? new Intl.NumberFormat("sv-SE", {
        minimumFractionDigits: product.price % 1 ? 2 : 0,
        maximumFractionDigits: product.price % 1 ? 2 : 0,
      }).format(product.price) + " kr"
    : product.priceText || null;

  return (
    <article className="product-card" data-store={product.store}>
      {product.productURL && (
        <a
          className="stretched-link"
          href={product.productURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Öppna ${product.name}`}
        />
      )}

      <div className="media">
        {product.imageURL && (
          <img
            className="product-image"
            src={product.imageURL}
            alt={`Bild på ${product.name}`}
            loading="lazy"
          />
        )}
        <span className="store-pill">{product.store}</span>
      </div>

      <section className="product-information">
        <h2 className="product-name">{product.name}</h2>

        <div className="price-row">
          {product.priceMultipleItems && (
            <span className="badge">{product.priceMultipleItems}</span>
          )}
          <div className={`price${formatted ? "" : " price--na"}`}>
            {formatted ?? "—"}
          </div>
        </div>

        <div className="price-compare-and-volume">
          {product.volume && <p className="product-volume">{product.volume}</p>}
          {product.compareOrdinaryPrice && (
            <p className="compare">
              {product.compareOrdinaryPrice
                .replace(/st(?!\s)/g, "st ")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          )}
        </div>
      </section>
    </article>
  );
};
