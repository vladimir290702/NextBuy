import "./CreateListing.css";
import { useState, useEffect } from "react";
import ImageLoader from "../ImageLoader/ImageLoader";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { clothingCategories } from "../../data/clothingCategories";
import { sizing } from "../../data/sizing";
import { createListing } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { getShopData } from "../../services/createShop";

export default function CreateListing() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [shopData, setShopData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Jackets");
  const [parentCategory, setParentCategory] = useState("Clothing");
  const [hasParentCategory, setHasParentCategory] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState([]);
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user?.username);

      setShopData(response?.shop);
    };
    fetchedShopData();
  }, []);

  const handleProductCategories = (e) => {
    e.preventDefault();

    setCategory(e.target.value);

    const selectedParentCategory = clothingCategories.find(
      (id) => id.category === e.target.value
    ).parentCategory;

    if (selectedParentCategory !== "Accessories") {
      setHasParentCategory(true);
      if (e.target.value === "Watches") {
        setParentCategory("Watches");
      } else {
        setParentCategory(selectedParentCategory);
      }
    } else {
      setHasParentCategory(false);
    }
  };

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

  const setGenderOption = (e, type) => {
    e.preventDefault();

    if (type === "male") {
      setGender("male");
    } else {
      setGender("female");
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();

    const clothing = clothingCategories.find(
      (item) => item.category === category
    );

    const data = {
      productName: shopData.name,
      images: imageUrls,
      model,
      description,
      category,
      parentCategory: clothing.parentCategory,
      sizes,
      price: Number(price),
      date: new Date().toLocaleString(),
      color,
      gender,
      totalViews: 0,
    };

    const response = await createListing(data, user.username);

    navigate("/dashboard");
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
                  <label>Category:</label>
                </div>
                <div id="add-listing-category-options">
                  <select onChange={(e) => handleProductCategories(e)}>
                    {clothingCategories.map((item, index) => {
                      return (
                        <option key={index} value={item.category}>
                          {item.category}
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
              <div className="main-data-option">
                <div className="main-data-label-container">
                  <label>Select Gender:</label>
                </div>
                <div id="add-listing-gender">
                  <div
                    id={
                      gender === "male"
                        ? "add-listing-gender-man-active"
                        : "add-listing-gender-man"
                    }
                    onClick={(e) => setGenderOption(e, "male")}
                  >
                    <IoIosMale />
                  </div>
                  <div
                    id={
                      gender === "female"
                        ? "add-listing-gender-woman-active"
                        : "add-listing-gender-woman"
                    }
                    onClick={(e) => setGenderOption(e, "female")}
                  >
                    <IoIosFemale />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="secondary-product-data">
            <div id="color-options">
              <div className="main-data-label-container">
                <label>Color:</label>
              </div>
              <div id="color-input">
                <input
                  type="text"
                  placeholder="Color..."
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
            {hasParentCategory ? (
              <div id="productSizes">
                <div className="main-data-label-container">
                  <label>
                    Which product sizes will you offer to your customers:
                  </label>
                </div>
                <div id="create-product-sizes-wrapper">
                  {sizing[parentCategory].map((item, index) => {
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
            ) : null}
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
