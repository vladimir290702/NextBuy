import "./OptionCard.css";
import { useState } from "react";

export default function OptionCard({ data, setDataToParent }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [option, setOption] = useState(false);

  const handleToggleOption = (e, category) => {
    e.preventDefault();

    if (selectedOption === category) {
      setOption(!option);
    } else {
      setOption(true);
    }

    setSelectedOption(category);
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
            <p>{option ? "-" : "+"}</p>
          </div>
        </div>
        <div
          className={
            option
              ? "apparel-sorting-option-subcategories-active"
              : "apparel-sorting-option-subcategories"
          }
        >
          {data.options?.map((item, index) => {
            return (
              <div key={index}>
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
