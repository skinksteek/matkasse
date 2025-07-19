export const ProductCard = ({ product }) => {
  const storeClass = product.store.toLowerCase().replace(/\s+/g, "-");
  {
    console.log("CITYGROSS PRODUKT:", product);
  }
  return (
    <>
      {product.imageURL && (
        <img
          className="product-image"
          src={product.imageURL}
          alt={product.name}
        />
      )}
      <h2 className="product-name">{product.name}</h2>
      <div className="product-values">
        <h3 className="product-price">
          {product.price ? (
            <>
              {product.priceMultipleItems && `${product.priceMultipleItems} `}
              {product.price}
              <h4 className="product-volume">{product.volume}</h4>
            </>
          ) : (
            <span className="product-no-price">No price available</span>
          )}
        </h3>
      </div>
      <div className="product-price-comparison">
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

      <footer className={`product-store ${storeClass}`}>{product.store}</footer>
    </>
  );
};
