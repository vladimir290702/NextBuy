import "./ReviewOrder.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { FaCheck } from "react-icons/fa";
import Modal from "../Modal/Modal";

export default function ReviewOrder({ item }) {
  const { state } = useLocation();
  const [animate, setAnimate] = useState(false);
  const [newStatus, setNewStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const statuses = ["pre-transit", "in-transit", "delivered"];
  const statusIndex = statuses.indexOf("in-transit");

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  const handleSaveChangesClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    setIsOpen(false);
  };

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
                {state.firstName} {state.lastName}
              </p>
              <p>{state.street}</p>
              <p>
                {state.city} {state.zipcode}
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
            <div
              className="review-order-image-container"
              key={state.item.model}
            >
              <div>
                <img src={state.item.images[0]} alt={state.item.productName} />
              </div>
              <div className="review-order-product-description">
                <h1 className="review-order-product-model">
                  {state.item.productName} {state.item.model}
                </h1>
                <p>Category: {state.item.category}</p>
                <p>Price: ${state.item.price}</p>
                <p>Qantity: {state.item.quantity}</p>
                <p>Total: ${state.item.price * state.item.quantity}</p>
                <p>Arrives: Fri, 19/04 - Mon, 21/04</p>
              </div>
            </div>
          </div>
        </div>
        <div id="review-order-contact-custommer-container">
          <div id="review-order-contact-custommer">
            <h2>Contact custommer:</h2>

            <p>Email: {state.email}</p>
            <p>
              Name: {state.firstName} {state.lastName}
            </p>
          </div>
        </div>
        <div id="review-order-button-container">
          <div
            id="save-changes-button-wrapper"
            onClick={(e) => handleSaveChangesClick(e)}
          >
            <button>Save Changes</button>
          </div>
        </div>
      </div>
      {isOpen ? <Modal handleClose={handleClose} /> : null}
    </div>
  );
}
