import "./Login.css";
import { useState } from "react";
import { loginUser } from "../../services/auth";

export default function Register() {
  const [custommer, setCustommer] = useState("option");
  const [creator, setCreator] = useState("option");
  const [isSelected, setIsSelected] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const userData = {
    email,
    password,
  };

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

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3000")
        .then((res) => res.json())
        .then((data) => console.log(data));

      console.log("Bravoooo");
    } catch (error) {
      console.log("mmmmmmmmmmmmmmmmmmmmmmmm");
    }
  };

  return (
    <div id="login-wrapper">
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
          <input
            type="text"
            placeholder="Email*"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Password*"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div id="button-wrapper">
        <button
          disabled={isSelected}
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
