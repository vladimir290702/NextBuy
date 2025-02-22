import "./ReviewOrder.css";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";

export default function ReviewOrder({ item }) {
  const { state } = useLocation();

  console.log(state);

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
              <div className="review-order-image-container">
                <div>
                  <img src={product.images[0]} alt="" />
                </div>
                <p>
                  {product.productName} {product.model}
                </p>
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
          <div>
            <h3>Ship to:</h3>
            <p>
              {state.order.firstName} {state.order.lastName}
            </p>
            <p>{state.order.street}</p>
            <p>
              {state.order.town} {state.order.zipcode}
            </p>
          </div>
          <div>
            <h4>Change status:</h4>

            <div>
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
