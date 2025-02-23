import "./ReviewOrder.css";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";

export default function ReviewOrder({ item }) {
  const { state } = useLocation();

  return (
    <div id="review-order-container">
      <ShopProfileSidebar />
      <div id="review-order-wrapper">
        <div id="review-order-title-conatainer">
          <h2>Order #{state.order.trackingNumber}</h2>
        </div>
        <div id="review-order-images-container">
          {state.order.orderedProducts.map((product) => {
            return (
              <div className="review-order-image-container" key={product.model}>
                <div>
                  <img src={product.images[0]} alt={product.productName} />
                </div>
                <div>
                  <p>
                    {product.productName} {product.model}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div id="review-order-subtotal-container">
          <div>
            <h3>Subtotal: ${state.order.subtotal}</h3>
          </div>
        </div>
        <div id="review-order-shipping-details">
          <div id="review-order-shipping-information">
            <p>Ship to:</p>
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
          <div id="review-order-status">
            <p>Change status:</p>

            <div id="review-order-status-dropdown">
              <select name="" id="">
                <option value="">Pre-Transit</option>
                <option value="">In Transit</option>
                <option value="">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
