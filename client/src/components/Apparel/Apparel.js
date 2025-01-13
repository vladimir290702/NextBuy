import "./Apparel.css";
import { useState } from "react";
import { manApparel } from "../../data/apparelData";
import { sortData } from "../../data/apparelSortData";
import OptionCard from "./OptionCard/OptionCard";
import ProductCard from "./ProductCard/ProductCard";
import Paging from "../Paging/Paging";

export default function Apparel() {
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);

  const [toggle, setToggle] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);

  const subCategoryItems = manApparel[selectedIndex]?.subcategory || null;

  const handleSelectItem = (e, index, category) => {
    e.preventDefault();

    setSelectedIndex(index);
    setSelectedCategory(category);

    if (category === selectedCategory) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

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
      <div id="apparel-wrapper">
        {manApparel.map((item, index) => {
          return (
            <div
              className={selectedIndex === index ? "item-selected" : "item"}
              key={index}
              onClick={(e) => {
                handleSelectItem(e, index, item.category);
              }}
            >
              <p
                className={
                  selectedIndex === index ? "item-name-selected" : "item-name"
                }
              >
                {item.category}
              </p>
            </div>
          );
        })}
      </div>
      {toggle && (
        <div id="toggle-category">
          <div>
            <h4>Shop by Category</h4>
          </div>
          <div id="man-apparel-items">
            {selectedIndex &&
              subCategoryItems.map((item, index) => {
                return (
                  <p key={index} className="man-apparel-item">
                    {item}
                  </p>
                );
              })}
          </div>
        </div>
      )}
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
