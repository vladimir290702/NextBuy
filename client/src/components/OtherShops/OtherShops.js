import "./OtherShops.css";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import OtherShopCard from "./OtherShopCard/OtherShopCard";
import { useState, useEffect } from "react";
import { getAllShopData } from "../../services/createShop";
import { RingLoader } from "react-spinners";

export default function OtherShops() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(data ? false : true);

  useEffect(() => {
    const fetchedShopData = async () => {
      setLoading(true);
      const response = await getAllShopData();

      if (!response) {
        setData(null);
        return;
      }

      setData(response);
      setLoading(false);
    };
    fetchedShopData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search) {
      const lowerSearch = search.trim().toLowerCase();

      const result = data.filter((shop) =>
        shop.name.toLowerCase().includes(lowerSearch)
      );

      setData(result);
    } else {
      const response = await getAllShopData();
      setData(response);
    }
  };

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="dashboard-selected-shop-category">
        {loading ? (
          <div className="apparel-loader-container">
            <RingLoader color="#ff3c00" size={150} />
            <h2>Please wait, other shops are loading!</h2>
          </div>
        ) : (
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
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    onClick={(e) => handleSearch(e)}
                    className="other-shops-search-button"
                  >
                    <span className="search-icon">🔍</span>
                  </button>
                </form>
              </div>
            </div>
            <div id="shops-container">
              {data?.map((shop) => {
                return <OtherShopCard shop={shop} key={shop.name} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
