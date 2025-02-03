import "./CreateListing.css";
import { useState } from "react";
import ImageLoader from "../ImageLoader/ImageLoader";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { clothingCategories } from "../../data/clothingCategories";
import { sizing } from "../../data/sizing";

export default function CreateListing() {
  const [imageUrls, setImageUrls] = useState([]);
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState([]);

  const handleImageUpload = (urls) => {
    setImageUrls(urls);
  };

  const handleProductSizes = (e, size) => {
    e.preventDefault();

    if (!sizes.includes(size)) {
      setSizes([...sizes, size]);
    } else {
      setSizes(sizes.filter((item) => item !== size));
    }
  };

  const handleCreateListing = (e) => {
    e.preventDefault();

    const data = {
      images: imageUrls,
      model,
      description,
      category,
      sizes,
      price,
      date: new Date().toLocaleString(),
    };

    console.log(data);
  };

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="selected-shop-category">
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
                  <select onChange={(e) => setCategory(e.target.value)}>
                    {clothingCategories.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
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
            </div>
          </div>
          <div id="secondary-product-data">
            <div id="productSizes">
              <div className="main-data-label-container">
                <label>
                  Which product sizes will you offer to your customers:
                </label>
              </div>
              <div id="create-product-sizes-wrapper">
                {sizing.clothing.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(e) => handleProductSizes(e, item)}
                      className={
                        sizes.includes(item)
                          ? "create-product-size-active"
                          : "create-product-size"
                      }
                    >
                      {item}
                    </div>
                  );
                })}
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
      </div>
    </div>
  );
}
