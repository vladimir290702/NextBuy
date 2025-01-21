import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Apparel from "./components/Apparel/Apparel";
import ShopProfile from "./components/ShopProfile/ShopProfile";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import UserCart from "./components/UserCart/UserCart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apparel" element={<Apparel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop-profile" element={<ShopProfile />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
