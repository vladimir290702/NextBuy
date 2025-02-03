import "./AddListing.css";
import { useState } from "react";
import ImageLoader from "../../ImageLoader/ImageLoader";

export default function AddListing() {
  const [imageUrls, setImageUrls] = useState([]);
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState([]);

  // Function to receive images from child
  const handleImageUpload = (urls) => {
    setImageUrls(urls);
  };

  const handleCreateListing = (e) => {
    e.preventDefault();

    const data = {
      images: imageUrls,
      model,
      description,
      categories,
      sizes,
      price,
      date: new Date().toLocaleString(),
    };

    console.log(data);
  };

  return (
    <div id="add-listing-wrapper">
      <div id="first-product-section">
        <div id="imageContainer">
          <ImageLoader onImageUpload={handleImageUpload} />
        </div>
        <div id="productMainData">
          <div className="main-data-option">
            <div id="add-listing-category-label">
              <label>Category</label>
            </div>
            <div id="add-listing-category-options">
              <select>
                <option name="Clothing" id="">
                  Clothing
                </option>
                <option name="Shoes" id="">
                  Shoes
                </option>
                <option name="Accessories" id="">
                  Accessories
                </option>
                <option name="Belts" id="">
                  Belts
                </option>
                <option name="Bags" id="">
                  Bags
                </option>
                <option name="Watches" id="">
                  Watches
                </option>
                <option name="Sunglasses" id="">
                  Sunglasses
                </option>
                <option name="Wallets" id="">
                  Wallets
                </option>
              </select>
            </div>
          </div>
          <div className="main-data-option">
            <div className="main-data-label-container">
              <label>Product Model:</label>
            </div>
            <div className="add-listing-category-input">
              <input
                type="text"
                placeholder="Model..."
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
          </div>
          <div className="main-data-option">
            <div className="main-data-label-container">
              <label>Price:</label>
            </div>
            <div className="add-listing-category-input">
              <input
                type="text"
                placeholder="Price..."
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="main-data-option">
            <div className="main-data-label-container">
              <label>Select Currency:</label>
            </div>
            <div id="add-listing-currency">
              <div id="add-listing-currency-dollar">$</div>
              <div id="add-listing-currency-euro">€</div>
            </div>
          </div>
        </div>
      </div>
      <div id="secondary-product-data">
        <div id="productSizes">
          <div className="main-data-label-container">
            <label>Which product sizes will you offer to your customers:</label>
          </div>
          <div id="create-product-sizes-wrapper">
            <div className="create-product-size">S</div>
            <div className="create-product-size">M</div>
            <div className="create-product-size">L</div>
            <div className="create-product-size">XL</div>
            <div className="create-product-size">2XL</div>
            <div className="create-product-size">3XL</div>
          </div>
        </div>
        <div id="add-listing-discription">
          <div className="main-data-label-container">
            <label htmlFor="productModel">Description:</label>
          </div>
          <div className="add-listing-category-input">
            <textarea
              placeholder="Please describe your product..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div id="createProductButton">
        <button onClick={(e) => handleCreateListing(e)}>Add Listing</button>
      </div>
    </div>
  );
}
