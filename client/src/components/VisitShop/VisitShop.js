import "./VisitShop.css";
import { useLocation } from "react-router-dom";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";

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
        <div id="visit-shop-inforamtion">
          <div>
            <p>Owner email: {shop.owner}</p>
          </div>
          <div>
            <p>Shop creation: {shop.createdOn}</p>
          </div>
          <div>
            <p>Shop listings: {shop.listings.length}</p>
          </div>
        </div>
        <div id="visit-shop-listings">
          {shop.listings.map((listing) => {
            return (
              <div className="visit-shop-listing">
                <img src={listing.images[0]} alt={listing.productName} />
                <p>{listing.productName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
