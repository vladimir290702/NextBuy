import "./ShopProfile.css";
import { CiShop } from "react-icons/ci";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillShop } from "react-icons/ai";
import { useState } from "react";
import CreateShop from "./CreateShop/CreateShop";
import FinishCreateShop from "./FinishCreateShop/FinishCreateShop";
import AddListing from "./AddListing/AddListing";
import OtherShops from "./OtherShops/OtherShops";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";

export default function ShopProfile() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectedCategory = (e, category) => {
    e.preventDefault();

    setSelectedCategory(category);
  };

  const displayOption = () => {
    if (selectedCategory === "create-shop") {
      return <CreateShop sendDataToParent={handleSelectedCategory} />;
    } else if (selectedCategory === "add-listing") {
      return <AddListing />;
    } else if (selectedCategory === "orders") {
      return <Orders />;
    } else if (selectedCategory === "dashboard") {
      return <Dashboard />;
    } else if (selectedCategory === "settings") {
      return <h3>Settings</h3>;
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
        <div
          className="shop-profile-category"
          onClick={(e) => handleSelectedCategory(e, "create-shop")}
        >
          <CiShop />
          <h3>Create Shop</h3>
        </div>
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
