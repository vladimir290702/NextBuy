import "./ShopProfile.css";
import { CiShop } from "react-icons/ci";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillShop } from "react-icons/ai";
import { useState } from "react";
import CreateShop from "./CreateShop/CreateShop";

export default function ShopProfile() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  let comp;

  const displayOption = () => {
    if (selectedCategory === "create-shop") {
      return <CreateShop />;
    } else if (selectedCategory === "add-listing") {
      return <h3>Add Listing</h3>;
    } else if (selectedCategory === "orders") {
      return <h3>Orders</h3>;
    } else if (selectedCategory === "dashboard") {
      return <h3>Dashboard</h3>;
    } else if (selectedCategory === "settings") {
      return <h3>Settings</h3>;
    } else if (selectedCategory === "other-shops") {
      return <h3>Other Shops</h3>;
    } else {
      return <h3>not seleted Option</h3>;
    }
  };

  const handleSelectedCategory = (e, category) => {
    e.preventDefault();

    setSelectedCategory(category);
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