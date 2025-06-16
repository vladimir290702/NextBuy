import "./ShopOwnerLayout.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { getShopData } from "../../../services/createShop";
import { FaUserCircle } from "react-icons/fa";

export default function ShopOwnerLayout() {
  const { logout, user } = useUser();
  const navigate = useNavigate();
  const [shopData, setShopData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getShopData(user.username);
      if (response) {
        setShopData(response);
      }
    };

    fetchData();
  }, []);

  const handeLogout = () => {
    logout(null);
    navigate("/");
    localStorage.removeItem("user");
  };

  const handleProfileRedirect = async () => {
    if (shopData.shop.owner) {
      navigate("/dashboard");
    } else {
      navigate("/create-shop-initial");
    }
  };

  return (
    <>
      <li className="nav-item" onClick={() => handleProfileRedirect()}>
        <Link className="nav-link" to="/dashboard">
          {shopData?.shop?.logo ? (
            <div id="shop-owner-navbar-logo">
              <img src={shopData?.shop?.logo} alt={shopData.shop.name} />
            </div>
          ) : (
            <FaUserCircle />
          )}
        </Link>
      </li>
      <li className="nav-item" onClick={() => handeLogout()}>
        <Link className="nav-link" to="/logout">
          Logout
        </Link>
      </li>
    </>
  );
}
