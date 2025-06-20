import "./ReviewOrder.css";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";

export default function ReviewOrder({ item }) {
  const { state } = useLocation();

  return (
    <div id="review-order-container">
      <ShopProfileSidebar />
      <div id="review-order-wrapper">
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
      </div>
    </div>
  );
}
