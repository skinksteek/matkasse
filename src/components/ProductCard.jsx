export const ProductCard = ({ product }) => {
  const storeClass = product.store.toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <article className="product-card">
        {product.imageURL && (
          <img
            className="product-image"
            src={product.imageURL}
            alt={product.name}
          />
        )}

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
            {product.compareOrdinaryPrice.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <footer className={`product-store ${storeClass}`}>
          {product.store}
        </footer>
      </article>
    </>
  );
};
