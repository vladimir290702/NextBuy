import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function ProductCard({ listing }) {
  const navigate = useNavigate();
  const listingModel =
    listing.model.length > 25
      ? listing.model.slice(0, 25) + "..."
      : listing.model;

  const handleNavigateProductDetails = (e) => {
    e.preventDefault();

    navigate("/product-details", { state: { id: listing._id } });
  };
  return (
    <div
      key={listing._id}
      className="product-card"
      onClick={(e) => handleNavigateProductDetails(e)}
    >
      <div className="product-image-container">
        <img src={listing.images[0]} alt="" />
      </div>
      <div className="product-card-information">
        <div>
          <h4>{listing.productName} </h4>
          <h4 className="product-card-model">{listingModel}</h4>
        </div>
        <div className="product-price-visit-container">
          <div>
            <h4>${listing.price}</h4>
          </div>
          <div className="product-card-visit-button-container">
            <FaArrowRight className="product-card-visit-button" />
          </div>
        </div>
      </div>
    </div>
  );
}
