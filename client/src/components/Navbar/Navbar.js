import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/images/logo.png";
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
          <img src={logo} to="/" alt="Logo" />
        </Link>
      </div>

      <nav id="options">{<NavbarLayout />}</nav>
    </div>
  );
}
