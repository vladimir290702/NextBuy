import "./Settings.css";
import { ImProfile } from "react-icons/im";
import { RiListIndefinite } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
export default function Settings() {
  return (
    <div id="settings-wrapper">
      <div className="settings-option">
        <div className="settings-name">
          <h3>Edit Profile</h3>
        </div>
        <div className="settings-icon-container">
          <ImProfile className="settings-icon" />
        </div>
      </div>
      <div className="settings-option">
        <div className="settings-name">
          <h3>Edit Listings</h3>
        </div>
        <div className="settings-icon-container">
          <RiListIndefinite className="settings-icon" />
        </div>
      </div>
      <div className="settings-option">
        <div className="settings-name">
          <h3>Delete Profile</h3>
        </div>
        <div className="settings-icon-container">
          <MdDeleteForever className="settings-icon" />
        </div>
      </div>
    </div>
  );
}
