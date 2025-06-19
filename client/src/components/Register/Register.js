import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { useUser } from "../../contexts/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [custommer, setCustommer] = useState("option");
  const [creator, setCreator] = useState("option");
  const [isSelected, setIsSelected] = useState(true);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [age, setAge] = useState(null);
  const [role, setRole] = useState(null);

  const userData = {
    email,
    name,
    username: email,
    surname,
    password,
    repeatPassword,
    age,
    role: role,
    promocode: null,
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      email === null &&
      name === null &&
      surname === null &&
      password === null &&
      repeatPassword === null &&
      age === null
    ) {
      return;
    } else if (password !== repeatPassword) {
      return;
    } else {
      const response = await registerUser(userData);

      register(response);

      navigate("/");
      localStorage.setItem("user", JSON.stringify(response.user));
    }
  };

  const setOption = (option) => {
    if (option === "custommer") {
      setCustommer("selected-option");
      setCreator("option");
      setRole(option);
    } else {
      setCreator("selected-option");
      setCustommer("option");
      setRole(option);
    }

    setIsSelected(false);
  };

  return (
    <div id="register-wrapper">
      <div id="login-image-container">
        <img
          src="https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?cs=srgb&dl=pexels-alipazani-2584269.jpg&fm=jpg"
          alt=""
        />
      </div>
      <div id="register-form-wrapper">
        <div id="register-title-container">
          <h2 className="register-title-text">Welcome to NextBuy </h2>
        </div>
        <div className="options-container">
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
          <div className="input">
            <input
              type="text"
              placeholder="Repeat Password*"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Name*"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Surname*"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Age*"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="input">
            <button
              disabled={isSelected}
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
