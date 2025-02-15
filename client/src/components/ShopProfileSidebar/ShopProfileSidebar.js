import "./ShopProfileSidebar.css";
import { CiShop } from "react-icons/ci";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillShop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ShopProfileSidebar() {
  const navigate = useNavigate();

  const handleSelectedCategory = (e, category) => {
    e.preventDefault();

    navigate("/" + category);
  };
  return (
    <div id="shop-profile-categories">
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "create-shop-initial")}
      >
        <CiShop />
        <h3>Create Shop</h3>
      </div>
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "create-listing")}
      >
        <IoCreateOutline />
        <h3>Add Listings</h3>
      </div>
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "shop-orders")}
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
        onClick={(e) => handleSelectedCategory(e, "shop-settings")}
      >
        <IoSettingsOutline />
        <h3>Settings</h3>
      </div>
    </div>
  );
}
