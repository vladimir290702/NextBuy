import "./ShopProfileSidebar.css";
import { useEffect } from "react";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { GoListUnordered } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiFillShop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getShopData } from "../../services/createShop";
import { useUser } from "../../contexts/UserContext";

export default function ShopProfileSidebar() {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user?.username);
    };
    fetchedShopData();
  }, [user]);

  const handleSelectedCategory = (e, category) => {
    e.preventDefault();

    navigate("/" + category);
  };
  return (
    <div id="shop-profile-categories">
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "create-listing")}
      >
        <IoCreateOutline className="shop-profile-sidebar-icon" />
        <h3>Add Listings</h3>
      </div>
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "shop-orders")}
      >
        <GoListUnordered className="shop-profile-sidebar-icon" />
        <h3>Orders</h3>
      </div>
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "dashboard")}
      >
        <LuLayoutDashboard className="shop-profile-sidebar-icon" />
        <h3>Dashboard</h3>
      </div>
      <div
        className="shop-profile-category"
        onClick={(e) => handleSelectedCategory(e, "other-shops")}
      >
        <AiFillShop className="shop-profile-sidebar-icon" />
        <h3>Other shops</h3>
      </div>
    </div>
  );
}
