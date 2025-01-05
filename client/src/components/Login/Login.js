import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { useUser } from "../../contexts/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [custommer, setCustommer] = useState("option");
  const [creator, setCreator] = useState("option");
  const [isSelected, setIsSelected] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  let userData = {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await loginUser(userData);

    if (!result.status) {
      navigate("/login");
    } else {
      navigate("/");
      login(result.user);
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
