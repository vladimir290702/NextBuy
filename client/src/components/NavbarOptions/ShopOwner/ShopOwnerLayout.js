import "./ShopOwnerLayout.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { getShopData } from "../../../services/createShop";

export default function ShopOwnerLayout() {
  const { logout, user } = useUser();
  const navigate = useNavigate();

  const handeLogout = () => {
    logout(null);
    navigate("/");
  };

  const handleProfileRedirect = async () => {
    const response = await getShopData(user.username);

    if (response?.shop?.owner) {
      navigate("/dashboard");
    } else {
      navigate("/create-shop-initial");
    }
  };

  return (
    <>
      <li className="nav-item" onClick={() => handleProfileRedirect()}>
        <Link className="nav-link">Profile</Link>
      </li>
      <li className="nav-item" onClick={() => handeLogout()}>
        <Link className="nav-link" to="/logout">
          Logout
        </Link>
      </li>
    </>
  );
}
