import "./Checkout.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { orderCheckout } from "../../services/custommerOperations";
import { generateTrackingNumber } from "../../services/generateTrackingNumber";

export default function Checkout() {
  const { state } = useLocation();
  const navigation = useNavigate();
  const [deliveryPrice, setDeliveryPrice] = useState(5.99);
  const [selectedStandard, setSelectedStandard] = useState(false);
  const [selectedExpress, setSelectedExpress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState(0);
  const storageEmail = localStorage.getItem("user");

  const { subtotal, discountedPrice, cart } = state;
  const totalPrice = (subtotal + deliveryPrice - discountedPrice).toFixed(2);

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

  const handleCheckout = async (e) => {
    e.preventDefault();

    const checkoutData = {
      shopOwner: cart.user.bag[0].productName,
      user: storageEmail,
      subtotal,
      totalPrice,
      discountedPrice,
      orderedProducts: cart.user.bag,
      firstName,
      lastName,
      street,
      city,
      zipcode,
      dateOfOrder: new Date().toLocaleString(),
      trackingNumber: generateTrackingNumber(),
    };

    const response = await orderCheckout(checkoutData);

    navigation("/");
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
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="delivery-input-container">
              <input
                className="delivery-input"
                type="text"
                placeholder="Family name..."
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div id="delivery-address">
            <div className="delivery-input-container">
              <input
                className="delivery-input"
                type="text"
                placeholder="Street"
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div id="delivery-city">
              <div className="delivery-input-container">
                <input
                  className="delivery-input"
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="delivery-input-container">
                <input
                  className="delivery-input"
                  type="number"
                  placeholder="ZIP"
                  onChange={(e) => setZipcode(e.target.value)}
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
            <h4 className="overview-h4-price">${subtotal}</h4>
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
            <h4 className="overview-h4-price">${discountedPrice}</h4>
          </div>
        </div>
        <div className="overview-category">
          <div>
            <h4 className="overview-h4">Total</h4>
          </div>
          <div>
            <h4 className="overview-h4-price">${totalPrice}</h4>
          </div>
        </div>
        <div id="checkout-button-container" onClick={(e) => handleCheckout(e)}>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}
