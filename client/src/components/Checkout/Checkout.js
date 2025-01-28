import "./Checkout.css";
import { useState } from "react";

export default function Checkout() {
  const [deliveryPrice, setDeliveryPrice] = useState(5.99);
  const [selectedStandard, setSelectedStandard] = useState(false);
  const [selectedExpress, setSelectedExpress] = useState(false);

  const handleDeliveryOption = (e, option) => {
    e.preventDefault();

    if (option === "standart") {
      setSelectedStandard(true);
      setSelectedExpress(false);
      setDeliveryPrice(5.99);
    } else {
      setSelectedStandard(false);
      setSelectedExpress(true);
      setDeliveryPrice(14.99);
    }
  };

  return (
    <div id="checkout-wrapper">
      <div id="delivery">
        <div
          className={
            selectedStandard ? "delivery-option-active" : "delivery-option"
          }
          onClick={(e) => handleDeliveryOption(e, "standart")}
        >
          <div>
            <h3>Standard Delivery</h3>
            <p>4-6 Business days</p>
          </div>
          <div>
            <p>$5.99</p>
          </div>
        </div>
        <div
          className={
            selectedExpress ? "delivery-option-active" : "delivery-option"
          }
          onClick={(e) => handleDeliveryOption(e, "express")}
        >
          <div>
            <h3>Express Delivery</h3>
            <p>1-2 Business days</p>
          </div>
          <div>
            <p>$14.99</p>
          </div>
        </div>
        <div id="delivery-data">
          <h3>Delivery Details</h3>
          <div id="delivery-names">
            <div className="delivery-input-container">
              <input
                className="delivery-input"
                type="text"
                placeholder="First name..."
              />
            </div>
            <div className="delivery-input-container">
              <input
                className="delivery-input"
                type="text"
                placeholder="Family name..."
              />
            </div>
          </div>
          <div id="delivery-address">
            <div className="delivery-input-container">
              <input
                className="delivery-input"
                type="text"
                placeholder="Street"
              />
            </div>
            <div id="delivery-city">
              <div className="delivery-input-container">
                <input
                  className="delivery-input"
                  type="text"
                  placeholder="City"
                />
              </div>
              <div className="delivery-input-container">
                <input
                  className="delivery-input"
                  type="text"
                  placeholder="ZIP"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="checkout-overview">
        <div id="checkout-overview-title">
          <h3>Overview</h3>
        </div>
        <div className="overview-category">
          <div>
            <h4 className="overview-h4">Subtotal</h4>
          </div>
          <div>
            <h4 className="overview-h4-price">$129.99</h4>
          </div>
        </div>
        <div className="overview-category">
          <div>
            <h4 className="overview-h4">Delivery</h4>
          </div>
          <div>
            <h4 className="overview-h4-price">{deliveryPrice}</h4>
          </div>
        </div>
        <div className="overview-category-discount">
          <div>
            <h4 className="overview-h4">Discount</h4>
          </div>
          <div>
            <h4 className="overview-h4-price">$0</h4>
          </div>
        </div>
        <div className="overview-category">
          <div>
            <h4 className="overview-h4">Total</h4>
          </div>
          <div>
            <h4 className="overview-h4-price">$135.98</h4>
          </div>
        </div>
        <div id="checkout-button-container">
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}
