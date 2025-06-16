import "./EmailSubscription.css";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { sendPromoCode } from "../../services/sendPromoCode";
import generatePromoCode from "../../services/generatePromocode";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Subscribe");
  const [message, setMessage] = useState("");
  const [labelVisible, setLabelVisible] = useState(true);

  const handleEmailSender = async (e) => {
    e.preventDefault();

    if (email) {
      setButtonText("Sending...");

      const data = {
        email,
        promocode: generatePromoCode(),
      };

      const response = await sendPromoCode(data);

      if (response.status) {
        setMessage(response.status);
        setButtonText("Try another email");

        setLabelVisible(true); // Show the label
        setEmail(null);

        // Hide the label after 5 seconds
        setTimeout(() => {
          setLabelVisible(false);
        }, 5000);

        return;
      }

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
      <div id="message-container">
        {labelVisible && <div id="label">{message}</div>}
        <div className="subscribe">
          <div id="subscribe-input">
            <input
              type="text"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              id="subscribtion-button"
              onClick={(e) => handleEmailSender(e)}
            >
              <span className="button-text">{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
