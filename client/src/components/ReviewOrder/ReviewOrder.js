import "./ReviewOrder.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { FaCheck } from "react-icons/fa";
export default function ReviewOrder({ item }) {
  const { state } = useLocation();
  const [animate, setAnimate] = useState(false);
  const [newStatus, setNewStatus] = useState(null);

  const statuses = ["pre-transit", "in-transit", "delivered"];
  const statusIndex = statuses.indexOf("in-transit");

  console.log(newStatus);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100); // Small delay to start animation smoothly
  }, []);

  return (
    <div id="review-order-container">
      <ShopProfileSidebar />
      <div id="review-order-wrapper">
        <div className={`review-order-container ${animate ? "slide-in" : ""}`}>
          {/* Step 1 */}
          <div className={`circle ${statusIndex >= 0 ? "active" : ""}`}>
            <FaCheck />
          </div>
          <div
            className={`line ${statusIndex >= 1 ? "fill step-1" : ""}`}
          ></div>

          {/* Step 2 */}
          <div className={`circle ${statusIndex >= 1 ? "active" : ""}`}>
            <FaCheck />
          </div>
          <div
            className={`line ${statusIndex >= 2 ? "fill step-2" : ""}`}
          ></div>

          {/* Step 3 */}
          <div className={`circle ${statusIndex >= 2 ? "active" : ""}`}>
            <FaCheck />
          </div>
        </div>
        <div id="review-order-product-information-and-shipping-wrapper">
          <div id="review-order-shipping-information">
            <h2>Ship to:</h2>
            <div id="review-order-address-information">
              <p>
                {state.order.firstName} {state.order.lastName}
              </p>
              <p>{state.order.street}</p>
              <p>
                {state.order.city} {state.order.zipcode}
              </p>
            </div>
          </div>
          <div id="review-order-shipping-details">
            <div id="review-order-status">
              <p>Change status:</p>
              <div id="review-order-status-dropdown">
                <select onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="pre-transit">Pre-Transit</option>
                  <option value="in-transit">In Transit</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="review-order-images-container">
          <div>
            <h3>Item(s):</h3>
            {state.order.orderedProducts.map((product) => {
              return (
                <div
                  className="review-order-image-container"
                  key={product.model}
                >
                  <div>
                    <img src={product.images[0]} alt={product.productName} />
                  </div>
                  <div className="review-order-product-description">
                    <h1 className="review-order-product-model">
                      {product.productName} {product.model}
                    </h1>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                    <p>Qantity: {product.quantity}</p>
                    <p>Total: ${product.price * product.quantity}</p>
                    <p>Arrives: Fri, 19/04 - Mon, 21/04</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div id="review-order-contact-custommer-container">
          <div id="review-order-contact-custommer">
            <h2>Contact custommer:</h2>

            <p>Email: {state.order.user}</p>
            <p>
              Name: {state.order.firstName} {state.order.lastName}
            </p>
          </div>
        </div>
        <div id="review-order-button-container">
          <div id="save-changes-button-wrapper">
            <button>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
