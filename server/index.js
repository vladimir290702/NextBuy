const express = require("express");
const connectDB = require("./database.js");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const itemModel = require("./models/Item.js");

const User = require("./models/User.js");
const Shop = require("./models/Shop");
const Listings = require("./models/Listings");
const Image = require("./models/Image");

//Znbn6YwoTp_SQW5YThljK4_062s
//334356963411882
//dldt9bjpg

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

cloudinary.config({
  cloud_name: "dldt9bjpg",
  api_key: "334356963411882",
  api_secret: "Znbn6YwoTp_SQW5YThljK4_062s",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "image-uploader",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

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

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;

    const savedImage = await Image.create({ url: imageUrl });
    res.status(200).json({ url: savedImage.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
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
  const { name, page } = req.query;
  const limit = 3;
  const shop = await Shop.findOne({ owner: name });

  const totalActivities = shop.activity.length;

  // Reverse the array to get the latest activities first
  const sortedActivities = [...shop.activity].reverse();

  // Apply pagination
  const endIndex = 0 + limit * page;

  const paginatedActivities = sortedActivities.slice(
    0,
    endIndex > totalActivities ? totalActivities : endIndex
  );

  return res.json({ shop, activities: paginatedActivities, totalActivities });
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

  const newActivity = {
    type: "favourited",
    firstName: name.name,
    lastName: name.surname,
    email: name.email,
    date: new Date().toLocaleString(),
    item: product,
  };

  const pushNewActivity = await Shop.findOneAndUpdate(
    { name: product.productName },
    { $push: { activity: newActivity } }
  );

  const result = await User.findOneAndUpdate(
    { username: name.username }, // Find the shop by owner email
    { $push: { favouriteProducts: product } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  return res.json({ result });
});

app.delete("/product-details", async (req, res) => {
  const { product, name } = req.body;

  const newActivity = {
    type: "removed",
    firstName: name.name,
    lastName: name.surname,
    email: name.email,
    date: new Date().toLocaleString(),
    item: product,
  };

  const pushNewActivity = await Shop.findOneAndUpdate(
    { name: product.productName },
    { $push: { activity: newActivity } }
  );

  const result = await User.findOneAndUpdate(
    { username: name.username }, // Find the document by user ID
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
    user,
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

  const newActivity = {
    type: "ordered",
    order,
  };

  const pushNewActivity = await Shop.findOneAndUpdate(
    { name: shopOwner },
    { $push: { activity: newActivity } }
  );

  const shop = await Shop.find({ name: shopOwner });

  const emptiedBag = await User.updateMany({}, { $set: { bag: [] } });

  const addProductToOrders = await User.findOneAndUpdate(
    { username: user }, // Find the shop by owner email
    { $push: { orders: order } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

  const updatedRevenue = await Shop.findOneAndUpdate(
    { name: shopOwner },
    { $set: { revenue: Number(shop[0].revenue) + Number(subtotal) } }, // Add new object to listings array
    { new: true } // Return the updated document
  );

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

  return res.json({ addProductToOrders });
});

app.listen(3000, () => {
  console.log("app is running");
});
