import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [custommer, setCustommer] = useState("option");
  const [creator, setCreator] = useState("option");
  const [isSelected, setIsSelected] = useState(true);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
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
    gender,
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      email !== null &&
      name !== null &&
      surname !== null &&
      password !== null &&
      repeatPassword !== null &&
      age !== null &&
      gender !== null
    ) {
      return;
    } else if (password !== repeatPassword) {
      return;
    } else {
      registerUser(userData);

      navigate("/");
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
          <select id="gender-options">
            <option
              disabled
              selected
              value
              onChange={(e) => setGender(e.target.value)}
            >
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
            handleRegister(e);
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
