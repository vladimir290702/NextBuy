import "./ProductCategories.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { manApparel, womanApparel } from "../../data/apparelData";

export default function ProductCategories({ type }) {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [previousSelectedCategories, setPreviousSelectedCategories] = useState(
    []
  );
  const apparelType = location.state;

  const data = apparelType === "man" ? manApparel : womanApparel;
  const subCategoryItems = data[selectedIndex]?.subcategory || null;

  const handleSelectItem = (e, index, category) => {
    e.preventDefault();

    setSelectedIndex(index);
    setPreviousSelectedCategories((prevCategories) => [
      ...prevCategories,
      category,
    ]);

    if (
      category ===
        previousSelectedCategories[previousSelectedCategories.length - 1] &&
      toggle
    ) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  return (
    <>
      <div id="apparel-wrapper">
        {data.map((item, index) => {
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
    </>
  );
}
