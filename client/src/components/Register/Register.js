import "./Register.css";
import { useState } from "react";

export default function Register() {
  const [custommer, setCustommer] = useState("option");
  const [creator, setCreator] = useState("option");
  const [isSelected, setIsSelected] = useState(true);

  const setOption = (option) => {
    if (option === "custommer") {
      setCustommer("selected-option");
      setCreator("option");
    } else {
      setCreator("selected-option");
      setCustommer("option");
    }

    setIsSelected(false);
  };

  const register = () => {
    console.log(1321231321);
  };

  return (
    <div id="register-wrapper">
      <div>
        <h1 id="title">Welcome to NextBuy</h1>
      </div>
      <div id="options-container">
        <h2>Continue as:</h2>
        <div className="options">
          <div
            className={custommer}
            onClick={async (e) => {
              e.preventDefault();
              setOption("custommer");
            }}
          >
            <h2>Custommer</h2>
          </div>
          <div
            className={creator}
            onClick={async (e) => {
              e.preventDefault();
              setOption("creator");
            }}
          >
            <h2>Creator</h2>
          </div>
        </div>
      </div>
      <div id="user-data">
        <div className="input">
          <input type="text" placeholder="Email*" />
        </div>
        <div className="input">
          <input type="text" placeholder="Password*" />
        </div>
        <div className="input">
          <input type="text" placeholder="Repeat Password*" />
        </div>
        <div className="input">
          <input type="text" placeholder="Name*" />
        </div>
        <div className="input">
          <input type="text" placeholder="Surname*" />
        </div>
        <div className="input">
          <input type="text" placeholder="Age*" />
        </div>
        <div className="input">
          <select id="gender-options">
            <option disabled selected value>
              Gender*
            </option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Prefer not ot answer</option>
          </select>
        </div>
      </div>
      <div id="button-wrapper">
        <button
          disabled={isSelected}
          onClick={(e) => {
            e.preventDefault();
            register();
            console.log(11111111111);
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
