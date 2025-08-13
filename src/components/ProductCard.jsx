export const ProductCard = ({ product }) => {
  const storeClass = product.store.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <article className="product-card">
        {product.imageURL && (
          <img
            className="product-image"
            src={product.imageURL}
            alt={`Bild på ${product.name}`}
          />
        )}
        <section className="product-information">
          <h2 className="product-name">{product.name}</h2>

          <div className="product-price-volume">
            <p className="product-price">
              {product.priceMultipleItems && `${product.priceMultipleItems} `}
              {product.price}
            </p>
            <p className="product-volume">{product.volume}</p>
          </div>
          <div className="product-offer">
            <p>{product.getMorePrice}</p>
            <p>
              {product.compareOrdinaryPrice
                .replace(/st(?!\s)/g, "st ")
                .split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </div>
        </section>
        <footer className={`product-store ${storeClass}`}>
          {product.store}
        </footer>
      </article>
    </>
  );
};
