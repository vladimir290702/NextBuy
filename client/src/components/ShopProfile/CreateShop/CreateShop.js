import "./CreateShop.css";
import { useState } from "react";

export default function CreateShop() {
  const [optionCounter, setOptionCounter] = useState(0);
  const [activeOption, setActiveOption] = useState(0);

  console.log(activeOption);

  const handleCarousel = (e, option) => {
    e.preventDefault();

    setActiveOption(option);
  };
  return (
    <div id="create-shop-wrapper">
      <div id="create-shop-carousel-counter">
        <div className="create-shop-carousel-bubble">1</div>
        <div className="create-shop-carousel-line"></div>
        <div className="create-shop-carousel-bubble">2</div>
        <div className="create-shop-carousel-line"></div>
        <div className="create-shop-carousel-bubble">3</div>
        <div className="create-shop-carousel-line"></div>
        <div className="create-shop-carousel-bubble">4</div>
      </div>

      <div id="optionSlider">
        <div className="create-shop-option">
          <div className="create-shop-option-text-container">
            <div>
              <h2>First Step</h2>
            </div>
            <div>
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident, ab!
              </h3>
            </div>
          </div>
          <div id="create-shop-option-first-step">
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="create-shop-option">
          <div className="create-shop-option-text-container">
            <div>
              <h2>Create Name</h2>
            </div>
            <div>
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident, ab!
              </h3>
            </div>
          </div>
          <div className="create-shop-buttons">
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 0)}
              >
                Previous
              </button>
            </div>
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 2)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="create-shop-option">
          <div className="create-shop-option-text-container">
            <div>
              <h2>Start Listing</h2>
            </div>
            <div>
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident, ab!
              </h3>
            </div>
          </div>
          <div className="create-shop-buttons">
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 1)}
              >
                Previous
              </button>
            </div>
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 3)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="create-shop-option">
          <div className="create-shop-option-text-container">
            <div>
              <h2>One more step!</h2>
            </div>
            <div>
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident, ab!
              </h3>
            </div>
          </div>
          <div className="create-shop-buttons">
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 2)}
              >
                Previous
              </button>
            </div>
            <div>
              <button
                className="create-shop-carousel-button"
                onClick={(e) => handleCarousel(e, 2)}
              >
                Create Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
