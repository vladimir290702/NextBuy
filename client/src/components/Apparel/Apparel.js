import "./Apparel.css";
import { useState } from "react";
import { sortData } from "../../data/apparelSortData";
import OptionCard from "./OptionCard/OptionCard";
import ProductCard from "./ProductCard/ProductCard";
import Paging from "../Paging/Paging";
import ProductCategories from "../ProductCategories/ProductCategories";

export default function Apparel() {
  const [selectedPage, setSelectedPage] = useState(1);
  const [sortToggle, setSortToggle] = useState(false);

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
      <ProductCategories />
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
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return <ProductCard key={index} />;
            })}
          </div>
        </div>
      </div>
      <Paging page={selectedPage} selectPage={handleSelectPage} />
    </>
  );
}
