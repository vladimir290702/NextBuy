import "./OtherShopCard.css";
import { useNavigate } from "react-router-dom";

export default function OtherShopCard({ shop }) {
  const navigate = useNavigate();

  const handleVisitShopRedirect = () => {
    navigate(`/shop/other-shops/${shop._id}`, { state: shop });
  };

  return (
    <div
      className="shop-container"
      key={shop._id}
      onClick={handleVisitShopRedirect}
    >
      <div className="shop-left-side-section">
        <div className="shop-initial-info">
          <div className="shop-initial-image-container">
            <img src={shop.logo} alt={shop.name} />
          </div>
          <div className="shop-initial-name-conatiner">
            <p>{shop.name}</p>
          </div>
        </div>
        <div className="shop-creation-info">
          <div>
            <p>Created On:</p>
          </div>
          <div className="shop-creation-date">
            <p>{shop.createdOn}</p>
          </div>
        </div>
      </div>
      <div className="shop-right-side-section">
        <div className="shop-listings-info">
          <div>
            <div>Listings:</div>
          </div>
          <div className="shop-listing-info-count">
            <div>{shop.listings.length}</div>
          </div>
        </div>
        <div className="shop-categories-info">
          <div>
            <p>Categories:</p>
          </div>
          <div className="shop-categories-info-names">
            <p>{shop.categories.length}</p>
          </div>
        </div>
        <div className="shop-button">
          <button>Visit Shop</button>
        </div>
      </div>
    </div>
  );
}
