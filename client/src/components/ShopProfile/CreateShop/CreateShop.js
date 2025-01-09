import "./CreateShop.css";
import { useState } from "react";
import createShopLogo from "../../../public/images/createShopLogo.png";
import createShopName from "../../../public/images/createShopName.png";
import createShopFinish from "../../../public/images/createShopFinish.png";
import createShopListing from "../../../public/images/createShopListing.png";

export default function CreateShop({ sendDataToParent }) {
  const [activeOption, setActiveOption] = useState(0);

  const handleCarousel = (e, option) => {
    e.preventDefault();

    setActiveOption(option);
  };

  const handleCreateShop = (e, activeOption) => {
    e.preventDefault();

    sendDataToParent(e, activeOption);
  };
  return (
    <div id="create-shop-wrapper">
      <div id="create-shop-carousel-counter">
        <div
          className={
            activeOption === 0
              ? "create-shop-carousel-bubble-selected"
              : "create-shop-carousel-bubble"
          }
          onClick={(e) => handleCarousel(e, 0)}
        >
          1
        </div>
        <div className="create-shop-carousel-line"></div>
        <div
          className={
            activeOption === 1
              ? "create-shop-carousel-bubble-selected"
              : "create-shop-carousel-bubble"
          }
          onClick={(e) => handleCarousel(e, 1)}
        >
          2
        </div>
        <div className="create-shop-carousel-line"></div>
        <div
          className={
            activeOption === 2
              ? "create-shop-carousel-bubble-selected"
              : "create-shop-carousel-bubble"
          }
          onClick={(e) => handleCarousel(e, 2)}
        >
          3
        </div>
        <div className="create-shop-carousel-line"></div>
        <div
          className={
            activeOption === 3
              ? "create-shop-carousel-bubble-selected"
              : "create-shop-carousel-bubble"
          }
          onClick={(e) => handleCarousel(e, 3)}
        >
          4
        </div>
      </div>

      <div id="optionSlider">
        <div
          className={
            activeOption === 0
              ? "create-shop-option-selected"
              : "create-shop-option"
          }
        >
          <div className="create-shop-option-text-container">
            <div>
              <h2>First Step</h2>
            </div>
            <div className="create-shop-option-image">
              <img src={createShopLogo} alt="create" />
            </div>
            <div className="create-shop-option-text-wrapper">
              <h3>
                What will attract more visitors to your shop? Of corse - a well
                designed and good looking logo!
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
        <div
          className={
            activeOption === 1
              ? "create-shop-option-selected"
              : "create-shop-option"
          }
        >
          <div className="create-shop-option-text-container">
            <div>
              <h2>Create Name</h2>
            </div>
            <div className="create-shop-option-image">
              <img src={createShopName} alt="create" />
            </div>
            <div className="create-shop-option-text-wrapper">
              <h3>
                Another thing that will attract more customers to your shop is a
                remembering unique name!
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
        <div
          className={
            activeOption === 2
              ? "create-shop-option-selected"
              : "create-shop-option"
          }
        >
          <div className="create-shop-option-text-container">
            <div>
              <h2>Start Listing</h2>
            </div>
            <div className="create-shop-option-image">
              <img src={createShopListing} alt="create" />
            </div>
            <div className="create-shop-option-text-wrapper">
              <h3>
                After your logo and name are ready start lising your products
                and start making profits even from today!
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
        <div
          className={
            activeOption === 3
              ? "create-shop-option-selected"
              : "create-shop-option"
          }
        >
          <div className="create-shop-option-text-container">
            <div>
              <h2>One more step!</h2>
            </div>
            <div className="create-shop-option-image">
              <img src={createShopFinish} alt="create" />
            </div>
            <div className="create-shop-option-text-wrapper">
              <h3>
                Are you ready to start this adventure and meantime develop sale
                skills meantime? If the answer is YES - move forward!
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
                onClick={(e) => handleCreateShop(e, "finish-create-shop")}
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
