import "./CreateShop.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";
import ShopProfileSidebar from "../../components/ShopProfileSidebar/ShopProfileSidebar";

export default function FinishCreateShop() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shopName, setShopName] = useState("");
  const [shopLogo, setShopLogo] = useState("");

  const checkIfOptionIsSelected = (e, option) => {
    e.preventDefault();

    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((word) => word !== option));
    }
  };

  const handleCreateShop = async (e) => {
    e.preventDefault();

    const data = {
      ownerId: user._id,
      owner: user.username,
      logo: shopLogo,
      name: shopName,
      categories: selectedOptions,
      listings: [],
      revenue: 0,
      views: 0,
      orders: [],
      activity: [],
      createdOn: new Date().toLocaleString(),
      totalViews: 0,
    };

    const result = await createShop(data);

    navigate("/dashboard");
  };

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="selected-shop-category">
        <div id="finish-create-shop-container">
          <div>
            <label>Import your logo's URL:</label>
            <div className="finish-create-shop-input">
              <input
                type="text"
                placeholder="Logo URL..."
                onChange={(e) => setShopLogo(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Your shop's name:</label>
            <div className="finish-create-shop-input">
              <input
                type="text"
                placeholder="Shop's Name..."
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>
              Choose type of categories that your products will be listed in:
            </label>
            <div id="finish-create-shop-options">
              <div
                className={
                  selectedOptions.includes("Clothing")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Clothing");
                }}
              >
                Clothing
              </div>
              <div
                className={
                  selectedOptions.includes("Shoes")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Shoes");
                }}
              >
                Shoes
              </div>
              <div
                className={
                  selectedOptions.includes("Bags")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Bags");
                }}
              >
                Bags
              </div>
              <div
                className={
                  selectedOptions.includes("Accessories")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Accessories");
                }}
              >
                Accessories
              </div>
              <div
                className={
                  selectedOptions.includes("Wallets")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Wallets");
                }}
              >
                Wallets
              </div>
              <div
                className={
                  selectedOptions.includes("Belts")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Belts");
                }}
              >
                Belts
              </div>
              <div
                className={
                  selectedOptions.includes("Sunglasses")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Sunglasses");
                }}
              >
                Sunglasses
              </div>
              <div
                className={
                  selectedOptions.includes("Watches")
                    ? "finish-create-shop-option-container-selected"
                    : "finish-create-shop-option-container"
                }
                onClick={(e) => {
                  checkIfOptionIsSelected(e, "Watches");
                }}
              >
                Watches
              </div>
            </div>
          </div>
          <div
            id="finish-create-shop-button-wrapper"
            onClick={(e) => handleCreateShop(e)}
          >
            <button>Create Shop</button>
          </div>
        </div>
      </div>
    </div>
  );
}
