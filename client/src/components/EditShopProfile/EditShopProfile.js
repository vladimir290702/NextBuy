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
  const [shopOwner, setShopOwner] = useState(null);
  const [shopName, setShopName] = useState(null);
  const [shopFirstname, setShopFirstname] = useState(user.name);
  const [shopLastname, setShopLastname] = useState(user.surname);

  const [inputValue, setInputValue] = useState("");
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  const [containsUppercase, setContainsUppercase] = useState(false);
  const [containsNumber, setContainsNumber] = useState(false);
  const [containSpecialCharacter, setContainSpecialCharacter] = useState(false);

  useEffect(() => {
    const fetchedShopData = async () => {
      const response = await getShopData(user.email);

      setShopData(response?.shop);
      setShopOwner(response?.shop.owner);
      setShopName(response?.shop.name);
    };

    fetchedShopData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Check if the length is at least 8
    if (value.length >= 8) {
      setIsPasswordLongEnough(true);
    } else {
      setIsPasswordLongEnough(false);
    }

    setContainsUppercase(/[A-Z]/.test(value));
    setContainsNumber(/\d/.test(value));
    setContainSpecialCharacter(/[^a-zA-Z0-9]/.test(value));
  };

  return (
    <div id="edit-shop-container">
      <ShopProfileSidebar />
      <div id="edit-shop-data">
        <div id="change-shop-data-wrapper">
          <h3>Change Shop Data:</h3>

          <p className="shop-data-label">Logo:</p>
          <div id="edit-shop-logo">
            <img src={shopData?.logo} alt={shopData?.name} />
            <div className="edit-shop-logo-overlay">Upload Logo</div>
          </div>
          <div id="edit-owner-data">
            <div id="shop-owner-email">
              <p className="shop-data-label">Email:</p>
              <input
                className="shop-input"
                type="text"
                value={shopOwner}
                onChange={(e) => setShopOwner(e.target.value)}
              />
            </div>
            <div id="shop-name">
              <p className="shop-data-label">Shop Name:</p>
              <input
                className="shop-input"
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>
          <div id="edit-owner-data">
            <div id="shop-owner-email">
              <p className="shop-data-label">FirstName:</p>
              <input
                className="shop-input"
                type="text"
                value={shopFirstname}
                onChange={(e) => setShopFirstname(e.target.value)}
              />
            </div>
            <div id="shop-name">
              <p className="shop-data-label">LastName:</p>
              <input
                className="shop-input"
                type="text"
                value={shopLastname}
                onChange={(e) => setShopLastname(e.target.value)}
              />
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
              <input
                className="shop-input"
                type="text"
                placeholder="Your password..."
              />
            </div>
            <div>
              <p className="shop-data-label">Repeat Current Password:</p>
              <input
                className="shop-input"
                type="text"
                placeholder="Repeat your password..."
              />
            </div>
            <div>
              <p className="shop-data-label">New Password:</p>
              <input
                className="shop-input"
                type="text"
                value={inputValue}
                onChange={(e) => handleChange(e)}
                placeholder="Your new password..."
              />
            </div>
          </div>
          <div id="change-password-rules-container">
            <div className="password-rules">
              <div className="password-icon-wrapper">
                {isPasswordLongEnough ? (
                  <FaCheck className="edit-shop-password-icon" />
                ) : (
                  <RxCross1 className="edit-shop-password-icon cross" />
                )}
              </div>
              <p className="password-rule">
                Must be at least 8 characters long!
              </p>
            </div>
            <div className="password-rules">
              <div className="password-icon-wrapper">
                {containsUppercase ? (
                  <FaCheck className="edit-shop-password-icon" />
                ) : (
                  <RxCross1 className="edit-shop-password-icon cross" />
                )}
              </div>
              <p className="password-rule">Must contain Uppercase character!</p>
            </div>
            <div className="password-rules">
              <div className="password-icon-wrapper">
                {containsNumber ? (
                  <FaCheck className="edit-shop-password-icon" />
                ) : (
                  <RxCross1 className="edit-shop-password-icon cross" />
                )}
              </div>
              <p className="password-rule">Must contain a number!</p>
            </div>
            <div className="password-rules">
              <div className="password-icon-wrapper">
                {containSpecialCharacter ? (
                  <FaCheck className="edit-shop-password-icon" />
                ) : (
                  <RxCross1 className="edit-shop-password-icon cross" />
                )}
              </div>
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
