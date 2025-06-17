import "./UserCart.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getUserCart } from "../../services/custommerOperations";
import Product from "./Product/Product";
import { RingLoader } from "react-spinners";

export default function UserCart() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("Bag")) || null
  );
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryPrice = 5.99;
  const discountedPrice = (subtotal * (1 - discount)).toFixed(2);
  const total = (subtotal + deliveryPrice - discountedPrice).toFixed(2);
  const [loading, setLoading] = useState(cart ? false : true);

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        try {
          setLoading(true);

          const response = await getUserCart(user.username);

          let allPrices = 0;
          if (cart) {
            for (const product of response.user.bag) {
              allPrices += Number(product.price) * Number(product.quantity);

              setSubtotal(allPrices);
            }
          }

          localStorage.setItem("Bag", JSON.stringify(response.user.bag));

          setTimeout(() => {
            setCart(response.user.bag);
            setLoading(false);
          }, 1000);
        } catch (err) {
          console.error("Error fetching products:", err);
          setLoading(false);
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

  const handleQuantityChange = (newCart) => {
    setCart(newCart);
    let allPrices = 0;

    for (const product of newCart) {
      allPrices += Number(product.price) * Number(product.quantity);

      setSubtotal(allPrices);
    }
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

  const handleNavigate = (e) => {
    e.preventDefault();

    navigate("/apparel");
  };

  return (
    <div id="cart-wrapper">
      <div id="cart-products">
        <div className="cart-section">
          <h3>Your Shopping Cart</h3>
        </div>
        {!loading && cart.length !== 0 ? (
          cart.length === 0 ? (
            <div id="no-products-content">
              <h2>You have no products in cart...</h2>
              <button onClick={(e) => handleNavigate(e)}>Shop now!</button>
            </div>
          ) : (
            cart.map((product) => (
              <Product
                key={product.id}
                product={product}
                username={user.username}
                sendDataToParent={handleBagSize}
                changeQuantity={handleQuantityChange}
              />
            ))
          )
        ) : (
          <div id="apparel-loader-container">
            <RingLoader id="apparel-loader" color="#001f54" size={150} />
            <h2>Wait a second, the products are ariving!</h2>
          </div>
        )}
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
            <p>${subtotal.toFixed(2)}</p>
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
              Total ({cart?.length} {cart?.length > 1 ? "items" : "item"})
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
