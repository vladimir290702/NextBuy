import "./EditShopProfile.css";
import ShopProfileSidebar from "../ShopProfileSidebar/ShopProfileSidebar";
import { useUser } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import { getShopData } from "../../services/createShop";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export default function EditShopProfile() {
  const { user } = useUser();
  const [shopData, setShopData] = useState(null);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user.email);

      setShopData(response?.shop);
    };
    fetchedShopData();
  }, []);

  return (
    <div id="edit-shop-container">
      <ShopProfileSidebar />
      <div id="edit-shop-data">
        <div id="change-shop-data-wrapper">
          <h3>Change Shop Data:</h3>

          <p className="shop-data-label">Logo:</p>
          <div id="edit-shop-logo">
            <img src={shopData?.logo} alt={shopData?.name} />
            <div class="edit-shop-logo-overlay">Upload Logo</div>
          </div>
          <div id="edit-owner-data">
            <div id="shop-owner-email">
              <p className="shop-data-label">Email:</p>
              <input
                className="shop-input"
                type="text"
                value={shopData?.owner}
              />
            </div>
            <div id="shop-name">
              <p className="shop-data-label">Shop Name:</p>
              <input
                className="shop-input"
                type="text"
                value={shopData?.name}
              />
            </div>
          </div>
          <div id="edit-owner-data">
            <div id="shop-owner-email">
              <p className="shop-data-label">FirstName:</p>
              <input className="shop-input" type="text" value={user.name} />
            </div>
            <div id="shop-name">
              <p className="shop-data-label">LastName:</p>
              <input className="shop-input" type="text" value={user.surname} />
            </div>
          </div>
        </div>
        <div className="apply-changes-edit-shop">
          <button>Apply Changes</button>
        </div>
        <div id="change-password-container">
          <div>
            <h3>Change Password:</h3>
            <div>
              <p className="shop-data-label">Current Password:</p>
              <input className="shop-input" type="text" />
            </div>
            <div>
              <p className="shop-data-label">Repeat Current Password:</p>
              <input className="shop-input" type="text" />
            </div>
            <div>
              <p className="shop-data-label">New Password:</p>
              <input className="shop-input" type="text" />
            </div>
          </div>
          <div id="change-password-rules-container">
            <div className="password-rules">
              <RxCross1 />
              <p className="password-rule">
                Must be at least 8 characters long!
              </p>
            </div>
            <div className="password-rules">
              <RxCross1 />
              <p className="password-rule">Must contain Uppercase character!</p>
            </div>
            <div className="password-rules">
              <RxCross1 />
              <p className="password-rule">Must contain a number!</p>
            </div>
            <div className="password-rules">
              <RxCross1 />
              <p className="password-rule">Must contain a special character!</p>
            </div>
          </div>
        </div>
        <div className="apply-changes-edit-shop">
          <button>Change Password</button>
        </div>
      </div>
    </div>
  );
}
