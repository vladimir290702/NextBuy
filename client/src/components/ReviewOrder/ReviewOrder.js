import "./ReviewOrder.css";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";

export default function ReviewOrder() {
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
              key={state?.orderedProducts?.model}
            >
              <div>
                <img
                  src={state?.orderedProducts[0]?.images[0]}
                  alt={state?.orderedProducts?.productName}
                />
              </div>
              <div className="review-order-product-description">
                <h1 className="review-order-product-model">
                  {state?.orderedProducts[0]?.productName}{" "}
                  {state?.orderedProducts[0]?.model}
                </h1>
                <p>Category: {state?.orderedProducts[0]?.category}</p>
                <p>Price: ${state?.orderedProducts[0]?.price}</p>
                <p>Qantity: {state?.orderedProducts[0]?.quantity}</p>
                <p>
                  Total: $
                  {state?.orderedProducts[0]?.price *
                    state?.orderedProducts[0]?.quantity}
                </p>
                <p>Arrives: Fri, 19/04 - Mon, 21/04</p>
              </div>
            </div>
          </div>
        </div>
        <div id="review-order-contact-custommer-container">
          <div id="review-order-contact-custommer">
            <h2>Contact custommer:</h2>

            <p>Email: {state?.user}</p>
            <p>
              Name: {state?.firstName} {state?.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
