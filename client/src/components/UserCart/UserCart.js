import "./UserCart.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getUserCart } from "../../services/custommerOperations";
import Product from "./Product/Product";

export default function UserCart() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryPrice = 5.99;
  const discountedPrice = (subtotal * (1 - discount)).toFixed(2);
  const total = (subtotal + deliveryPrice - discountedPrice).toFixed(2);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserCart(user.username);

      setCart(response.user.bag);

      let allPrices = 0;
      if (cart) {
        for (const product of response.user.bag) {
          allPrices += Number(product.price);

          setSubtotal(allPrices);
        }
      }
    };
    fetchData();
  }, []);

  const handleBagSize = (id, price) => {
    setSubtotal(subtotal - price);
    const filteredCart = cart.filter((productId) => productId.id !== id);
    setCart(filteredCart);
  };

  const handleApplyPromocode = (e) => {
    e.preventDefault();

    if (promocode === user.promocode) {
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
        {cart.map((product) => (
          <Product
            key={product.id}
            product={product}
            username={user.username}
            sendDataToParent={handleBagSize}
          />
        ))}
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
              Total ({cart.length} {cart.length > 1 ? "items" : "item"})
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
