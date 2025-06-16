import "./Footer.css";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div id="footer-wrapper">
      <div id="promo">
        <p id="promo-title">Sign up now and get 10% off</p>
        <p className="promo-item">
          <FaCheck className="footer-icon" />
          Birthday promo
        </p>
        <p className="promo-item">
          <FaCheck className="footer-icon" />
          Early access to sales
        </p>
        <p className="promo-item">
          <FaCheck className="footer-icon" />
          Exclusive discounts
        </p>
        <div id="btn-wrapper">
          <Link id="footer-btn" to="/register">
            Register now!
          </Link>
        </div>
      </div>
      <div id="sections">
        <div className="section">
          <ul>
            <li className="section-title">Customer service</li>
            <li className="section-option">Need help?</li>
            <li className="section-option">My Orders</li>
            <li className="section-option">FAQs</li>
          </ul>
        </div>
        <div className="section">
          <ul>
            <li className="section-title">About NextBuy</li>
            <li className="section-option">Partners</li>
            <li className="section-option">Our App</li>
            <li className="section-option">Careers</li>
          </ul>
        </div>
        <div className="section">
          <ul>
            <li className="section-title">My Account</li>
            <li className="section-option">Account</li>
            <li className="section-option">Orders</li>
            <li className="section-option">Promotions</li>
          </ul>
        </div>
        <div className="section">
          <ul>
            <li className="section-title">Privacy and Conditions</li>
            <li className="section-option">Privacy and Cookie Policy</li>
            <li className="section-option">Terms and Conditions</li>
            <li className="section-option">Manage Cookie Consent</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
