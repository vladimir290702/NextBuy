import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ listing }) {
  const navigate = useNavigate();

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
      <div>
        <h3>{listing.productName}</h3>
        <p>{listing.model}</p>
        <p>${listing.price}</p>
      </div>
    </div>
  );
}
