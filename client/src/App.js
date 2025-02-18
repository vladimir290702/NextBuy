import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Apparel from "./components/Apparel/Apparel";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import UserCart from "./components/UserCart/UserCart";
import Checkout from "./components/Checkout/Checkout";
import CreateListing from "./components/CreateListing/CreateListing";
import Dashboard from "./components/Dashboard/Dashboard";
import ShopOrders from "./components/ShopOrders/ShopOrders";
import ShopSettings from "./components/ShopSettings/ShopSettings";
import OtherShops from "./components/OtherShops/OtherShops";
import InitialPage from "./components/CreateShop/InitialPage/InitialPage";
import CreateShop from "./components/CreateShop/CreateShop";
import FavouriteProducts from "./components/FavouriteProducts/FavouriteProducts";

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
          <Route path="/create-shop-initial" element={<InitialPage />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop-orders" element={<ShopOrders />} />
          <Route path="/shop-settings" element={<ShopSettings />} />
          <Route path="/other-shops" element={<OtherShops />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourite-products" element={<FavouriteProducts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
