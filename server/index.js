const express = require("express");
const connectDB = require("./database.js");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const itemModel = require("./models/Item.js");
const User = require("./models/User.js");
const Shop = require("./models/Shop");
const Listings = require("./models/Listings");
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
  const items = await Shop.find();

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

app.post("/create-shop", async (req, res) => {
  const {
    ownerId,
    owner,
    logo,
    name,
    categories,
    listings,
    revenue,
    views,
    orders,
    activity,
    createdOn,
    totalViews,
  } = req.body;

  const shop = await Shop.create({
    ownerId,
    owner,
    logo,
    name,
    categories,
    listings,
    revenue,
    views,
    orders,
    activity,
    createdOn,
    totalViews,
  });

  return res.status(200).json({ shop });
});

app.get("/dashboard", async (req, res) => {
  const { name } = req.query;

  const shop = await Shop.findOne({ owner: name });

  return res.json({ shop });
});

app.patch("/create-listing", async (req, res) => {
  const { name } = req.query;

  const shop = await Shop.find({ owner: name });

  // Update only the "listings" field
  const updatedListings = await Shop.findOneAndUpdate(
    { owner: name }, // Find the shop by owner email
    { $push: { listings: req.body } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  const newListingToCollection = await Listings.create(req.body);

  return res.json({ updatedListings, newListingToCollection, shop });
});

app.get("/other-shops", async (req, res) => {
  const shops = await Shop.find();

  console.log(shops);

  return res.json(shops);
});

app.get("/apparel", async (req, res) => {
  const listings = await Listings.find();

  return res.json({ listings });
});

app.get("/product-details", async (req, res) => {
  const { id } = req.query;

  const product = await Listings.findOne({ _id: id });
  const shop = await Shop.findOne({ name: product.productName });

  const editShopTotalViews = await Shop.findOneAndUpdate(
    { name: product.productName }, // Find the shop by owner email
    { $set: { views: shop.views + 1 } }, // Add new object to listings array
    { new: true }
  );

  const editQuantity = await Listings.findOneAndUpdate(
    { _id: id },
    { $set: { totalViews: product.totalViews + 1 } }, // Add new object to listings array
    { new: true }
  );

  return res.json({ product: editQuantity });
});

app.patch("/product-details", async (req, res) => {
  const { product, name } = req.body;

  const result = await User.findOneAndUpdate(
    { username: name }, // Find the shop by owner email
    { $push: { favouriteProducts: product } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  return res.json({ result });
});

app.delete("/product-details", async (req, res) => {
  const { product, name } = req.body;

  const result = await User.findOneAndUpdate(
    { username: name }, // Find the document by user ID
    { $pull: { favouriteProducts: { _id: product._id } } },
    { new: true } // Remove the object with the matching ID from `bag`
  );

  return res.json({ result });
});

app.post("/product-details", async (req, res) => {
  const { name } = req.query;
  const data = req.body;

  const updatedListings = await User.findOneAndUpdate(
    { username: name }, // Find the shop by owner email
    { $push: { bag: data } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  return res.json({ updatedListings });
});

app.get("/cart", async (req, res) => {
  const { id } = req.query;
  const user = await User.findOne({ email: id });

  return res.json({ user });
});

app.delete("/cart", async (req, res) => {
  const { productId, user } = req.body;

  const result = await User.updateOne(
    { username: user }, // Find the document by user ID
    { $pull: { bag: { id: productId } } } // Remove the object with the matching ID from `bag`
  );
});

app.patch("/cart", async (req, res) => {
  const { productId, quantity, user } = req.body;

  const editQuantity = await User.findOneAndUpdate(
    { username: user, "bag.id": productId }, // Find the shop by owner email
    { $set: { "bag.$.quantity": quantity } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  return res.json({ editQuantity });
});

app.patch("/checkout", async (req, res) => {
  const {
    shopOwner,
    user,
    subtotal,
    discountedPrice,
    orderedProducts,
    firstName,
    lastName,
    street,
    city,
    zipcode,
    dateOfOrder,
    totalPrice,
    trackingNumber,
  } = req.body;

  const order = {
    subtotal,
    discountedPrice,
    firstName,
    lastName,
    street,
    city,
    zipcode,
    orderedProducts,
    dateOfOrder,
    totalPrice,
    trackingNumber,
  };

  const addProductToOrders = await User.findOneAndUpdate(
    { username: user }, // Find the shop by owner email
    { $push: { orders: order } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  const emptiedBag = await User.updateMany({}, { $set: { bag: [] } });

  const addOrderToShop = await Shop.findOneAndUpdate(
    { name: shopOwner }, // Find the shop by owner email
    { $push: { orders: order } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2 style="color: #001F54;">Thank you so much for your order!</h2>
        <p style="font-size: 16px; color: #555;">Here are your products:</p>
        ${orderedProducts
          .map(
            (url) =>
              `<img src="${url.images[0]}" style="width: 300px; border-radius: 10px; margin: 10px;" />`
          )
          .join("")}
        <h2>Amount Paid: ${totalPrice}</h2>
        <p style="margin-top: 20px;"><a href="https://yourwebsite.com" style="background: #001F54; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Us</a></p>
    </div>
`;
  const mail = {
    from: "name",
    to: user,
    subject: `Order #${trackingNumber}`,
    html: htmlContent,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Email Sent" });
    }
  });
});

app.listen(3000, () => {
  console.log("app is running");
});
