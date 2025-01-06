const express = require("express");
const connectDB = require("./database.js");
const cors = require("cors");
const itemModel = require("./models/Item.js");
const User = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));

connectDB();

app.get("/", async (req, res) => {
  const items = await itemModel.find();

  return res.json({ items });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", status: false });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found", status: false });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password", status: false });
  }

  return res.status(200).json({ user, status: true });
});

// POST /register
app.post("/register", async (req, res) => {
  const { role, username, email, password, name, surname, age, gender } =
    req.body;

  const user = await User.create({
    role: role,
    username,
    email,
    password,
    name,
    surname,
    age,
    gender: gender, // In a real app, you should hash the password before storing it
  });

  return res.status(200).json({ user });
});

app.listen(3000, () => {
  console.log("app is running");
});
