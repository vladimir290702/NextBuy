import "./UserCart.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function UserCart() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryPrice = 5.99;
  const discountedPrice = (subtotal * (1 - discount)).toFixed(2);
  const total = (subtotal + deliveryPrice - discountedPrice).toFixed(2);

  useEffect(() => {
    let allPrices = 0;
    if (user?.bag) {
      for (const product of user?.bag) {
        allPrices += Number(product.price);

        setSubtotal(allPrices);
      }
    }
  }, []);

  const handleApplyPromocode = (e) => {
    e.preventDefault();

    if (promocode === user.user.promocode) {
      setDiscount(0.9);
    }
  };

  const handleProcceedToCheckout = (e) => {
    e.preventDefault();

    const checkoutData = {
      subtotal,
      total,
      discountedPrice,
      cart: user.bag,
    };

    navigate("/checkout", { state: checkoutData });
  };
  return (
    <div id="cart-wrapper">
      <div id="cart-products">
        <div className="cart-section">
          <h3>Your Shopping Cart</h3>
        </div>
        {user.bag.map((product) => {
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
                <p className="cart-product-additional-info">
                  Color: {product.color}
                </p>
                <p className="cart-product-additional-info">
                  Size: {product.size}
                </p>
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
        })}
      </div>
      <div id="cart-overview">
        <div className="cart-section">
          <h3>Overview</h3>
        </div>
        <div id="overview-subtotal">
          <div>
            <p>Subtotal</p>
          </div>
          <div className="overview-prices-container">
            <p>${subtotal}</p>
          </div>
        </div>
        <div id="overview-delivery">
          <div>
            <p>Delivery</p>
            <p id="overview-delivery-additional">
              Standard delivery within 5 - 6 working days
            </p>
          </div>
          <div className="overview-prices-container">
            <p>$ {deliveryPrice}</p>
          </div>
        </div>
        <div id="overview-discount">
          <div>
            <p>Product Discount</p>
          </div>
          <div className="overview-prices-container">
            <p>{discountedPrice}</p>
          </div>
        </div>
        <div id="overview-promocode-section">
          <div>
            <p>Got a promocode?</p>
          </div>
          <div id="promocode-container">
            <div id="promocode-input">
              <input
                type="text"
                placeholder="Enter promocode"
                onChange={(e) => setPromocode(e.target.value)}
              />
            </div>
            <div
              id="promocode-apply-button"
              onClick={(e) => handleApplyPromocode(e, promocode)}
            >
              <button>Apply</button>
            </div>
          </div>
        </div>
        <div id="overview-total-items">
          <div>
            <p>
              Total ({user?.bag.length}{" "}
              {user?.bag.length > 1 ? "items" : "item"})
            </p>
          </div>
          <div className="overview-prices-container">
            <p>${total}</p>
          </div>
        </div>
        <div id="procceed-button" onClick={(e) => handleProcceedToCheckout(e)}>
          <button>Procceed To Checkout</button>
        </div>
      </div>
    </div>
  );
}
