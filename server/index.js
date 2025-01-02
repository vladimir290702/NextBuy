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

  const user = await User.find();

  console.log(user);

  return res.json({ user });

  /*User.findOne().then((data) => {
    console.log(data);

    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Mistake");
      }
    } else {
      res.json("N/A");
    } 
  });*/
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

  return user;
});

app.listen(3000, () => {
  console.log("app is running");
});
