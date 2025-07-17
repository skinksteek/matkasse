export const ProductCard = ({ product }) => {
  const storeClass = product.store.toLowerCase().replace(/\s+/g, "-");
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
      <h3 className="product-price">
        {product.price}kr - {product.volume}
      </h3>
      <div className="product-price-comparison">
        <span>{product.getMorePrice} - </span>
        <span>{product.compareOrdinaryPrice}</span>
      </div>

      <footer className={`product-store ${storeClass}`}>{product.store}</footer>
    </>
  );
};
