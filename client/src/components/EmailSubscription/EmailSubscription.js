import "./EmailSubscription.css";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { sendPromoCode } from "../../services/sendPromoCode";
import { addPromoCode } from "../../services/addPromocode";

export default function EmailSubscription() {
  const [email, setEmail] = useState(null);
  const [buttonText, setButtonText] = useState("Subscribe");

  const handleEmailSender = async (e) => {
    e.preventDefault();

    if (email) {
      setButtonText("Sending...");

      const data = {
        email,
        promocode: "vladko",
      };

      const response = await sendPromoCode(email);
      const promoResponse = await addPromoCode(data);

      setButtonText("Sent");
      setEmail(null);
    }

    return;
  };

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
          <button
            id="subscribtion-button"
            onClick={(e) => handleEmailSender(e)}
          >
            <span class="button-text">{buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
