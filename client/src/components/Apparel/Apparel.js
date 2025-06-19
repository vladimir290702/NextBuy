import "./Apparel.css";
import { useState, useEffect } from "react";
import { sortData } from "../../data/apparelSortData";
import OptionCard from "./OptionCard/OptionCard";
import ProductCard from "./ProductCard/ProductCard";
import ProductCategories from "../ProductCategories/ProductCategories";
import { getListingsData } from "../../services/createShop";
import { RingLoader } from "react-spinners";

export default function Apparel() {
  const [sortToggle, setSortToggle] = useState(false);
  const [listings, setListings] = useState(
    JSON.parse(localStorage.getItem("listings")) || null
  );
  const [loading, setLoading] = useState(listings ? false : true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!listings) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async (search = "") => {
    setLoading(true);
    const response = await getListingsData(search);
    localStorage.setItem("listings", JSON.stringify(response));
    setListings(response);
    setLoading(false);
  };

  const handleSelectOption = (e, category) => {
    e.preventDefault();

    if (category === sortToggle) {
      setSortToggle(false);
    } else {
      setSortToggle(category);
    }
  };

  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  return (
    <>
      <ProductCategories type={"man"} />
      <div id="apparel-content-container">
        <div id="apparel-products">
          <div id="apparel-products-container">
            <div id="apparel-search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            <div id="apparel-results-container">
              <p>Total results: {listings?.listings.length}</p>
            </div>
            <div id="apparel-sorting-options">
              {sortData?.map((item, index) => {
                return (
                  <OptionCard
                    key={index}
                    data={item}
                    setDataToParent={handleSelectOption}
                    selectedOption={sortToggle}
                  />
                );
              })}
            </div>
          </div>
          {!loading && listings?.listings.length ? (
            <div id="products-container">
              {listings?.listings.map((item, index) => {
                return <ProductCard key={index} listing={item} />;
              })}
            </div>
          ) : (
            <div id="apparel-loader-container">
              <RingLoader id="apparel-loader" color="#001f54" size={150} />
              <h2>Wait a second, the products are ariving!</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
