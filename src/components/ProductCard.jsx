export const ProductCard = ({ product }) => {
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
      <span>{product.getMorePrice} - </span>
      <span>{product.compareOrdinaryPrice}</span>
      <p>{product.store}</p>
    </>
  );
};
