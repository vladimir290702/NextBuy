const express = require("express");
const connectDB = require("./database.js");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const itemModel = require("./models/Item.js");
const User = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vladimir.metodiev2907@gmail.com",
    pass: "rjgm beiz wndj djwd",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send!");
  }
});

app.post("/promo", async (req, res) => {
  const { email, promocode } = req.body.userData;

  const user = await User.findOne({ email });
  if (user.promocode) {
    return res.json({
      code: 200,
      status: "You have already received a promocode",
    });
  } else {
    const filter = {
      email: email,
    };
    const updateDocument = {
      $set: {
        promocode: promocode,
      },
    };

    const updatedData = await User.updateOne(filter, updateDocument);

    const mail = {
      from: "name",
      to: email,
      subject: "Welcome Promo Code",
      html: `
        <h1>Thank you so much for joining our comunity</h1>
        <p>We want to give a 10% off promo code</p>
        <h3>WELCOME10</h3>
      `,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json(error);
      } else {
        res.json({ code: 200, status: "Email Sent" });
      }
    });
  }
});

app.get("/", async (req, res) => {
  const items = await itemModel.find();

  return res.json({ items });
});

app.post("/login", async (req, res) => {
  console.log(req.body);

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
  const {
    role,
    username,
    email,
    password,
    name,
    surname,
    age,
    gender,
    promocode,
  } = req.body;

  const user = await User.create({
    role: role,
    username,
    email,
    password,
    name,
    surname,
    age,
    gender: gender,
    promocode, // In a real app, you should hash the password before storing it
  });

  return res.status(200).json({ user });
});

app.listen(3000, () => {
  console.log("app is running");
});
