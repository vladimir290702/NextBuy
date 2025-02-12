import "./LoggedUserLayout.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

export default function LoggedUserLayout() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handeLogout = () => {
    logout(null);
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/search">
          Search
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart">
          Cart
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          Profile
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
