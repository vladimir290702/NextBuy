import "./OtherShops.css";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import OtherShopCard from "./OtherShopCard/OtherShopCard";
import { useState, useEffect } from "react";
import { getAllShopData } from "../../services/createShop";

export default function OtherShops() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getAllShopData();

      if (!response) {
        setData(null);
        return;
      }

      setData(response);
    };
    fetchedShopData();
  }, []);

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="selected-shop-category">
        <div id="other-shops-wrapper">
          <div id="other-shops-searchbar">
            <div className="search-bar">
              <form action="/search" method="GET" className="search-form">
                <input
                  type="text"
                  name="query"
                  className="search-input"
                  placeholder="Search for products, brands, or categories..."
                  aria-label="Search"
                />
                <button type="submit" className="other-shops-search-button">
                  <span className="search-icon">🔍</span>
                </button>
              </form>
            </div>
          </div>
          <div id="shops-container">
            {data?.map((shop) => {
              return <OtherShopCard shop={shop} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
