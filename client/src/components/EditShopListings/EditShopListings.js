import "./EditShopListings.css";
import { useState, useEffect } from "react";
import ShopProfileSideBar from "../ShopProfileSidebar/ShopProfileSidebar";
import ListingCard from "./ListingCard/ListingCard";
import { getListingsData } from "../../services/createShop";

export default function EditListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getListingsData();

      setListings(response?.listings);
    };
    fetchedShopData();
  }, []);

  return (
    <div id="edit-shop-listings-container">
      <ShopProfileSideBar />

      <div id="edit-listings-container">
        <div id="edit-listings-title-container">
          <h2>Here are all of your listings:</h2>
        </div>

        <div id="edit-shop-filter-shop-listings-container">
          <div id="edit-shop-listings-search">
            <input type="text" class="search-input" placeholder="Search..." />
            <button class="search-button">Search</button>
          </div>
          <div className="edit-shop-listings-sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort by:
            </label>
            <select id="sort-select" className="sort-select">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div id="all-shop-listings">
          {listings.map((listing) => {
            return <ListingCard data={listing} />;
          })}
        </div>
      </div>
    </div>
  );
}
