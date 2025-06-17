import "./Navbar.css";
import { Link } from "react-router-dom";
import GuestUserLayout from "../NavbarOptions/GuestUser/GuestUserLayout";
import LoggedUserLayout from "../NavbarOptions/LoggedInUser/LoggedUserLayout";
import ShopOwner from "../NavbarOptions/ShopOwner/ShopOwnerLayout";
import { useUser } from "../../contexts/UserContext";
export default function Navbar() {
  const { user } = useUser();

  const NavbarLayout = () => {
    if (user) {
      if (user?.role === "creator") {
        return <ShopOwner />;
      } else {
        return <LoggedUserLayout />;
      }
    } else {
      return <GuestUserLayout />;
    }
  };

  return (
    <div id="navbar">
      <div id="logo">
        <Link id="logo-wrapper" to="/">
          <h1>NextBuy</h1>
        </Link>
      </div>

      <nav id="options">{<NavbarLayout />}</nav>
    </div>
  );
}
