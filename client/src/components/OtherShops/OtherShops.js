import "./OtherShops.css";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { useState, useEffect } from "react";
import { getAllShopData } from "../../services/createShop";

export default function OtherShops() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getAllShopData();

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
            <div class="search-bar">
              <form action="/search" method="GET" class="search-form">
                <input
                  type="text"
                  name="query"
                  class="search-input"
                  placeholder="Search for products, brands, or categories..."
                  aria-label="Search"
                />
                <button type="submit" class="search-button">
                  <span class="search-icon">🔍</span>
                </button>
              </form>
            </div>
          </div>
          <div id="shops-container">
            {data.map((shop) => {
              return (
                <div className="shop-container">
                  <div className="asd">
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
                        <p>12/01/2025.</p>
                      </div>
                    </div>
                  </div>
                  <div>
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
                        <p>{shop.categories.join(", ")}</p>
                      </div>
                    </div>
                    <div className="shop-button">
                      <button>Visit Shop</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="shops-paging">TO DO paging</div>
        </div>
      </div>
    </div>
  );
}
