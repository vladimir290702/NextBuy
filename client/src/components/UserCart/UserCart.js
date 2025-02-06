import "./UserCart.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { getUserCart } from "../../services/custommerOperations";

export default function UserCart() {
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [cart, setCart] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const deliveryPrice = 7.99;
  const total = ((subtotal + deliveryPrice) * discount).toFixed(2);
  const discountedPrice = (subtotal + deliveryPrice - total).toFixed(2);
  const storageEmail = localStorage.getItem("user");

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getUserCart(storageEmail);
      login(response);
      setCart(response);

      let allPrices = 0;
      if (response?.user?.bag) {
        for (const product of response?.user?.bag) {
          allPrices += Number(product.price);

          setSubtotal(allPrices);
        }
      }
    };
    fetchedShopData();
  }, []);

  const handleApplyPromocode = (e) => {
    e.preventDefault();

    if (promocode === user.user.promocode) {
      setDiscount(0.9);
    }
  };

  const handleProcceedToCheckout = (e) => {
    e.preventDefault();

    navigate("/checkout");
  };
  return (
    <div id="cart-wrapper">
      <div id="cart-products">
        <div className="cart-section">
          <h3>Your Shopping Cart</h3>
        </div>
        {cart?.user?.bag.map((product) => {
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
            <p>$ 7.99</p>
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
              Total ({cart?.user?.bag.length}{" "}
              {cart?.user?.bag.length > 1 ? "items" : "item"})
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
