import "./Product.css";

export default function Product({ product }) {
  return (
    <div className="cart-product" key={product.id}>
      <div className="cart-product-image-container">
        <img src={product.images[0]} alt={product.productName} />
      </div>
      <div className="cart-product-details">
        <p className="cart-product-name">
          {product.productName}-{product.model}
        </p>
        <p className="cart-product-price">${product.price}</p>
        <p className="cart-product-additional-info">Color: {product.color}</p>
        <p className="cart-product-additional-info">Size: {product.size}</p>
        <p className="cart-product-additional-info">Quantity: 1</p>
        <div className="cart-product-buttons-container">
          <div className="cart-product-button">
            <button>Edit</button>
          </div>
          <div className="cart-product-button">
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
