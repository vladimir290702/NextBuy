import "./OptionCard.css";
import { useState } from "react";

export default function OptionCard({
  data,
  setDataToParent,
  setSelectedColorsToParent,
  setSelectedSizesToParent,
  setSelectedPricesToParent,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [option, setOption] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleToggleOption = (e, category) => {
    e.preventDefault();

    if (selectedOption === category) {
      setOption(!option);
    } else {
      setOption(true);
    }

    setSelectedOption(category);
  };

  const handleSelectedColors = (color) => {
    let updatedColors;

    if (selectedColors.includes(color.colorName)) {
      updatedColors = selectedColors.filter((c) => c !== color.colorName);
    } else {
      updatedColors = [...selectedColors, color.colorName];
    }

    setSelectedColors(updatedColors);
    setSelectedColorsToParent(updatedColors);
  };

  const handleSelectedSizes = (size) => {
    let updatedSizes;

    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter((s) => s !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }

    setSelectedSizes(updatedSizes);
    setSelectedSizesToParent(updatedSizes);
  };

  const handleSelectedPrice = (price) => {
    setSelectedPrice(price);

    if (price.length === 5) {
      const parsedPrice = Number(price.slice(1, 4));

      setSelectedPricesToParent((prev) => ({ ...prev, min: parsedPrice }));
      setSelectedPricesToParent((prev) => ({ ...prev, max: 5000 }));
    } else {
      const splited = price.split("-");
      const parsedPrices = splited
        .map((n) => {
          const splitedNumbers = n.split("$");
          return splitedNumbers[1];
        })
        .map((x) => Number(x));

      setSelectedPricesToParent((prev) => ({ ...prev, min: parsedPrices[0] }));
      setSelectedPricesToParent((prev) => ({ ...prev, max: parsedPrices[1] }));
    }
  };

  return (
    <div id="apparel-sorting-options">
      <div
        className="apparel-sorting-option"
        onClick={(e) => handleToggleOption(e, data.category)}
      >
        <div className="apparel-sorting-option-toggle">
          <div>
            <p>{data.category}</p>
          </div>
          <div className="apparel-toggle-function">
            <p className={`plus-icon ${option ? "hidden" : "visible"}`}>+</p>
            <p className={`minus-icon ${option ? "visible" : "hidden"}`}>−</p>
          </div>
        </div>
        <div
          className={
            option
              ? `apparel-sorting-option-subcategories-active ${
                  data.category === "Colors" || data.category === "Size"
                    ? "colors"
                    : ""
                } `
              : `apparel-sorting-option-subcategories ${
                  data.category === "Colors" || data.category === "Size"
                    ? "colors"
                    : ""
                }`
          }
        >
          {data.category === "Colors"
            ? data.options.map((item) => {
                const isSelected = selectedColors.includes(item.colorName);
                return (
                  <div
                    style={{
                      filter: isSelected ? "none" : "brightness(60%)",
                    }}
                    className="color-sorting-option-container"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectedColors(item);
                    }}
                    key={item.colorName}
                  >
                    <div
                      style={{
                        backgroundColor: item.colorHexCode,
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                        border: isSelected
                          ? `2px #001F54 solid`
                          : "2px #fff solid",
                        filter: isSelected ? "none" : "brightness(80%)",
                      }}
                    ></div>
                  </div>
                );
              })
            : data.options?.map((item, index) => {
                if (data.category === "Size") {
                  const isSelected = selectedSizes.includes(item);

                  return (
                    <div
                      key={index}
                      className={
                        isSelected
                          ? "sizes-sorting-option-container-active"
                          : "sizes-sorting-option-container"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectedSizes(item);
                      }}
                    >
                      <p>{item}</p>
                    </div>
                  );
                }

                if (data.category === "Price") {
                  return (
                    <div
                      key={index}
                      className={"sorting-option-container"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectedPrice(item);
                      }}
                    >
                      <p
                        className={
                          selectedPrice === item
                            ? "sorting-option-selected-price"
                            : ""
                        }
                      >
                        {item}
                      </p>
                    </div>
                  );
                }

                return null;
              })}
        </div>
      </div>
    </div>
  );
}
