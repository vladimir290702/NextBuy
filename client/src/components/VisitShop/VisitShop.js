import "./VisitShop.css";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import VisitShopListing from "./VisitShopListing/VisitShopListings";

export default function VisitShop() {
  const location = useLocation();
  const shop = location.state;

  return (
    <div id="visit-shop-container">
      <ShopProfileSidebar />

      <div id="visit-shop-wrapper">
        <div id="visit-shop-title">
          <div id="visit-shop-logo">
            <img src={shop.logo} alt={shop.name} />
          </div>
          <div id="visit-logo-name">
            <h2>{shop.name}</h2>
          </div>
        </div>
        <div id="visit-shop-information">
          <div className="visit-shop-information-details">
            <div className="option">
              <h4>Owner email:</h4>
              <h4>{shop.owner}</h4>
            </div>
          </div>
          <div className="visit-shop-information-details">
            <div className="option">
              <h4>Shop creation:</h4>
              <h4>{shop.createdOn}</h4>
            </div>
          </div>
          <div className="visit-shop-information-details">
            <div className="option">
              <h4>Shop listings:</h4>
              <h4>{shop.listings.length}</h4>
            </div>
          </div>
        </div>
        <div id="visit-shop-listings">
          {shop.listings.map((listing) => {
            return <VisitShopListing key={listing.model} listing={listing} />;
          })}
        </div>
      </div>
    </div>
  );
}
