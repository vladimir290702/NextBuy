import "./ShopSettings.css";
import { ImProfile } from "react-icons/im";
import { RiListIndefinite } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { useNavigate } from "react-router-dom";

export default function ShopSettings() {
  const navigate = useNavigate();

  const navigateEditProfile = (e) => {
    e.preventDefault();
    navigate("/shop/edit-profile");
  };

  const navigateEditListings = (e) => {
    e.preventDefault();
    navigate("/shop/edit-listings");
  };

  const navigateDeleteProfile = (e) => {
    e.preventDefault();
    navigate("/shop/delete-profile");
  };

  return (
    <div id="shop-profile-wrapper">
      <ShopProfileSidebar />
      <div id="selected-shop-category">
        <div id="settings-wrapper">
          <div
            className="settings-option"
            onClick={(e) => navigateEditProfile(e)}
          >
            <div className="settings-name">
              <h3>Edit Profile</h3>
            </div>
            <div className="settings-icon-container">
              <ImProfile className="settings-icon" />
            </div>
          </div>
          <div
            className="settings-option"
            onClick={(e) => navigateEditListings(e)}
          >
            <div className="settings-name">
              <h3>Edit Listings</h3>
            </div>
            <div className="settings-icon-container ">
              <RiListIndefinite className="settings-icon" />
            </div>
          </div>
          <div
            className="settings-option"
            onClick={(e) => navigateDeleteProfile(e)}
          >
            <div className="settings-name">
              <h3>Delete Profile</h3>
            </div>
            <div className="settings-icon-container">
              <MdDeleteForever className="settings-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
