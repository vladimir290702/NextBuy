import "./UserCart.css";

export default function UserCart() {
  return (
    <div id="cart-wrapper">
      <div id="cart-products">
        <div className="cart-section">
          <h3>Your Shopping Cart</h3>
        </div>
        <div className="cart-product">
          <div className="cart-product-image-container">
            <img
              src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
              alt=""
            />
          </div>
          <div className="cart-product-details">
            <p className="cart-product-name">Nike-Air Force</p>
            <p className="cart-product-price">$129.99</p>
            <p className="cart-product-additional-info">Color: White</p>
            <p className="cart-product-additional-info">Size: 44</p>
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
            <p>$129.99</p>
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
            <p>- $24.99</p>
          </div>
        </div>
        <div id="overview-promocode-section">
          <div>
            <p>Got a promocode?</p>
          </div>
          <div id="promocode-container">
            <div id="promocode-input">
              <input type="text" placeholder="Enter promocode" />
            </div>
            <div id="promocode-apply-button">
              <button>Apply</button>
            </div>
          </div>
        </div>
        <div id="overview-total-items">
          <div>
            <p>Total (1 item)</p>
          </div>
          <div className="overview-prices-container">
            <p>$129.99</p>
          </div>
        </div>
        <div id="procceed-button">
          <button>Procceed To Checkout</button>
        </div>
      </div>
    </div>
  );
}
