import "./DropdownCart.css";

export default function DropdownCart({ product }) {
  return (
    <div className="dropdown-products-container">
      <div className="dropdown-image-container">
        <img src={product.images[0]} alt="" />
      </div>
      <div className="dropdown-product-details">
        <h4>
          {product.productName} - {product.model}
        </h4>
        <p>{product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Size: {product.size}</p>
        <p>Color: {product.color}</p>
      </div>
    </div>
  );
}
