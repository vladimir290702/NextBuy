import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ listing }) {
  const navigate = useNavigate();

  const handleNavigateProductDetails = (e) => {
    e.preventDefault();

    navigate("/product-details");
  };
  return (
    <div
      className="product-card"
      onClick={(e) => handleNavigateProductDetails(e)}
    >
      <div className="product-image-container">
        <img src={listing.images[0]} alt="" />
      </div>
      <div>
        <h3>Nike</h3>
        <p>{listing.model}</p>
        <p>${listing.price}</p>
      </div>
    </div>
  );
}
