import "./Apparel.css";
import { useState, useEffect } from "react";
import { sortData } from "../../data/apparelSortData";
import OptionCard from "./OptionCard/OptionCard";
import ProductCard from "./ProductCard/ProductCard";
import ProductCategories from "../ProductCategories/ProductCategories";
import { getListingsData } from "../../services/createShop";
import { RingLoader } from "react-spinners";

export default function Apparel() {
  const [listings, setListings] = useState(
    JSON.parse(localStorage.getItem("listings")) || null
  );
  const [loading, setLoading] = useState(listings ? false : true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({ min: 0, max: 5000 });
  const [loadingText, setLoadingText] = useState(
    "Wait a second, the products are ariving!"
  );

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

  const handleSelectedColors = (colors) => {
    setSelectedColors(colors);
  };

  const handleSelectedSizes = (sizes) => {
    setSelectedSizes(sizes);
  };

  const handleSelectedPrices = (prices) => {
    setSelectedPrices(prices);
  };

  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  const handleFilter = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (selectedColors.length) {
      params.append("colors", selectedColors.join(","));
    }

    if (selectedSizes.length) {
      params.append("sizes", selectedSizes.join(","));
    }

    if (selectedPrices) {
      params.append("minPrice", selectedPrices.min);
      params.append("maxPrice", selectedPrices.max);
    }

    const query = params.toString();

    const response = await getListingsData(searchTerm, query);

    if (response.listings.length === 0) {
      setLoadingText("Sorry there are no products found!");
    }

    setListings(response);
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
                    setSelectedColorsToParent={handleSelectedColors}
                    setSelectedSizesToParent={handleSelectedSizes}
                    setSelectedPricesToParent={handleSelectedPrices}
                  />
                );
              })}
            </div>
            <div id="apparel-filter-container" onClick={(e) => handleFilter(e)}>
              <button>Filter</button>
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
              <RingLoader id="apparel-loader" color="#ff3c00" size={150} />
              <h2>{loadingText}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
