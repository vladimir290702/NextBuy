import "./ProductDetails.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbTruckDelivery, TbPackageImport } from "react-icons/tb";
import { useState } from "react";
import ProductCategories from "../ProductCategories/ProductCategories";

export default function ProductDetails() {
  const [selectedFavourite, setSelectedFavourite] = useState(false);

  const handleFavouriteProduct = (e) => {
    e.preventDefault();

    setSelectedFavourite(!selectedFavourite);
  };

  return (
    <>
      <ProductCategories />
      <div id="product-details-wrapper">
        <div id="product-details-images-container">
          <div className="product-details-image">
            <img
              src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
              alt=""
            />
          </div>
          <div className="product-details-image">
            <img
              src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
              alt=""
            />
          </div>
          <div className="product-details-image">
            <img
              src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
              alt=""
            />
          </div>
          <div className="product-details-image">
            <img
              src="https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/6ca23f73-976a-47c0-86f9-a6a7ab527130/AIR+MAX+PLUS+DRIFT.png"
              alt=""
            />
          </div>
        </div>
        <div id="product-details-information-container">
          <div id="routes">
            <p>Man - Shoes - Sport shoes</p>
          </div>
          <div id="product-name">
            <p>Nike Air Force</p>
          </div>
          <div id="product-price">
            <p>$129.99</p>
          </div>
          <div>
            <p>Color: White</p>
          </div>
          <div>
            <p>Sizes:</p>
          </div>
          <div id="product-details-sizes-container">
            <div className="product-size">39</div>
            <div className="product-size">40</div>
            <div className="product-size">41</div>
            <div className="product-size">42</div>
            <div className="product-size">43</div>
            <div className="product-size">44</div>
          </div>
          <div id="product-details-buttons-container">
            <div id="add-to-bag-button">
              <button>Add to Bag</button>
            </div>
            <div
              id="favourite-button"
              onClick={(e) => handleFavouriteProduct(e)}
            >
              {selectedFavourite ? (
                <FaHeart id="favourite-pressed" />
              ) : (
                <FaRegHeart />
              )}
            </div>
          </div>
          <div id="delivery-container">
            <div className="delivery-info">
              <div>
                <TbTruckDelivery className="delivery-icon" />
              </div>
              <div>
                <p>Free delivery on all orders over $75</p>
              </div>
            </div>
            <div className="delivery-info">
              <div>
                <TbPackageImport className="delivery-icon" />
              </div>
              <div>
                <p>60-day returns. For returns, a fee of 4,95 EUR applies.</p>
              </div>
            </div>
          </div>
          <div id="details-container">
            <p>
              This T-shirt is crafted from 100% regenerative cotton, excluding
              trims. The cotton is grown using farming methods that seek to
              improve soil health, watersheds and biodiversity. • cotton jersey
              • regular fit • crew neckline • short sleeves • Calvin Klein
              monogram embroidery on the chest composition and care: 100% cotton
              machine wash tumble dry low
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
