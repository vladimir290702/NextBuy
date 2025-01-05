import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../public/images/logo.png";
import GuestUserLayout from "../NavbarOptions/GuestUser/GuestUserLayout";
import LoggedUserLayout from "../NavbarOptions/LoggedInUser/LoggedUserLayout";
import { useUser } from "../../contexts/UserContext";
export default function Navbar() {
  const { user } = useUser();

  return (
    <div id="navbar">
      <div id="logo">
        <Link id="logo-wrapper" to="/">
          <img src={logo} to="/" alt="Logo" />
        </Link>
      </div>

      <nav id="options">
        {user ? <LoggedUserLayout user={user} /> : <GuestUserLayout />}
      </nav>
    </div>
  );
}
