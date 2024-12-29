import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/images/logo.png";
import GuestUserLayout from "../NavbarOptions/GuestUser/GuestUserLayout";
import LoggedUserLayout from "../NavbarOptions/LoggedInUser/LoggedUserLayout";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div id="navbar">
      <div id="logo">
        <Link id="logo-wrapper" to="/">
          <img src={logo} to="/" alt="Logo" />
        </Link>
      </div>

      <nav id="options">
        {true ? <GuestUserLayout /> : <LoggedUserLayout />}
      </nav>
    </div>
  );
}
