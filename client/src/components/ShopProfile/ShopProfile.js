import "./ShopProfile.css";
import { CiShop } from "react-icons/ci";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillShop } from "react-icons/ai";
import { useState, useEffect } from "react";
import CreateShop from "./CreateShop/CreateShop";
import FinishCreateShop from "./FinishCreateShop/FinishCreateShop";
import OtherShops from "./OtherShops/OtherShops";
import Orders from "./Orders/Orders";
import Settings from "./Settings/Settings";
import { getShopData } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function ShopProfile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [shopData, setShopData] = useState(null);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user?.username);

      setShopData(response.shop);
    };
    fetchedShopData();
  }, []);

  const handleSelectedCategory = (e, category) => {
    e.preventDefault();

    setSelectedCategory(category);
  };

  const displayOption = () => {
    if (selectedCategory === "create-shop") {
      return <CreateShop sendDataToParent={handleSelectedCategory} />;
    } else if (selectedCategory === "orders") {
      return <Orders />;
    } else if (selectedCategory === "settings") {
      return <Settings />;
    } else if (selectedCategory === "other-shops") {
      return <OtherShops />;
    } else if (selectedCategory === "finish-create-shop") {
      return <FinishCreateShop />;
    } else {
      return <h3>{selectedCategory}</h3>;
    }
  };

  return (
    <div id="shop-profile-wrapper">
      <div id="shop-profile-categories">
        {shopData ? null : (
          <div
            className="shop-profile-category"
            onClick={(e) => handleSelectedCategory(e, "create-shop")}
          >
            <CiShop />
            <h3>Create Shop</h3>
          </div>
        )}
        <div
          className="shop-profile-category"
          onClick={(e) => handleSelectedCategory(e, "add-listing")}
        >
          <IoCreateOutline />
          <h3>Add Listings</h3>
        </div>
        <div
          className="shop-profile-category"
          onClick={(e) => handleSelectedCategory(e, "orders")}
        >
          <GoListUnordered />
          <h3>Orders</h3>
        </div>
        <div
          className="shop-profile-category"
          onClick={(e) => handleSelectedCategory(e, "dashboard")}
        >
          <LuLayoutDashboard />
          <h3>Dashboard</h3>
        </div>
        <div
          className="shop-profile-category"
          onClick={(e) => handleSelectedCategory(e, "other-shops")}
        >
          <AiFillShop />
          <h3>Other shops</h3>
        </div>
        <div
          className="shop-profile-category"
          onClick={(e) => handleSelectedCategory(e, "settings")}
        >
          <IoSettingsOutline />
          <h3>Settings</h3>
        </div>
      </div>

      <div id="selected-shop-category">{displayOption()}</div>
    </div>
  );
}
