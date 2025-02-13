import "./Product.css";
import { useState } from "react";
import {
  removeProductFromCart,
  editProductQuantity,
} from "../../../services/custommerOperations";

export default function Product({
  product,
  username,
  sendDataToParent,
  changeQuantity,
}) {
  const [triggeredEdit, setTriggeredEdit] = useState(false);
  const [newQuantity, setNewQuantity] = useState(product.quantity);
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

  const handleEdit = async (e) => {
    e.preventDefault();
    setTriggeredEdit(!triggeredEdit);
    setEditButtonText(triggeredEdit ? "Edit" : "Save");

    if (newQuantity > 0 && editButtonText === "Save") {
      const response = await editProductQuantity(
        product.id,
        newQuantity,
        username
      );

      changeQuantity(response.editQuantity.bag);
    }
  };

  const handleRemoveProduct = async (e) => {
    e.preventDefault();
    sendDataToParent(product.id, product.price);
    const response = await removeProductFromCart(product.id, username);
  };

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
            <button onClick={(e) => handleRemoveProduct(e)}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}
