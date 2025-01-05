import "./EmailSubscription.css";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function EmailSubscription() {
  const [email, setEmail] = useState(null);
  return (
    <div id="subscribtion-wrapper">
      <div>
        <h2>Enjoy 10% off your next order</h2>
        <div>
          <p>
            <FaCheck /> 15% off on your birthday
          </p>
          <p>
            <FaCheck /> Early access to sales
          </p>
          <p>
            <FaCheck /> Exclusive discounts
          </p>
        </div>
      </div>
      <div className="subscribe">
        <div id="subscribe-input">
          <input
            type="text"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button id="subscribtion-button">
            <span class="button-text">Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
