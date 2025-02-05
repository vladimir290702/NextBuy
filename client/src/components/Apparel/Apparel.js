import "./Apparel.css";
import { useState, useEffect } from "react";
import { sortData } from "../../data/apparelSortData";
import OptionCard from "./OptionCard/OptionCard";
import ProductCard from "./ProductCard/ProductCard";
import Paging from "../Paging/Paging";
import ProductCategories from "../ProductCategories/ProductCategories";
import { getListingsData } from "../../services/createShop";

export default function Apparel() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortToggle, setSortToggle] = useState(false);
  const [listings, setListings] = useState(null);

  useState(() => {
    const fetchedShopData = async () => {
      const response = await getListingsData();

      setListings(response);
    };
    fetchedShopData();
  }, []);

  console.log(listings);

  const handleSelectOption = (e, category) => {
    e.preventDefault();

    if (category === sortToggle) {
      setSortToggle(false);
    } else {
      setSortToggle(category);
    }
  };

  const handleSelectPage = (e, page) => {
    e.preventDefault();

    setSelectedPage(page);
  };
  return (
    <>
      <ProductCategories type={"man"} />
      <div id="apparel-content-container">
        <div id="apparel-products">
          <div id="apparel-products-container">
            <div id="apparel-results-container">
              <p>Total results: 1186</p>
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
          <div id="products-container">
            {listings?.listings.map((item, index) => {
              return <ProductCard key={index} listing={item} />;
            })}
          </div>
        </div>
      </div>
      <Paging page={selectedPage} selectPage={handleSelectPage} />
    </>
  );
}
