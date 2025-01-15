import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
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
        <img
          src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
          alt=""
        />
      </div>
      <div>
        <h3>Nike</h3>
        <p>Air Force</p>
        <p>$129.99</p>
      </div>
    </div>
  );
}
