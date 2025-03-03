import "./LoggedUserLayout.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import DropdownCart from "./DropdownCart/DropdownCart";

export default function LoggedUserLayout() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handeLogout = () => {
    logout(null);
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <div id="logged-user-container">
      <li
        className="nav-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link className="nav-link" to="/favourite-products">
          <IoIosHeartEmpty />
          <div className={`dropdown ${isHovered ? "visible" : ""}`}>
            {user.favouriteProducts.map((product) => {
              return <DropdownCart product={product} />;
            })}
            {user.favouriteProducts.length > 3 ? (
              <div
                id="favourite-products-count-container"
                onClick={() => navigate("/favourite-products")}
              >
                <h3>See {user.favouriteProducts.length - 3} products </h3>
              </div>
            ) : null}
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          <BsCart4 />
        </Link>
      </li>
      <li className="nav-item" onClick={() => handeLogout()}>
        <Link className="nav-link" to="/logout">
          Logout
        </Link>
      </li>
    </div>
  );
}
