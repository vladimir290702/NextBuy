import "./Product.css";
import { useState } from "react";

export default function Product({ product }) {
  const [triggeredEdit, setTriggeredEdit] = useState(false);
  const [newQuantity, setNewQuantity] = useState(1);
  const [editButtonText, setEditButtonText] = useState("Edit");

  const QuantityContent = () => {
    if (triggeredEdit) {
      return (
        <p className="cart-product-additional-info">
          Quantity:
          <input
            className="edit-quantity-input"
            value={newQuantity}
            placeholder={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </p>
      );
    } else {
      return (
        <p className="cart-product-additional-info">Quantity: {newQuantity}</p>
      );
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setTriggeredEdit(!triggeredEdit);
    setEditButtonText(triggeredEdit ? "Edit" : "Save");
  };
  console.log(product);

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
        <QuantityContent />
        <div className="cart-product-buttons-container">
          <div className="cart-product-button" onClick={(e) => handleEdit(e)}>
            <button>{editButtonText}</button>
          </div>
          <div className="cart-product-button">
            <button>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
