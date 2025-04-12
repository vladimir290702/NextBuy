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
  const [selectedOption, setSelectedOption] = useState("");
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

    setSelectedOption(option);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await loginUser(userData);

    if (!result.status && selectedOption !== "") {
      navigate("/login");
    } else {
      if (result.user.role !== selectedOption) {
      } else {
        navigate("/");
        login(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
      }
    }
  };

  return (
    <div id="login-wrapper">
      <div id="login-form-container">
        <div>
          <h2 id="title">Welcome to NextBuy</h2>
        </div>
        <div id="options-container">
          <h3>Continue as:</h3>
          <div className="options">
            <div
              className={custommer}
              onClick={async (e) => {
                e.preventDefault();
                setOption("custommer");
              }}
            >
              <h3>Custommer</h3>
            </div>
            <div
              className={creator}
              onClick={async (e) => {
                e.preventDefault();
                setOption("creator");
              }}
            >
              <h3>Creator</h3>
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
        <div id="forgot-password-wrapper">
          <div id="forgot-password">
            <h4>Forgot Password?</h4>
          </div>
        </div>
        <div id="button-wrapper">
          <button
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
